using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using BlazorDiffusion.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.IO;
using ServiceStack.Text;
using JsonApiClient = ServiceStack.JsonApiClient;

namespace BlazorDiffusion.ServiceInterface.AiServer;

public class AiServerClient: IStableDiffusionClient
{
    public JsonApiClient Client { get; set; }
    public IVirtualFiles VirtualFiles { get; set; }
    
    public ILogger<AiServerClient>? Logger { get; set; }
    
    public string? OutputPathPrefix { get; set; }
    
    private object seedLock = new();
    
    public string? ReplyToUrl { get; set; }
    
    public string? ReplyToAuthSecret { get; set; }

    public async Task<QueueImageGenerationResponse> QueueGenerateImageAsync(QueueImageGeneration request)
    {
        var req = request.ImageGeneration.ToComfy();
        req.State = request.State;
        req.ReplyTo = (!string.IsNullOrEmpty(ReplyToAuthSecret) ? ReplyToAuthSecret + "@" : "")
                      + ReplyToUrl.CombineWith(req.RefId);
        var apiRes = await Client.ApiAsync(req);
        if (apiRes == null)
        {
            Logger?.LogError("ApiAsync returned null.");
            Logger?.LogInformation($"request: {req.ToJson()}");
            throw new Exception("Failed to generate image.");
        }
        
        if(apiRes.Failed)
        {
            Logger?.LogError("API Call to AI Server failed.");
            Logger?.LogInformation($"request: {req.ToJson()}");
            Logger?.LogInformation($"response: {apiRes.ToJson()}");
            throw new Exception("Failed to generate image.");
        }

        var res = apiRes.Response;
        if (res == null)
        {
            Logger?.LogError("Failed to generate image.");
            Logger?.LogInformation($"request: {req.ToJson()}");
            throw new Exception("Failed to generate image.");
        }

        return new QueueImageGenerationResponse
        {
            RefId = apiRes.Response.RefId
        };
    }

    public async Task<ImageGenerationResponse> GetQueueResult(string refId)
    {
        var getComfyGeneration = new GetGeneration
        {
            RefId = refId
        };
        var apiRes = await Client.ApiAsync(getComfyGeneration);
        if (apiRes == null)
        {
            Logger?.LogError("ApiAsync returned null.");
            Logger?.LogInformation($"request: {getComfyGeneration.ToJson()}");
            throw new Exception("Failed to generate image.");
        }
        
        if(apiRes.Failed)
        {
            Logger?.LogError("API Call to AI Server failed.");
            Logger?.LogError($"request: {getComfyGeneration.ToJson()}");
            Logger?.LogError($"response: {apiRes.ToJson()}");
            throw new Exception("Failed to generate image.");
        }

        var completedRes = apiRes.Response;
        var results = new List<ImageGenerationResult>();
        var seed = (completedRes?.Request?.Seed ?? 0).ConvertTo<uint>();
        var request = completedRes?.Request;
        if(request == null)
        {
            Logger?.LogError("Failed to generate image.");
            Logger?.LogInformation($"request: {getComfyGeneration.ToJson()}");
            throw new Exception("Failed to generate image.");
        }
        var now = DateTime.UtcNow;
        var key = $"{now:yyyy/MM/dd}/{(long)now.TimeOfDay.TotalMilliseconds}";
        if(completedRes?.Outputs == null)
        {
            Logger?.LogError("Failed to generate image.");
            Logger?.LogInformation($"request: {getComfyGeneration.ToJson()}");
            throw new Exception("Failed to generate image.");
        }
        foreach(var item in completedRes?.Outputs)
        {
            var artifactUrl = $"{item.Url}";
            Logger?.LogInformation($"Downloading artifact from {artifactUrl}...");
            var bytes = await artifactUrl.GetBytesFromUrlAsync();
            var imageDetails = ImageDetails.Calculate(bytes);
            var uuid = Guid.NewGuid().ToString("N");
            var filePath = $"/artifacts/{key}/output_{uuid}.png";
            results.Add(new()
            {
                Prompt = request.PositivePrompt,
                Seed = seed,
                AnswerId = refId,
                FilePath = filePath,
                FileName = $"output_{uuid}.png",
                ContentLength = bytes.Length,
                Width = (int)request.Width!,
                Height = (int)request.Height!,
                ImageDetails = imageDetails,
            });
            // Assume incremental seeds for multiple images as comfyui does not provide the specific image seed back
            seed++;
            var output = filePath;
            await VirtualFiles.WriteFileAsync(output, bytes);
        };

        return new ImageGenerationResponse
        {
            RequestId = refId,
            EngineId = "comfy",
            Key = key,
            Results = results,
        };
    }
    
    public async Task<ImageGenerationResponse> GenerateImageAsync(ImageGeneration request)
    {
        throw new NotImplementedException();
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
    public static CreateGeneration ToComfy(this ImageGeneration request)
    {
        return new CreateGeneration()
        {
            Request = new GenerationArgs()
            {
                Height = request.Height,
                Width = request.Width,
                Seed = (int?)request.Seed ?? Random.Shared.Next(),
                BatchSize = request.Images,
                PositivePrompt = request.Prompt,
                NegativePrompt = $"(nsfw),(nude),(explicit),(gore),(violence),(blood)",
                Model = request.Engine,
                TaskType = AiTaskType.TextToImage
            }
        };
    }
}