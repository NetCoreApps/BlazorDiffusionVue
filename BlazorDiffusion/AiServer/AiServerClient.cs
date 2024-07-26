using AiServer.ServiceInterface;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using BlazorDiffusion.ServiceInterface;
using BlazorDiffusion.ServiceModel;
using ServiceStack.IO;
using ServiceStack.Text;
using JsonApiClient = ServiceStack.JsonApiClient;

namespace BlazorDiffusion.AiServer;
public class AiServerClient: IStableDiffusionClient
{
    public JsonApiClient Client { get; set; }
    public IVirtualFiles VirtualFiles { get; set; }
    
    public string? OutputPathPrefix { get; set; }
    
    private object seedLock = new();
    
    public async Task<ImageGenerationResponse> GenerateImageAsync(ImageGeneration request)
    {
        var req = request.ToComfy();
        var res = await Client.PostAsync(req);
        if (res == null)
            throw new Exception("Failed to generate image.");
        var now = DateTime.UtcNow;
        var key = $"{now:yyyy/MM/dd}/{(long)now.TimeOfDay.TotalMilliseconds}";
        
        var results = new List<ImageGenerationResult>();
        var completedRes = await Client.PostAsync(new WaitForComfyGeneration
        {
            RefId = res.RefId
        });
        var seed = (completedRes?.Result?.Request?.Seed ?? 0).ConvertTo<uint>();
        await Parallel.ForEachAsync(completedRes?.Outputs, async (item, token) =>
        {
            var artifactUrl = $"{item.Url}";
            var bytes = await artifactUrl.GetBytesFromUrlAsync(token: token);
            var imageDetails = ImageDetails.Calculate(bytes);
            var uuid = Guid.NewGuid().ToString("N");
            lock (seedLock)
            {
                results.Add(new()
                {
                    Prompt = request.Prompt,
                    Seed = seed,
                    AnswerId = res.RefId,
                    FilePath = $"/artifacts/{key}/output_{uuid}.png",
                    FileName = $"output_{uuid}.png",
                    ContentLength = bytes.Length,
                    Width = request.Width,
                    Height = request.Height,
                    ImageDetails = imageDetails,
                });
                // Assume incremental seeds for multiple images as comfyui does not provide the specific image seed back
                seed++;
            }
            var output = Path.Join(OutputPathPrefix, key, $"output_{uuid}.png");
            await VirtualFiles.WriteFileAsync(output, bytes, token);
        });

        return new ImageGenerationResponse
        {
            RequestId = res.RefId,
            EngineId = "comfy",
            Key = key,
            Results = results,
        };
    }

    public string GetMetadataPath(Creative creative) => OutputPathPrefix.CombineWith(creative.Key, "metadata.json");
    public IVirtualFile GetMetadataFile(Creative creative) => VirtualFiles.GetFile(GetMetadataPath(creative));

    public async Task SaveMetadataAsync(Creative creative)
    {
        var vfsPathSuffix = creative.Key;
        var outputDir = Path.Join(OutputPathPrefix, vfsPathSuffix);
        await VirtualFiles.WriteFileAsync(Path.Join(outputDir, "metadata.json"), creative.ToJson().IndentJson());
    }

    public Task DeleteFolderAsync(Creative creative)
    {
        var vfsPathSuffix = creative.Key;
        var directory = VirtualFiles.GetDirectory(Path.Join(OutputPathPrefix, vfsPathSuffix));
        var allFiles = directory.GetAllFiles();
        VirtualFiles.DeleteFiles(allFiles);
        return Task.CompletedTask;
    }
}

public static class StableDiffusionClientExtensions
{
    public static CreateComfyGeneration ToComfy(this ImageGeneration request)
    {
        return new CreateComfyGeneration
        {
            Request = new ComfyWorkflowRequest
            {
                Height = request.Height,
                Width = request.Width,
                Seed = (int?)request.Seed ?? Random.Shared.Next(),
                BatchSize = request.Images,
                PositivePrompt = request.Prompt,
                Model = ConvertStabilityModelNameToComfy(request.Engine),
                TaskType = ComfyTaskType.TextToImage
            }
        };
    }

    
    /// <summary>
    /// Testing, TODO: Replace with a proper mapping
    /// </summary>
    /// <param name="engineId"></param>
    /// <returns></returns>
    private static string ConvertStabilityModelNameToComfy(string? engineId)
    {
        if(engineId == null)
            return "SDXL Lightning 4-Step";
        
        if(engineId == "stable-diffusion-xl-1024-v1-0")
            return "SDXL Lightning 4-Step";
        
        return "SDXL Lightning 4-Step";
    }
}