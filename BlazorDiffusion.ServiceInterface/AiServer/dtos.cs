/* Options:
Date: 2024-10-04 01:51:48
Version: 8.41
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://localhost:5005

//GlobalNamespace: 
//MakePartial: True
//MakeVirtual: True
//MakeInternal: False
//MakeDataContractsExtensible: False
//AddNullableAnnotations: False
//AddReturnMarker: True
//AddDescriptionAsComments: True
//AddDataContractAttributes: False
//AddIndexesToDataMembers: False
//AddGeneratedCodeAttributes: False
//AddResponseStatus: False
//AddImplicitVersion: 
//InitializeCollections: True
//ExportValueTypes: False
//IncludeTypes: 
ExcludeTypes: BackgroundJob,JobSummary,ScheduledTask,CompletedJob,FailedJob,BackgroundJobBase,BackgroundJobOptions,WorkerStats,BackgroundJobState
AddNamespaces: ServiceStack.Jobs
//AddDefaultXmlNamespace: http://schemas.servicestack.net/types
*/

using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.Serialization;
using ServiceStack;
using ServiceStack.DataAnnotations;
using ServiceStack.Jobs;
using System.IO;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using AiServer.ServiceInterface;

namespace AiServer.ServiceInterface
{
    public partial class CreateTransform
        : IReturn<CreateTransformResponse>
    {
        [Validate("NotNull")]
        public virtual MediaTransformArgs Request { get; set; }

        public virtual string Provider { get; set; }
        public virtual string State { get; set; }
        public virtual string ReplyTo { get; set; }
        public virtual string RefId { get; set; }
    }

    public partial class CreateTransformResponse
    {
        public virtual long Id { get; set; }
        public virtual string RefId { get; set; }
    }

    public partial class PopulateChatSummary
        : IReturn<StringsResponse>, IGet
    {
    }

}

namespace AiServer.ServiceModel
{
    ///<summary>
    ///Active Worker Models available in AI Server
    ///</summary>
    public partial class ActiveAiModels
        : IReturn<StringsResponse>, IGet
    {
    }

    public partial class AdminAddModel
        : IReturn<EmptyResponse>, IPost
    {
        public AdminAddModel()
        {
            ApiTypes = new Dictionary<string, Property>{};
            ApiProviders = new Dictionary<string, ApiProviderModel>{};
        }

        [Validate("NotNull")]
        public virtual AiModel Model { get; set; }

        public virtual Dictionary<string, Property> ApiTypes { get; set; }
        public virtual Dictionary<string, ApiProviderModel> ApiProviders { get; set; }
    }

    public partial class AdminData
        : IReturn<AdminDataResponse>, IGet
    {
    }

    public partial class AdminDataResponse
    {
        public AdminDataResponse()
        {
            PageStats = new List<PageStats>{};
        }

        public virtual List<PageStats> PageStats { get; set; }
    }

    public partial class AiModel
    {
        public AiModel()
        {
            Tags = new List<string>{};
        }

        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual List<string> Tags { get; set; }
        public virtual string Latest { get; set; }
        public virtual string Website { get; set; }
        public virtual string Description { get; set; }
        public virtual string Icon { get; set; }
    }

    public enum AiProvider
    {
        OpenAiProvider,
        GoogleAiProvider,
    }

    public partial class AiProviderFileOutput
    {
        public virtual string FileName { get; set; }
        public virtual string Url { get; set; }
    }

    public partial class AiProviderTextOutput
    {
        public virtual string Text { get; set; }
    }

    public enum AiTaskType
    {
        TextToImage = 1,
        ImageToImage = 2,
        ImageUpscale = 3,
        ImageWithMask = 4,
        ImageToText = 5,
        TextToAudio = 6,
        TextToSpeech = 7,
        SpeechToText = 8,
    }

    public partial class ApiProvider
    {
        public ApiProvider()
        {
            Models = new List<ApiProviderModel>{};
            SelectedModels = new List<string>{};
        }

        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string ApiBaseUrl { get; set; }
        public virtual int ApiTypeId { get; set; }
        public virtual string ApiKeyVar { get; set; }
        public virtual string ApiKey { get; set; }
        public virtual string ApiKeyHeader { get; set; }
        public virtual string HeartbeatUrl { get; set; }
        public virtual int Concurrency { get; set; }
        public virtual int Priority { get; set; }
        public virtual bool Enabled { get; set; }
        public virtual DateTime? OfflineDate { get; set; }
        public virtual DateTime CreatedDate { get; set; }
        public virtual List<ApiProviderModel> Models { get; set; }
        public virtual ApiType ApiType { get; set; }
        [Ignore]
        public virtual List<string> SelectedModels { get; set; }
    }

    public partial class ApiProviderModel
    {
        public virtual string Model { get; set; }
        public virtual string ApiModel { get; set; }
    }

    public partial class ApiType
    {
        public ApiType()
        {
            ApiModels = new Dictionary<string, string>{};
        }

        public virtual int Id { get; set; }
        public virtual AiProvider Provider { get; set; }
        public virtual string Name { get; set; }
        public virtual string Website { get; set; }
        public virtual string ApiBaseUrl { get; set; }
        public virtual string HeartbeatUrl { get; set; }
        public virtual string Icon { get; set; }
        public virtual Dictionary<string, string> ApiModels { get; set; }
    }

    ///<summary>
    ///Output object for generated artifacts
    ///</summary>
    public partial class ArtifactOutput
    {
        ///<summary>
        ///URL to access the generated image
        ///</summary>
        [ApiMember(Description="URL to access the generated image")]
        public virtual string Url { get; set; }

        ///<summary>
        ///Filename of the generated image
        ///</summary>
        [ApiMember(Description="Filename of the generated image")]
        public virtual string FileName { get; set; }

        ///<summary>
        ///Provider used for image generation
        ///</summary>
        [ApiMember(Description="Provider used for image generation")]
        public virtual string Provider { get; set; }
    }

    [DataContract]
    public enum AudioFormat
    {
        [EnumMember(Value="mp3")]
        MP3,
        [EnumMember(Value="wav")]
        WAV,
        [EnumMember(Value="flac")]
        FLAC,
        [EnumMember(Value="ogg")]
        OGG,
    }

    public partial class CancelWorker
        : IReturn<EmptyResponse>
    {
        [Validate("NotEmpty")]
        public virtual string Worker { get; set; }
    }

    public partial class ChangeApiProviderStatus
        : IReturn<StringResponse>, IPost
    {
        public virtual string Provider { get; set; }
        public virtual bool Online { get; set; }
    }

    public partial class ChatApiProvider
        : IReturn<OpenAiChatResponse>, IPost
    {
        public virtual string Provider { get; set; }
        public virtual string Model { get; set; }
        public virtual OpenAiChat Request { get; set; }
        public virtual string Prompt { get; set; }
    }

    public partial class Choice
    {
        ///<summary>
        ///The reason the model stopped generating tokens. This will be stop if the model hit a natural stop point or a provided stop sequence, length if the maximum number of tokens specified in the request was reached, content_filter if content was omitted due to a flag from our content filters, tool_calls if the model called a tool
        ///</summary>
        [DataMember(Name="finish_reason")]
        public virtual string FinishReason { get; set; }

        ///<summary>
        ///The index of the choice in the list of choices.
        ///</summary>
        [DataMember(Name="index")]
        public virtual int Index { get; set; }

        ///<summary>
        ///A chat completion message generated by the model.
        ///</summary>
        [DataMember(Name="message")]
        public virtual ChoiceMessage Message { get; set; }
    }

    [DataContract]
    public partial class ChoiceMessage
    {
        public ChoiceMessage()
        {
            ToolCalls = new ToolCall[]{};
        }

        ///<summary>
        ///The contents of the message.
        ///</summary>
        [DataMember(Name="content")]
        public virtual string Content { get; set; }

        ///<summary>
        ///The tool calls generated by the model, such as function calls.
        ///</summary>
        [DataMember(Name="tool_calls")]
        public virtual ToolCall[] ToolCalls { get; set; }

        ///<summary>
        ///The role of the author of this message.
        ///</summary>
        [DataMember(Name="role")]
        public virtual string Role { get; set; }
    }

    ///<summary>
    ///Convert an image to a different format
    ///</summary>
    public partial class ConvertImage
        : IReturn<byte[]>, IPost
    {
        ///<summary>
        ///The image file to be converted
        ///</summary>
        [ApiMember(Description="The image file to be converted", ParameterType="body")]
        [Required]
        public virtual Stream Image { get; set; }

        ///<summary>
        ///The desired output format for the converted image
        ///</summary>
        [ApiMember(Description="The desired output format for the converted image", ParameterType="query")]
        public virtual string OutputFormat { get; set; }
    }

    [DataContract]
    public enum ConvertVideoOutputFormat
    {
        [EnumMember(Value="mp4")]
        MP4,
        [EnumMember(Value="avi")]
        AVI,
        [EnumMember(Value="mkv")]
        MKV,
        [EnumMember(Value="mov")]
        MOV,
        [EnumMember(Value="webm")]
        WebM,
        [EnumMember(Value="gif")]
        GIF,
    }

    public partial class CreateApiKey
        : IReturn<CreateApiKeyResponse>, IPost
    {
        public CreateApiKey()
        {
            Scopes = new List<string>{};
            Meta = new Dictionary<string, string>{};
        }

        public virtual string Key { get; set; }
        public virtual string Name { get; set; }
        public virtual string UserId { get; set; }
        public virtual string UserName { get; set; }
        public virtual List<string> Scopes { get; set; }
        public virtual string Notes { get; set; }
        public virtual int? RefId { get; set; }
        public virtual string RefIdStr { get; set; }
        public virtual Dictionary<string, string> Meta { get; set; }
    }

    public partial class CreateApiKeyResponse
    {
        public virtual int Id { get; set; }
        public virtual string Key { get; set; }
        public virtual string Name { get; set; }
        public virtual string UserId { get; set; }
        public virtual string UserName { get; set; }
        public virtual string VisibleKey { get; set; }
        public virtual DateTime CreatedDate { get; set; }
        public virtual DateTime? ExpiryDate { get; set; }
        public virtual DateTime? CancelledDate { get; set; }
        public virtual string Notes { get; set; }
    }

    ///<summary>
    ///Different Models available for the API
    ///</summary>
    public partial class CreateApiModel
        : IReturn<IdResponse>, ICreateDb<AiModel>
    {
        public virtual string Name { get; set; }
        public virtual string Website { get; set; }
        public virtual List<string> Tags { get; set; }
        public virtual string Latest { get; set; }
        public virtual string Description { get; set; }
        public virtual string Icon { get; set; }
    }

    ///<summary>
    ///Add an API Provider to process AI Requests
    ///</summary>
    public partial class CreateApiProvider
        : IReturn<IdResponse>, ICreateDb<ApiProvider>
    {
        ///<summary>
        ///The Type of this API Provider
        ///</summary>
        [Validate("GreaterThan(0)")]
        public virtual int ApiTypeId { get; set; }

        ///<summary>
        ///The Base URL for the API Provider
        ///</summary>
        public virtual string ApiBaseUrl { get; set; }
        ///<summary>
        ///The unique name for this API Provider
        ///</summary>
        [Validate("NotEmpty")]
        public virtual string Name { get; set; }

        ///<summary>
        ///The API Key to use for this Provider
        ///</summary>
        public virtual string ApiKeyVar { get; set; }
        ///<summary>
        ///The API Key to use for this Provider
        ///</summary>
        public virtual string ApiKey { get; set; }
        ///<summary>
        ///Send the API Key in the Header instead of Authorization Bearer
        ///</summary>
        public virtual string ApiKeyHeader { get; set; }
        ///<summary>
        ///The URL to check if the API Provider is still online
        ///</summary>
        public virtual string HeartbeatUrl { get; set; }
        ///<summary>
        ///Override API Paths for different AI Requests
        ///</summary>
        public virtual Dictionary<TaskType, string> TaskPaths { get; set; }
        ///<summary>
        ///How many requests should be made concurrently
        ///</summary>
        public virtual int Concurrency { get; set; }
        ///<summary>
        ///What priority to give this Provider to use for processing models
        ///</summary>
        public virtual int Priority { get; set; }
        ///<summary>
        ///Whether the Provider is enabled
        ///</summary>
        public virtual bool Enabled { get; set; }
        ///<summary>
        ///The models this API Provider should process
        ///</summary>
        public virtual List<ApiProviderModel> Models { get; set; }
        ///<summary>
        ///The selected models this API Provider should process
        ///</summary>
        public virtual List<string> SelectedModels { get; set; }
    }

    [Route("/generate", "POST")]
    public partial class CreateGeneration
        : IReturn<CreateGenerationResponse>
    {
        [Validate("NotNull")]
        public virtual GenerationArgs Request { get; set; }

        public virtual string Provider { get; set; }
        public virtual string State { get; set; }
        public virtual string ReplyTo { get; set; }
        public virtual string RefId { get; set; }
    }

    ///<summary>
    ///Add an API Provider to Generation API Providers
    ///</summary>
    public partial class CreateGenerationApiProvider
        : IReturn<IdResponse>, ICreateDb<GenerationApiProvider>
    {
        ///<summary>
        ///The name of the API Provider
        ///</summary>
        public virtual string Name { get; set; }
        ///<summary>
        ///The API Key to use for this Provider
        ///</summary>
        public virtual string ApiKey { get; set; }
        ///<summary>
        ///Send the API Key in the Header instead of Authorization Bearer
        ///</summary>
        public virtual string ApiKeyHeader { get; set; }
        ///<summary>
        ///Base URL for the Generation Provider
        ///</summary>
        public virtual string ApiBaseUrl { get; set; }
        ///<summary>
        ///Url to check if the API is online
        ///</summary>
        public virtual string HeartbeatUrl { get; set; }
        ///<summary>
        ///How many requests should be made concurrently
        ///</summary>
        public virtual int Concurrency { get; set; }
        ///<summary>
        ///What priority to give this Provider to use for processing models
        ///</summary>
        public virtual int Priority { get; set; }
        ///<summary>
        ///Whether the Provider is enabled
        ///</summary>
        public virtual bool Enabled { get; set; }
        ///<summary>
        ///The date the Provider was last online
        ///</summary>
        public virtual DateTime? OfflineDate { get; set; }
        ///<summary>
        ///Models this API Provider should process
        ///</summary>
        public virtual List<string> Models { get; set; }
        public virtual int? GenerationApiTypeId { get; set; }
    }

    public partial class CreateGenerationResponse
    {
        public virtual long Id { get; set; }
        public virtual string RefId { get; set; }
    }

    ///<summary>
    ///Crop an image to a specified area
    ///</summary>
    public partial class CropImage
        : IReturn<byte[]>, IPost
    {
        ///<summary>
        ///The X-coordinate of the top-left corner of the crop area
        ///</summary>
        [ApiMember(Description="The X-coordinate of the top-left corner of the crop area", ParameterType="query")]
        public virtual int X { get; set; }

        ///<summary>
        ///The Y-coordinate of the top-left corner of the crop area
        ///</summary>
        [ApiMember(Description="The Y-coordinate of the top-left corner of the crop area", ParameterType="query")]
        public virtual int Y { get; set; }

        ///<summary>
        ///The width of the crop area
        ///</summary>
        [ApiMember(Description="The width of the crop area", ParameterType="query")]
        public virtual int Width { get; set; }

        ///<summary>
        ///The height of the crop area
        ///</summary>
        [ApiMember(Description="The height of the crop area", ParameterType="query")]
        public virtual int Height { get; set; }

        ///<summary>
        ///The image file to be cropped
        ///</summary>
        [ApiMember(Description="The image file to be cropped", ParameterType="body")]
        [Required]
        public virtual Stream Image { get; set; }
    }

    ///<summary>
    ///Delete API Provider
    ///</summary>
    public partial class DeleteApiProvider
        : IReturnVoid, IDeleteDb<ApiProvider>
    {
        public virtual int Id { get; set; }
    }

    [Route("/files/{**Path}")]
    public partial class DeleteFile
        : IReturn<EmptyResponse>, IDelete
    {
        [Validate("NotEmpty")]
        public virtual string Path { get; set; }
    }

    public partial class DeleteFiles
        : IReturn<DeleteFilesResponse>, IPost
    {
        public DeleteFiles()
        {
            Paths = new List<string>{};
        }

        public virtual List<string> Paths { get; set; }
    }

    public partial class DeleteFilesResponse
    {
        public DeleteFilesResponse()
        {
            Deleted = new List<string>{};
            Missing = new List<string>{};
            Failed = new List<string>{};
        }

        public virtual List<string> Deleted { get; set; }
        public virtual List<string> Missing { get; set; }
        public virtual List<string> Failed { get; set; }
        public virtual ResponseStatus ResponseStatus { get; set; }
    }

    ///<summary>
    ///Delete a Generation API Provider
    ///</summary>
    public partial class DeleteGenerationApiProvider
        : IReturn<IdResponse>, IDeleteDb<GenerationApiProvider>
    {
        public virtual int? Id { get; set; }
        public virtual string Name { get; set; }
    }

    public partial class GenerationArgs
    {
        public virtual string Model { get; set; }
        public virtual int? Steps { get; set; }
        public virtual int? BatchSize { get; set; }
        public virtual int? Seed { get; set; }
        public virtual string PositivePrompt { get; set; }
        public virtual string NegativePrompt { get; set; }
        public virtual Stream ImageInput { get; set; }
        public virtual Stream SpeechInput { get; set; }
        public virtual Stream MaskInput { get; set; }
        public virtual Stream AudioInput { get; set; }
        public virtual ComfySampler? Sampler { get; set; }
        public virtual string Scheduler { get; set; }
        public virtual double? CfgScale { get; set; }
        public virtual double? Denoise { get; set; }
        public virtual string UpscaleModel { get; set; }
        public virtual int? Width { get; set; }
        public virtual int? Height { get; set; }
        public virtual AiTaskType? TaskType { get; set; }
        public virtual string Clip { get; set; }
        public virtual double? SampleLength { get; set; }
        public virtual ComfyMaskSource MaskChannel { get; set; }
        public virtual string AspectRatio { get; set; }
        public virtual double? Quality { get; set; }
        public virtual string Voice { get; set; }
        public virtual string Language { get; set; }
    }

    public partial class GenerationResult
    {
        public GenerationResult()
        {
            TextOutputs = new List<AiProviderTextOutput>{};
            Outputs = new List<AiProviderFileOutput>{};
        }

        public virtual List<AiProviderTextOutput> TextOutputs { get; set; }
        public virtual List<AiProviderFileOutput> Outputs { get; set; }
        public virtual string Error { get; set; }
    }

    public partial class GetActiveProviders
        : IReturn<GetActiveProvidersResponse>, IGet
    {
    }

    public partial class GetActiveProvidersResponse
    {
        public GetActiveProvidersResponse()
        {
            Results = new ApiProvider[]{};
        }

        public virtual ApiProvider[] Results { get; set; }
        public virtual ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/artifacts/{**Path}")]
    public partial class GetArtifact
        : IReturn<byte[]>, IGet
    {
        [Validate("NotEmpty")]
        public virtual string Path { get; set; }
    }

    public partial class GetComfyModelMappings
        : IReturn<GetComfyModelMappingsResponse>
    {
    }

    public partial class GetComfyModelMappingsResponse
    {
        public GetComfyModelMappingsResponse()
        {
            Models = new Dictionary<string, string>{};
        }

        public virtual Dictionary<string, string> Models { get; set; }
    }

    public partial class GetComfyModels
        : IReturn<GetComfyModelsResponse>
    {
        public virtual string ApiBaseUrl { get; set; }
        public virtual string ApiKey { get; set; }
    }

    public partial class GetComfyModelsResponse
    {
        public GetComfyModelsResponse()
        {
            Results = new List<string>{};
        }

        public virtual List<string> Results { get; set; }
        public virtual ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/generation/{Id}", "GET")]
    [Route("/generation/ref/{RefId}", "GET")]
    public partial class GetGeneration
        : IReturn<GetGenerationResponse>
    {
        public virtual int? Id { get; set; }
        public virtual string RefId { get; set; }
    }

    public partial class GetGenerationResponse
    {
        public GetGenerationResponse()
        {
            Outputs = new List<AiProviderFileOutput>{};
            TextOutputs = new List<AiProviderTextOutput>{};
        }

        public virtual GenerationArgs Request { get; set; }
        public virtual GenerationResult Result { get; set; }
        public virtual List<AiProviderFileOutput> Outputs { get; set; }
        public virtual List<AiProviderTextOutput> TextOutputs { get; set; }
    }

    ///<summary>
    ///Get job status
    ///</summary>
    [Api(Description="Get job status")]
    public partial class GetJobStatus
        : IReturn<GetJobStatusResponse>
    {
        ///<summary>
        ///Unique identifier of the background job
        ///</summary>
        [ApiMember(Description="Unique identifier of the background job", ParameterType="query")]
        public virtual long? JobId { get; set; }

        ///<summary>
        ///Client-provided identifier for the request
        ///</summary>
        [ApiMember(Description="Client-provided identifier for the request", ParameterType="query")]
        public virtual string RefId { get; set; }
    }

    public partial class GetJobStatusResponse
    {
        public GetJobStatusResponse()
        {
            Outputs = new List<ArtifactOutput>{};
            TextOutputs = new List<TextOutput>{};
        }

        ///<summary>
        ///Unique identifier of the background job
        ///</summary>
        [ApiMember(Description="Unique identifier of the background job")]
        public virtual long JobId { get; set; }

        ///<summary>
        ///Client-provided identifier for the request
        ///</summary>
        [ApiMember(Description="Client-provided identifier for the request")]
        public virtual string RefId { get; set; }

        ///<summary>
        ///Current state of the background job
        ///</summary>
        [ApiMember(Description="Current state of the background job")]
        public virtual BackgroundJobState JobState { get; set; }

        ///<summary>
        ///Current status of the generation request
        ///</summary>
        [ApiMember(Description="Current status of the generation request")]
        public virtual string Status { get; set; }

        ///<summary>
        ///List of generated outputs
        ///</summary>
        [ApiMember(Description="List of generated outputs")]
        public virtual List<ArtifactOutput> Outputs { get; set; }

        ///<summary>
        ///List of generated text outputs
        ///</summary>
        [ApiMember(Description="List of generated text outputs")]
        public virtual List<TextOutput> TextOutputs { get; set; }

        ///<summary>
        ///Detailed response status information
        ///</summary>
        [ApiMember(Description="Detailed response status information")]
        public virtual ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/icons/models/{Model}", "GET")]
    public partial class GetModelImage
        : IReturn<byte[]>, IGet
    {
        public virtual string Model { get; set; }
    }

    public partial class GetOllamaModels
        : IReturn<GetOllamaModelsResponse>, IGet
    {
        [Validate("NotEmpty")]
        public virtual string ApiBaseUrl { get; set; }
    }

    public partial class GetOllamaModelsResponse
    {
        public GetOllamaModelsResponse()
        {
            Results = new List<OllamaModel>{};
        }

        public virtual List<OllamaModel> Results { get; set; }
        public virtual ResponseStatus ResponseStatus { get; set; }
    }

    public partial class GetOpenAiChat
        : IReturn<GetOpenAiChatResponse>, IGet
    {
        public virtual int? Id { get; set; }
        public virtual string RefId { get; set; }
    }

    public partial class GetOpenAiChatResponse
    {
        public virtual BackgroundJobBase Result { get; set; }
        public virtual ResponseStatus ResponseStatus { get; set; }
    }

    public partial class GetSummaryStats
        : IReturn<GetSummaryStatsResponse>, IGet
    {
        public virtual DateTime? From { get; set; }
        public virtual DateTime? To { get; set; }
    }

    public partial class GetSummaryStatsResponse
    {
        public GetSummaryStatsResponse()
        {
            ProviderStats = new List<SummaryStats>{};
            ModelStats = new List<SummaryStats>{};
            MonthStats = new List<SummaryStats>{};
        }

        public virtual List<SummaryStats> ProviderStats { get; set; }
        public virtual List<SummaryStats> ModelStats { get; set; }
        public virtual List<SummaryStats> MonthStats { get; set; }
    }

    [Route("/variants/{Variant}/{**Path}")]
    public partial class GetVariant
        : IReturn<byte[]>, IGet
    {
        [Validate("NotEmpty")]
        public virtual string Variant { get; set; }

        [Validate("NotEmpty")]
        public virtual string Path { get; set; }
    }

    public partial class GetWorkerStats
        : IReturn<GetWorkerStatsResponse>, IGet
    {
    }

    public partial class GetWorkerStatsResponse
    {
        public GetWorkerStatsResponse()
        {
            Results = new List<WorkerStats>{};
            QueueCounts = new Dictionary<string, int>{};
        }

        public virtual List<WorkerStats> Results { get; set; }
        public virtual Dictionary<string, int> QueueCounts { get; set; }
        public virtual ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/hello/{Name}")]
    public partial class Hello
        : IReturn<HelloResponse>, IGet
    {
        public virtual string Name { get; set; }
    }

    public partial class HelloResponse
    {
        public virtual string Result { get; set; }
    }

    ///<summary>
    ///Base class for queue generation requests
    ///</summary>
    public partial interface IQueueGeneration
    {
        string RefId { get; set; }
        string ReplyTo { get; set; }
        string Tag { get; set; }
        string State { get; set; }
    }

    public partial interface IQueueMediaTransform
    {
        string RefId { get; set; }
        string Tag { get; set; }
        string ReplyTo { get; set; }
    }

    public partial class MediaTransformArgs
    {
        public virtual MediaTransformTaskType? TaskType { get; set; }
        public virtual Stream VideoInput { get; set; }
        public virtual Stream AudioInput { get; set; }
        public virtual Stream ImageInput { get; set; }
        public virtual Stream WatermarkInput { get; set; }
        public virtual string VideoFileName { get; set; }
        public virtual string AudioFileName { get; set; }
        public virtual string ImageFileName { get; set; }
        public virtual string WatermarkFileName { get; set; }
        public virtual MediaTransformOutputFormat? OutputFormat { get; set; }
        public virtual int? ScaleWidth { get; set; }
        public virtual int? ScaleHeight { get; set; }
        public virtual int? CropX { get; set; }
        public virtual int? CropY { get; set; }
        public virtual int? CropWidth { get; set; }
        public virtual int? CropHeight { get; set; }
        public virtual float? CutStart { get; set; }
        public virtual float? CutEnd { get; set; }
        public virtual Stream WatermarkFile { get; set; }
        public virtual string WatermarkPosition { get; set; }
        public virtual string WatermarkScale { get; set; }
        public virtual string AudioCodec { get; set; }
        public virtual string VideoCodec { get; set; }
        public virtual string AudioBitrate { get; set; }
        public virtual int? AudioSampleRate { get; set; }
    }

    [DataContract]
    public enum MediaTransformOutputFormat
    {
        [EnumMember(Value="mp4")]
        MP4,
        [EnumMember(Value="avi")]
        AVI,
        [EnumMember(Value="mkv")]
        MKV,
        [EnumMember(Value="mov")]
        MOV,
        [EnumMember(Value="webm")]
        WebM,
        [EnumMember(Value="gif")]
        GIF,
        [EnumMember(Value="mp3")]
        MP3,
        [EnumMember(Value="wav")]
        WAV,
        [EnumMember(Value="flac")]
        FLAC,
    }

    public enum MediaTransformTaskType
    {
        ImageScale,
        VideoScale,
        ImageConvert,
        AudioConvert,
        VideoConvert,
        ImageCrop,
        VideoCrop,
        VideoCut,
        AudioCut,
        WatermarkImage,
        WatermarkVideo,
    }

    public partial class MigrateArtifact
        : IReturn<MigrateArtifactResponse>, IPost
    {
        public virtual string Path { get; set; }
        public virtual DateTime? Date { get; set; }
    }

    public partial class MigrateArtifactResponse
    {
        public virtual string FilePath { get; set; }
        public virtual ResponseStatus ResponseStatus { get; set; }
    }

    [DataContract]
    public partial class OllamaModel
    {
        [DataMember(Name="name")]
        public virtual string Name { get; set; }

        [DataMember(Name="model")]
        public virtual string Model { get; set; }

        [DataMember(Name="modified_at")]
        public virtual DateTime ModifiedAt { get; set; }

        [DataMember(Name="size")]
        public virtual long Size { get; set; }

        [DataMember(Name="digest")]
        public virtual string Digest { get; set; }

        [DataMember(Name="details")]
        public virtual OllamaModelDetails Details { get; set; }
    }

    [DataContract]
    public partial class OllamaModelDetails
    {
        public OllamaModelDetails()
        {
            Families = new List<string>{};
        }

        [DataMember(Name="parent_model")]
        public virtual string ParentModel { get; set; }

        [DataMember(Name="format")]
        public virtual string Format { get; set; }

        [DataMember(Name="family")]
        public virtual string Family { get; set; }

        [DataMember(Name="families")]
        public virtual List<string> Families { get; set; }

        [DataMember(Name="parameter_size")]
        public virtual string ParameterSize { get; set; }

        [DataMember(Name="quantization_level")]
        public virtual string QuantizationLevel { get; set; }
    }

    ///<summary>
    ///Given a list of messages comprising a conversation, the model will return a response.
    ///</summary>
    [DataContract]
    public partial class OpenAiChat
    {
        public OpenAiChat()
        {
            Messages = new List<OpenAiMessage>{};
            LogitBias = new Dictionary<int, int>{};
            Stop = new List<string>{};
            Tools = new List<OpenAiTools>{};
        }

        ///<summary>
        ///A list of messages comprising the conversation so far.
        ///</summary>
        [DataMember(Name="messages")]
        public virtual List<OpenAiMessage> Messages { get; set; }

        ///<summary>
        ///ID of the model to use. See the model endpoint compatibility table for details on which models work with the Chat API
        ///</summary>
        [DataMember(Name="model")]
        public virtual string Model { get; set; }

        ///<summary>
        ///Number between `-2.0` and `2.0`. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
        ///</summary>
        [DataMember(Name="frequency_penalty")]
        public virtual double? FrequencyPenalty { get; set; }

        ///<summary>
        ///Modify the likelihood of specified tokens appearing in the completion.
        ///</summary>
        [DataMember(Name="logit_bias")]
        public virtual Dictionary<int, int> LogitBias { get; set; }

        ///<summary>
        ///Whether to return log probabilities of the output tokens or not. If true, returns the log probabilities of each output token returned in the content of message.
        ///</summary>
        [DataMember(Name="logprobs")]
        public virtual bool? LogProbs { get; set; }

        ///<summary>
        ///An integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability. logprobs must be set to true if this parameter is used.
        ///</summary>
        [DataMember(Name="top_logprobs")]
        public virtual int? TopLogProbs { get; set; }

        ///<summary>
        ///The maximum number of tokens that can be generated in the chat completion.
        ///</summary>
        [DataMember(Name="max_tokens")]
        public virtual int? MaxTokens { get; set; }

        ///<summary>
        ///How many chat completion choices to generate for each input message. Note that you will be charged based on the number of generated tokens across all of the choices. Keep `n` as `1` to minimize costs.
        ///</summary>
        [DataMember(Name="n")]
        public virtual int? N { get; set; }

        ///<summary>
        ///Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
        ///</summary>
        [DataMember(Name="presence_penalty")]
        public virtual double? PresencePenalty { get; set; }

        ///<summary>
        ///An object specifying the format that the model must output. Compatible with GPT-4 Turbo and all GPT-3.5 Turbo models newer than `gpt-3.5-turbo-1106`. Setting Type to ResponseFormat.JsonObject enables JSON mode, which guarantees the message the model generates is valid JSON.
        ///</summary>
        [DataMember(Name="response_format")]
        public virtual OpenAiResponseFormat ResponseFormat { get; set; }

        ///<summary>
        ///This feature is in Beta. If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed, and you should refer to the system_fingerprint response parameter to monitor changes in the backend.
        ///</summary>
        [DataMember(Name="seed")]
        public virtual int? Seed { get; set; }

        ///<summary>
        ///Up to 4 sequences where the API will stop generating further tokens.
        ///</summary>
        [DataMember(Name="stop")]
        public virtual List<string> Stop { get; set; }

        ///<summary>
        ///If set, partial message deltas will be sent, like in ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a `data: [DONE]` message.
        ///</summary>
        [DataMember(Name="stream")]
        public virtual bool? Stream { get; set; }

        ///<summary>
        ///What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
        ///</summary>
        [DataMember(Name="temperature")]
        public virtual double? Temperature { get; set; }

        ///<summary>
        ///An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
        ///</summary>
        [DataMember(Name="top_p")]
        public virtual double? TopP { get; set; }

        ///<summary>
        ///A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for. A max of 128 functions are supported.
        ///</summary>
        [DataMember(Name="tools")]
        public virtual List<OpenAiTools> Tools { get; set; }

        ///<summary>
        ///A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse.
        ///</summary>
        [DataMember(Name="user")]
        public virtual string User { get; set; }
    }

    ///<summary>
    ///Given a list of messages comprising a conversation, the model will return a response.
    ///</summary>
    [Route("/v1/chat/completions", "POST")]
    public partial class OpenAiChatCompletion
        : OpenAiChat, IReturn<OpenAiChatResponse>, IPost
    {
        public virtual string RefId { get; set; }
        public virtual string Provider { get; set; }
        public virtual string Tag { get; set; }
    }

    [DataContract]
    public partial class OpenAiChatResponse
    {
        public OpenAiChatResponse()
        {
            Choices = new List<Choice>{};
        }

        ///<summary>
        ///A unique identifier for the chat completion.
        ///</summary>
        [DataMember(Name="id")]
        public virtual string Id { get; set; }

        ///<summary>
        ///A list of chat completion choices. Can be more than one if n is greater than 1.
        ///</summary>
        [DataMember(Name="choices")]
        public virtual List<Choice> Choices { get; set; }

        ///<summary>
        ///The Unix timestamp (in seconds) of when the chat completion was created.
        ///</summary>
        [DataMember(Name="created")]
        public virtual long Created { get; set; }

        ///<summary>
        ///The model used for the chat completion.
        ///</summary>
        [DataMember(Name="model")]
        public virtual string Model { get; set; }

        ///<summary>
        ///This fingerprint represents the backend configuration that the model runs with.
        ///</summary>
        [DataMember(Name="system_fingerprint")]
        public virtual string SystemFingerprint { get; set; }

        ///<summary>
        ///The object type, which is always chat.completion.
        ///</summary>
        [DataMember(Name="object")]
        public virtual string Object { get; set; }

        ///<summary>
        ///Usage statistics for the completion request.
        ///</summary>
        [DataMember(Name="usage")]
        public virtual OpenAiUsage Usage { get; set; }

        [DataMember(Name="responseStatus")]
        public virtual ResponseStatus ResponseStatus { get; set; }
    }

    ///<summary>
    ///A list of messages comprising the conversation so far.
    ///</summary>
    [DataContract]
    public partial class OpenAiMessage
    {
        public OpenAiMessage()
        {
            ToolCalls = new ToolCall[]{};
        }

        ///<summary>
        ///The contents of the message.
        ///</summary>
        [DataMember(Name="content")]
        public virtual string Content { get; set; }

        ///<summary>
        ///The role of the author of this message. Valid values are `system`, `user`, `assistant` and `tool`.
        ///</summary>
        [DataMember(Name="role")]
        public virtual string Role { get; set; }

        ///<summary>
        ///An optional name for the participant. Provides the model information to differentiate between participants of the same role.
        ///</summary>
        [DataMember(Name="name")]
        public virtual string Name { get; set; }

        ///<summary>
        ///The tool calls generated by the model, such as function calls.
        ///</summary>
        [DataMember(Name="tool_calls")]
        public virtual ToolCall[] ToolCalls { get; set; }

        ///<summary>
        ///Tool call that this message is responding to.
        ///</summary>
        [DataMember(Name="tool_call_id")]
        public virtual string ToolCallId { get; set; }
    }

    [DataContract]
    public partial class OpenAiResponseFormat
    {
        ///<summary>
        ///An object specifying the format that the model must output. Compatible with GPT-4 Turbo and all GPT-3.5 Turbo models newer than gpt-3.5-turbo-1106.
        ///</summary>
        [DataMember(Name="response_format")]
        public virtual ResponseFormat Type { get; set; }
    }

    [DataContract]
    public partial class OpenAiTools
    {
        ///<summary>
        ///The type of the tool. Currently, only function is supported.
        ///</summary>
        [DataMember(Name="type")]
        public virtual OpenAiToolType Type { get; set; }
    }

    public enum OpenAiToolType
    {
        [EnumMember(Value="function")]
        Function,
    }

    ///<summary>
    ///Usage statistics for the completion request.
    ///</summary>
    [DataContract]
    public partial class OpenAiUsage
    {
        ///<summary>
        ///Number of tokens in the generated completion.
        ///</summary>
        [DataMember(Name="completion_tokens")]
        public virtual int CompletionTokens { get; set; }

        ///<summary>
        ///Number of tokens in the prompt.
        ///</summary>
        [DataMember(Name="prompt_tokens")]
        public virtual int PromptTokens { get; set; }

        ///<summary>
        ///Total number of tokens used in the request (prompt + completion).
        ///</summary>
        [DataMember(Name="total_tokens")]
        public virtual int TotalTokens { get; set; }
    }

    public partial class PageStats
    {
        public virtual string Label { get; set; }
        public virtual int Total { get; set; }
    }

    ///<summary>
    ///Different Models available in AI Server
    ///</summary>
    public partial class QueryApiModels
        : QueryDb<AiModel>, IReturn<QueryResponse<AiModel>>
    {
    }

    ///<summary>
    ///API Providers
    ///</summary>
    public partial class QueryApiProviders
        : QueryDb<ApiProvider>, IReturn<QueryResponse<ApiProvider>>
    {
        public virtual string Name { get; set; }
    }

    ///<summary>
    ///The Type and behavior of different API Providers
    ///</summary>
    public partial class QueryApiTypes
        : QueryDb<ApiType>, IReturn<QueryResponse<ApiType>>
    {
    }

    ///<summary>
    ///Media Providers
    ///</summary>
    public partial class QueryGenerationApiProviders
        : QueryDb<GenerationApiProvider>, IReturn<QueryResponse<GenerationApiProvider>>
    {
        public virtual int? Id { get; set; }
        public virtual string Name { get; set; }
    }

    ///<summary>
    ///Media Model Settings
    ///</summary>
    public partial class QueryGenerationModelSettings
        : QueryDb<ProviderModelDefaults>, IReturn<QueryResponse<ProviderModelDefaults>>
    {
        public virtual string Id { get; set; }
    }

    ///<summary>
    ///Convert an audio file to a different format
    ///</summary>
    public partial class QueueConvertAudio
        : IReturn<QueueMediaTransformResponse>, IQueueMediaTransform
    {
        ///<summary>
        ///The desired output format for the converted audio
        ///</summary>
        [ApiMember(Description="The desired output format for the converted audio", ParameterType="query")]
        [Required]
        public virtual AudioFormat OutputFormat { get; set; }

        [Required]
        public virtual Stream Audio { get; set; }

        ///<summary>
        ///Optional client-provided identifier for the request
        ///</summary>
        [ApiMember(Description="Optional client-provided identifier for the request", ParameterType="query")]
        public virtual string RefId { get; set; }

        ///<summary>
        ///Optional queue or topic to reply to
        ///</summary>
        [ApiMember(Description="Optional queue or topic to reply to", ParameterType="query")]
        public virtual string ReplyTo { get; set; }

        ///<summary>
        ///Tag to identify the request
        ///</summary>
        [ApiMember(Description="Tag to identify the request", ParameterType="query")]
        public virtual string Tag { get; set; }
    }

    ///<summary>
    ///Convert a video to a different format
    ///</summary>
    public partial class QueueConvertVideo
        : IReturn<QueueMediaTransformResponse>, IQueueMediaTransform
    {
        ///<summary>
        ///The desired output format for the converted video
        ///</summary>
        [ApiMember(Description="The desired output format for the converted video", ParameterType="query")]
        [Required]
        public virtual ConvertVideoOutputFormat OutputFormat { get; set; }

        [Required]
        public virtual Stream Video { get; set; }

        ///<summary>
        ///Optional client-provided identifier for the request
        ///</summary>
        [ApiMember(Description="Optional client-provided identifier for the request", ParameterType="query")]
        public virtual string RefId { get; set; }

        ///<summary>
        ///Optional queue or topic to reply to
        ///</summary>
        [ApiMember(Description="Optional queue or topic to reply to", ParameterType="query")]
        public virtual string ReplyTo { get; set; }

        ///<summary>
        ///Tag to identify the request
        ///</summary>
        [ApiMember(Description="Tag to identify the request", ParameterType="query")]
        public virtual string Tag { get; set; }
    }

    ///<summary>
    ///Crop a video to a specified area
    ///</summary>
    public partial class QueueCropVideo
        : IReturn<QueueMediaTransformResponse>, IQueueMediaTransform
    {
        ///<summary>
        ///The X-coordinate of the top-left corner of the crop area
        ///</summary>
        [ApiMember(Description="The X-coordinate of the top-left corner of the crop area", ParameterType="query")]
        [Validate("GreaterThan(0)")]
        [Required]
        public virtual int X { get; set; }

        ///<summary>
        ///The Y-coordinate of the top-left corner of the crop area
        ///</summary>
        [ApiMember(Description="The Y-coordinate of the top-left corner of the crop area", ParameterType="query")]
        [Validate("GreaterThan(0)")]
        [Required]
        public virtual int Y { get; set; }

        ///<summary>
        ///The width of the crop area
        ///</summary>
        [ApiMember(Description="The width of the crop area", ParameterType="query")]
        [Validate("GreaterThan(0)")]
        [Required]
        public virtual int Width { get; set; }

        ///<summary>
        ///The height of the crop area
        ///</summary>
        [ApiMember(Description="The height of the crop area", ParameterType="query")]
        [Validate("GreaterThan(0)")]
        [Required]
        public virtual int Height { get; set; }

        [Required]
        public virtual Stream Video { get; set; }

        ///<summary>
        ///Optional client-provided identifier for the request
        ///</summary>
        [ApiMember(Description="Optional client-provided identifier for the request", ParameterType="query")]
        public virtual string RefId { get; set; }

        ///<summary>
        ///Optional queue or topic to reply to
        ///</summary>
        [ApiMember(Description="Optional queue or topic to reply to", ParameterType="query")]
        public virtual string ReplyTo { get; set; }

        ///<summary>
        ///Tag to identify the request
        ///</summary>
        [ApiMember(Description="Tag to identify the request", ParameterType="query")]
        public virtual string Tag { get; set; }
    }

    public partial class QueueGenerationResponse
    {
        ///<summary>
        ///Unique identifier of the background job
        ///</summary>
        [ApiMember(Description="Unique identifier of the background job")]
        public virtual long JobId { get; set; }

        ///<summary>
        ///Client-provided identifier for the request
        ///</summary>
        [ApiMember(Description="Client-provided identifier for the request")]
        public virtual string RefId { get; set; }

        ///<summary>
        ///Current state of the background job
        ///</summary>
        [ApiMember(Description="Current state of the background job")]
        public virtual BackgroundJobState JobState { get; set; }

        ///<summary>
        ///Current status of the generation request
        ///</summary>
        [ApiMember(Description="Current status of the generation request")]
        public virtual string Status { get; set; }

        ///<summary>
        ///Detailed response status information
        ///</summary>
        [ApiMember(Description="Detailed response status information")]
        public virtual ResponseStatus ResponseStatus { get; set; }
    }

    ///<summary>
    ///Generate image from another image
    ///</summary>
    [Api(Description="Generate image from another image")]
    public partial class QueueImageToImage
        : IReturn<QueueGenerationResponse>, IQueueGeneration
    {
        ///<summary>
        ///The image to use as input
        ///</summary>
        [ApiMember(Description="The image to use as input", ParameterType="body")]
        [Required]
        public virtual Stream Image { get; set; }

        ///<summary>
        ///Prompt describing the desired output
        ///</summary>
        [ApiMember(Description="Prompt describing the desired output", ParameterType="body")]
        [Validate("NotEmpty")]
        public virtual string PositivePrompt { get; set; }

        ///<summary>
        ///Negative prompt describing what should not be in the image
        ///</summary>
        [ApiMember(Description="Negative prompt describing what should not be in the image", ParameterType="body")]
        public virtual string NegativePrompt { get; set; }

        ///<summary>
        ///Optional specific amount of denoise to apply
        ///</summary>
        [ApiMember(Description="Optional specific amount of denoise to apply", ParameterType="query")]
        public virtual float? Denoise { get; set; }

        ///<summary>
        ///Number of images to generate in a single batch
        ///</summary>
        [ApiMember(Description="Number of images to generate in a single batch", ParameterType="query")]
        public virtual int? BatchSize { get; set; }

        ///<summary>
        ///Optional seed for reproducible results in image generation
        ///</summary>
        [ApiMember(Description="Optional seed for reproducible results in image generation", ParameterType="query")]
        public virtual int? Seed { get; set; }

        ///<summary>
        ///Optional client-provided identifier for the request
        ///</summary>
        [ApiMember(Description="Optional client-provided identifier for the request", ParameterType="query")]
        public virtual string RefId { get; set; }

        ///<summary>
        ///Optional queue or topic to reply to
        ///</summary>
        [ApiMember(Description="Optional queue or topic to reply to", ParameterType="query")]
        public virtual string ReplyTo { get; set; }

        ///<summary>
        ///Optional state to associate with the request
        ///</summary>
        [ApiMember(Description="Optional state to associate with the request", ParameterType="query")]
        public virtual string State { get; set; }

        ///<summary>
        ///Tag to identify the request
        ///</summary>
        [ApiMember(Description="Tag to identify the request", ParameterType="query")]
        public virtual string Tag { get; set; }
    }

    ///<summary>
    ///Convert image to text
    ///</summary>
    [Api(Description="Convert image to text")]
    public partial class QueueImageToText
        : IReturn<QueueGenerationResponse>, IQueueGeneration
    {
        ///<summary>
        ///The image to convert to text
        ///</summary>
        [ApiMember(Description="The image to convert to text", ParameterType="body")]
        [Required]
        public virtual Stream Image { get; set; }

        ///<summary>
        ///Optional client-provided identifier for the request
        ///</summary>
        [ApiMember(Description="Optional client-provided identifier for the request", ParameterType="query")]
        public virtual string RefId { get; set; }

        ///<summary>
        ///Optional queue or topic to reply to
        ///</summary>
        [ApiMember(Description="Optional queue or topic to reply to", ParameterType="query")]
        public virtual string ReplyTo { get; set; }

        ///<summary>
        ///Tag to identify the request
        ///</summary>
        [ApiMember(Description="Tag to identify the request", ParameterType="query")]
        public virtual string Tag { get; set; }

        ///<summary>
        ///Optional state to associate with the request
        ///</summary>
        [ApiMember(Description="Optional state to associate with the request", ParameterType="query")]
        public virtual string State { get; set; }
    }

    ///<summary>
    ///Upscale an image
    ///</summary>
    [Api(Description="Upscale an image")]
    public partial class QueueImageUpscale
        : IReturn<QueueGenerationResponse>, IQueueGeneration
    {
        ///<summary>
        ///The image to upscale
        ///</summary>
        [ApiMember(Description="The image to upscale", ParameterType="body")]
        [Required]
        public virtual Stream Image { get; set; }

        ///<summary>
        ///Optional seed for reproducible results in image generation
        ///</summary>
        [ApiMember(Description="Optional seed for reproducible results in image generation", ParameterType="query")]
        public virtual int? Seed { get; set; }

        ///<summary>
        ///Optional client-provided identifier for the request
        ///</summary>
        [ApiMember(Description="Optional client-provided identifier for the request", ParameterType="query")]
        public virtual string RefId { get; set; }

        ///<summary>
        ///Optional queue or topic to reply to
        ///</summary>
        [ApiMember(Description="Optional queue or topic to reply to", ParameterType="query")]
        public virtual string ReplyTo { get; set; }

        ///<summary>
        ///Tag to identify the request
        ///</summary>
        [ApiMember(Description="Tag to identify the request", ParameterType="query")]
        public virtual string Tag { get; set; }

        ///<summary>
        ///Optional state to associate with the request
        ///</summary>
        [ApiMember(Description="Optional state to associate with the request", ParameterType="query")]
        public virtual string State { get; set; }
    }

    ///<summary>
    ///Generate image with masked area
    ///</summary>
    [Api(Description="Generate image with masked area")]
    public partial class QueueImageWithMask
        : IReturn<QueueGenerationResponse>, IQueueGeneration
    {
        ///<summary>
        ///Prompt describing the desired output in the masked area
        ///</summary>
        [ApiMember(Description="Prompt describing the desired output in the masked area", ParameterType="body")]
        [Validate("NotEmpty")]
        public virtual string PositivePrompt { get; set; }

        ///<summary>
        ///Negative prompt describing what should not be in the masked area
        ///</summary>
        [ApiMember(Description="Negative prompt describing what should not be in the masked area", ParameterType="body")]
        public virtual string NegativePrompt { get; set; }

        ///<summary>
        ///The image to use as input
        ///</summary>
        [ApiMember(Description="The image to use as input", ParameterType="body")]
        [Required]
        public virtual Stream Image { get; set; }

        ///<summary>
        ///The mask to use as input
        ///</summary>
        [ApiMember(Description="The mask to use as input", ParameterType="body")]
        [Required]
        public virtual Stream Mask { get; set; }

        ///<summary>
        ///Optional specific amount of denoise to apply
        ///</summary>
        [ApiMember(Description="Optional specific amount of denoise to apply", ParameterType="query")]
        public virtual float? Denoise { get; set; }

        ///<summary>
        ///Optional seed for reproducible results in image generation
        ///</summary>
        [ApiMember(Description="Optional seed for reproducible results in image generation", ParameterType="query")]
        public virtual int? Seed { get; set; }

        ///<summary>
        ///Optional client-provided identifier for the request
        ///</summary>
        [ApiMember(Description="Optional client-provided identifier for the request", ParameterType="query")]
        public virtual string RefId { get; set; }

        ///<summary>
        ///Optional queue or topic to reply to
        ///</summary>
        [ApiMember(Description="Optional queue or topic to reply to", ParameterType="query")]
        public virtual string ReplyTo { get; set; }

        ///<summary>
        ///Tag to identify the request
        ///</summary>
        [ApiMember(Description="Tag to identify the request", ParameterType="query")]
        public virtual string Tag { get; set; }

        ///<summary>
        ///Optional state to associate with the request
        ///</summary>
        [ApiMember(Description="Optional state to associate with the request", ParameterType="query")]
        public virtual string State { get; set; }
    }

    ///<summary>
    ///Base class for queueable transformation requests
    ///</summary>
    public partial class QueueMediaTransformResponse
    {
        ///<summary>
        ///Unique identifier of the background job
        ///</summary>
        [ApiMember(Description="Unique identifier of the background job")]
        public virtual long JobId { get; set; }

        ///<summary>
        ///Client-provided identifier for the request
        ///</summary>
        [ApiMember(Description="Client-provided identifier for the request")]
        public virtual string RefId { get; set; }

        ///<summary>
        ///Current state of the background job
        ///</summary>
        [ApiMember(Description="Current state of the background job")]
        public virtual BackgroundJobState JobState { get; set; }

        ///<summary>
        ///Current status of the transformation request
        ///</summary>
        [ApiMember(Description="Current status of the transformation request")]
        public virtual string Status { get; set; }

        ///<summary>
        ///Detailed response status information
        ///</summary>
        [ApiMember(Description="Detailed response status information")]
        public virtual ResponseStatus ResponseStatus { get; set; }
    }

    public partial class QueueOpenAiChatCompletion
        : IReturn<QueueOpenAiChatResponse>
    {
        public virtual string RefId { get; set; }
        public virtual string Provider { get; set; }
        public virtual string ReplyTo { get; set; }
        public virtual string Tag { get; set; }
        public virtual OpenAiChat Request { get; set; }
    }

    public partial class QueueOpenAiChatResponse
    {
        public virtual long Id { get; set; }
        public virtual string RefId { get; set; }
        public virtual ResponseStatus ResponseStatus { get; set; }
    }

    ///<summary>
    ///Scale video
    ///</summary>
    [Api(Description="Scale video")]
    public partial class QueueScaleVideo
        : IReturn<QueueMediaTransformResponse>, IQueueMediaTransform
    {
        ///<summary>
        ///The video file to be scaled
        ///</summary>
        [ApiMember(Description="The video file to be scaled", ParameterType="body")]
        [Required]
        public virtual Stream Video { get; set; }

        ///<summary>
        ///Desired width of the scaled video
        ///</summary>
        [ApiMember(Description="Desired width of the scaled video", ParameterType="query")]
        public virtual int? Width { get; set; }

        ///<summary>
        ///Desired height of the scaled video
        ///</summary>
        [ApiMember(Description="Desired height of the scaled video", ParameterType="query")]
        public virtual int? Height { get; set; }

        ///<summary>
        ///Optional client-provided identifier for the request
        ///</summary>
        [ApiMember(Description="Optional client-provided identifier for the request", ParameterType="query")]
        public virtual string RefId { get; set; }

        ///<summary>
        ///Optional queue or topic to reply to
        ///</summary>
        [ApiMember(Description="Optional queue or topic to reply to", ParameterType="query")]
        public virtual string ReplyTo { get; set; }

        ///<summary>
        ///Tag to identify the request
        ///</summary>
        [ApiMember(Description="Tag to identify the request", ParameterType="query")]
        public virtual string Tag { get; set; }
    }

    ///<summary>
    ///Convert speech to text
    ///</summary>
    [Api(Description="Convert speech to text")]
    public partial class QueueSpeechToText
        : IReturn<QueueGenerationResponse>, IQueueGeneration
    {
        ///<summary>
        ///The audio stream containing the speech to be transcribed
        ///</summary>
        [ApiMember(Description="The audio stream containing the speech to be transcribed", ParameterType="body")]
        [Required]
        public virtual Stream Speech { get; set; }

        ///<summary>
        ///Optional client-provided identifier for the request
        ///</summary>
        [ApiMember(Description="Optional client-provided identifier for the request", ParameterType="query")]
        public virtual string RefId { get; set; }

        ///<summary>
        ///Optional queue or topic to reply to
        ///</summary>
        [ApiMember(Description="Optional queue or topic to reply to", ParameterType="query")]
        public virtual string ReplyTo { get; set; }

        ///<summary>
        ///Tag to identify the request
        ///</summary>
        [ApiMember(Description="Tag to identify the request", ParameterType="query")]
        public virtual string Tag { get; set; }

        ///<summary>
        ///Optional state to associate with the request
        ///</summary>
        [ApiMember(Description="Optional state to associate with the request", ParameterType="query")]
        public virtual string State { get; set; }
    }

    ///<summary>
    ///Generate image from text description
    ///</summary>
    [Api(Description="Generate image from text description")]
    public partial class QueueTextToImage
        : IReturn<QueueGenerationResponse>, IQueueGeneration
    {
        ///<summary>
        ///The main prompt describing the desired image
        ///</summary>
        [ApiMember(Description="The main prompt describing the desired image", ParameterType="body")]
        [Validate("NotEmpty")]
        public virtual string PositivePrompt { get; set; }

        ///<summary>
        ///Optional prompt specifying what should not be in the image
        ///</summary>
        [ApiMember(Description="Optional prompt specifying what should not be in the image", ParameterType="body")]
        public virtual string NegativePrompt { get; set; }

        ///<summary>
        ///Desired width of the generated image
        ///</summary>
        [ApiMember(Description="Desired width of the generated image", ParameterType="query")]
        public virtual int? Width { get; set; }

        ///<summary>
        ///Desired height of the generated image
        ///</summary>
        [ApiMember(Description="Desired height of the generated image", ParameterType="query")]
        public virtual int? Height { get; set; }

        ///<summary>
        ///Number of images to generate in a single batch
        ///</summary>
        [ApiMember(Description="Number of images to generate in a single batch", ParameterType="query")]
        public virtual int? BatchSize { get; set; }

        ///<summary>
        ///The AI model to use for image generation
        ///</summary>
        [ApiMember(Description="The AI model to use for image generation", ParameterType="query")]
        public virtual string Model { get; set; }

        ///<summary>
        ///Optional seed for reproducible results
        ///</summary>
        [ApiMember(Description="Optional seed for reproducible results", ParameterType="query")]
        public virtual int? Seed { get; set; }

        ///<summary>
        ///Optional client-provided identifier for the request
        ///</summary>
        [ApiMember(Description="Optional client-provided identifier for the request", ParameterType="query")]
        public virtual string RefId { get; set; }

        ///<summary>
        ///Optional queue or topic to reply to
        ///</summary>
        [ApiMember(Description="Optional queue or topic to reply to", ParameterType="query")]
        public virtual string ReplyTo { get; set; }

        ///<summary>
        ///Tag to identify the request
        ///</summary>
        [ApiMember(Description="Tag to identify the request", ParameterType="query")]
        public virtual string Tag { get; set; }

        ///<summary>
        ///Optional state to associate with the request
        ///</summary>
        [ApiMember(Description="Optional state to associate with the request", ParameterType="query")]
        public virtual string State { get; set; }
    }

    ///<summary>
    ///Convert text to speech
    ///</summary>
    [Api(Description="Convert text to speech")]
    public partial class QueueTextToSpeech
        : IReturn<QueueGenerationResponse>, IQueueGeneration
    {
        ///<summary>
        ///The text to be converted to speech
        ///</summary>
        [ApiMember(Description="The text to be converted to speech", ParameterType="body")]
        [Required]
        public virtual string Text { get; set; }

        ///<summary>
        ///Optional seed for reproducible results in speech generation
        ///</summary>
        [ApiMember(Description="Optional seed for reproducible results in speech generation", ParameterType="query")]
        public virtual int? Seed { get; set; }

        ///<summary>
        ///The AI model to use for speech generation
        ///</summary>
        [ApiMember(Description="The AI model to use for speech generation", ParameterType="query")]
        public virtual string Model { get; set; }

        ///<summary>
        ///Optional client-provided identifier for the request
        ///</summary>
        [ApiMember(Description="Optional client-provided identifier for the request", ParameterType="query")]
        public virtual string RefId { get; set; }

        ///<summary>
        ///Optional queue or topic to reply to
        ///</summary>
        [ApiMember(Description="Optional queue or topic to reply to", ParameterType="query")]
        public virtual string ReplyTo { get; set; }

        ///<summary>
        ///Tag to identify the request
        ///</summary>
        [ApiMember(Description="Tag to identify the request", ParameterType="query")]
        public virtual string Tag { get; set; }

        ///<summary>
        ///Optional state to associate with the request
        ///</summary>
        [ApiMember(Description="Optional state to associate with the request", ParameterType="query")]
        public virtual string State { get; set; }
    }

    ///<summary>
    ///Trim a video to a specified duration via start and end times
    ///</summary>
    public partial class QueueTrimVideo
        : IReturn<QueueMediaTransformResponse>, IQueueMediaTransform
    {
        ///<summary>
        ///The start time of the trimmed video (format: HH:MM:SS)
        ///</summary>
        [ApiMember(Description="The start time of the trimmed video (format: HH:MM:SS)", ParameterType="query")]
        [Required]
        public virtual string StartTime { get; set; }

        ///<summary>
        ///The end time of the trimmed video (format: HH:MM:SS)
        ///</summary>
        [ApiMember(Description="The end time of the trimmed video (format: HH:MM:SS)", ParameterType="query")]
        public virtual string EndTime { get; set; }

        [Required]
        public virtual Stream Video { get; set; }

        ///<summary>
        ///Optional client-provided identifier for the request
        ///</summary>
        [ApiMember(Description="Optional client-provided identifier for the request", ParameterType="query")]
        public virtual string RefId { get; set; }

        ///<summary>
        ///Optional queue or topic to reply to
        ///</summary>
        [ApiMember(Description="Optional queue or topic to reply to", ParameterType="query")]
        public virtual string ReplyTo { get; set; }

        ///<summary>
        ///Tag to identify the request
        ///</summary>
        [ApiMember(Description="Tag to identify the request", ParameterType="query")]
        public virtual string Tag { get; set; }
    }

    ///<summary>
    ///Watermark video
    ///</summary>
    [Api(Description="Watermark video")]
    public partial class QueueWatermarkVideo
        : IReturn<QueueMediaTransformResponse>, IQueueMediaTransform
    {
        ///<summary>
        ///The video file to be watermarked
        ///</summary>
        [ApiMember(Description="The video file to be watermarked", ParameterType="body")]
        [Required]
        public virtual Stream Video { get; set; }

        ///<summary>
        ///The image file to use as a watermark
        ///</summary>
        [ApiMember(Description="The image file to use as a watermark", ParameterType="body")]
        [Required]
        public virtual Stream Watermark { get; set; }

        ///<summary>
        ///Position of the watermark
        ///</summary>
        [ApiMember(Description="Position of the watermark", ParameterType="query")]
        public virtual WatermarkPosition? Position { get; set; }

        ///<summary>
        ///Optional client-provided identifier for the request
        ///</summary>
        [ApiMember(Description="Optional client-provided identifier for the request", ParameterType="query")]
        public virtual string RefId { get; set; }

        ///<summary>
        ///Optional queue or topic to reply to
        ///</summary>
        [ApiMember(Description="Optional queue or topic to reply to", ParameterType="query")]
        public virtual string ReplyTo { get; set; }

        ///<summary>
        ///Tag to identify the request
        ///</summary>
        [ApiMember(Description="Tag to identify the request", ParameterType="query")]
        public virtual string Tag { get; set; }
    }

    public partial class Reload
        : IReturn<EmptyResponse>, IPost
    {
    }

    public enum ResponseFormat
    {
        [EnumMember(Value="text")]
        Text,
        [EnumMember(Value="json_object")]
        JsonObject,
    }

    public partial class SummaryStats
    {
        public virtual string Name { get; set; }
        public virtual int Total { get; set; }
        public virtual int TotalPromptTokens { get; set; }
        public virtual int TotalCompletionTokens { get; set; }
        public virtual double TotalMinutes { get; set; }
        public virtual double TokensPerSecond { get; set; }
    }

    public enum TaskType
    {
        OpenAiChat = 1,
        Comfy = 2,
    }

    ///<summary>
    ///Output object for generated text
    ///</summary>
    public partial class TextOutput
    {
        ///<summary>
        ///The generated text
        ///</summary>
        [ApiMember(Description="The generated text")]
        public virtual string Text { get; set; }
    }

    ///<summary>
    ///The tool calls generated by the model, such as function calls.
    ///</summary>
    [DataContract]
    public partial class ToolCall
    {
        ///<summary>
        ///The ID of the tool call.
        ///</summary>
        [DataMember(Name="id")]
        public virtual string Id { get; set; }

        ///<summary>
        ///The type of the tool. Currently, only `function` is supported.
        ///</summary>
        [DataMember(Name="type")]
        public virtual string Type { get; set; }

        ///<summary>
        ///The function that the model called.
        ///</summary>
        [DataMember(Name="function")]
        public virtual string Function { get; set; }
    }

    public partial class UpdateApiModel
        : IReturn<IdResponse>, IPatchDb<AiModel>
    {
        public virtual string Name { get; set; }
        public virtual string Website { get; set; }
        public virtual List<string> Tags { get; set; }
        public virtual string Latest { get; set; }
        public virtual string Description { get; set; }
        public virtual string Icon { get; set; }
    }

    public partial class UpdateApiProvider
        : IReturn<IdResponse>, IPatchDb<ApiProvider>
    {
        public virtual int Id { get; set; }
        ///<summary>
        ///The Type of this API Provider
        ///</summary>
        public virtual int? ApiTypeId { get; set; }
        ///<summary>
        ///The Base URL for the API Provider
        ///</summary>
        public virtual string ApiBaseUrl { get; set; }
        ///<summary>
        ///The unique name for this API Provider
        ///</summary>
        public virtual string Name { get; set; }
        ///<summary>
        ///The API Key to use for this Provider
        ///</summary>
        public virtual string ApiKeyVar { get; set; }
        ///<summary>
        ///The API Key to use for this Provider
        ///</summary>
        public virtual string ApiKey { get; set; }
        ///<summary>
        ///Send the API Key in the Header instead of Authorization Bearer
        ///</summary>
        public virtual string ApiKeyHeader { get; set; }
        ///<summary>
        ///The URL to check if the API Provider is still online
        ///</summary>
        public virtual string HeartbeatUrl { get; set; }
        ///<summary>
        ///Override API Paths for different AI Requests
        ///</summary>
        public virtual Dictionary<TaskType, string> TaskPaths { get; set; }
        ///<summary>
        ///How many requests should be made concurrently
        ///</summary>
        public virtual int? Concurrency { get; set; }
        ///<summary>
        ///What priority to give this Provider to use for processing models
        ///</summary>
        public virtual int? Priority { get; set; }
        ///<summary>
        ///Whether the Provider is enabled
        ///</summary>
        public virtual bool? Enabled { get; set; }
        ///<summary>
        ///The models this API Provider should process
        ///</summary>
        public virtual List<ApiProviderModel> Models { get; set; }
        ///<summary>
        ///The selected models this API Provider should process
        ///</summary>
        public virtual List<string> SelectedModels { get; set; }
    }

    ///<summary>
    ///Update a Generation API Provider
    ///</summary>
    public partial class UpdateGenerationApiProvider
        : IReturn<IdResponse>, IPatchDb<GenerationApiProvider>
    {
        public virtual int Id { get; set; }
        ///<summary>
        ///The API Key to use for this Provider
        ///</summary>
        public virtual string ApiKey { get; set; }
        ///<summary>
        ///Send the API Key in the Header instead of Authorization Bearer
        ///</summary>
        public virtual string ApiKeyHeader { get; set; }
        ///<summary>
        ///Override Base URL for the Generation Provider
        ///</summary>
        public virtual string ApiBaseUrl { get; set; }
        ///<summary>
        ///Url to check if the API is online
        ///</summary>
        public virtual string HeartbeatUrl { get; set; }
        ///<summary>
        ///How many requests should be made concurrently
        ///</summary>
        public virtual int? Concurrency { get; set; }
        ///<summary>
        ///What priority to give this Provider to use for processing models
        ///</summary>
        public virtual int? Priority { get; set; }
        ///<summary>
        ///Whether the Provider is enabled
        ///</summary>
        public virtual bool? Enabled { get; set; }
        ///<summary>
        ///The models this API Provider should process
        ///</summary>
        public virtual List<string> Models { get; set; }
    }

    public partial class WaitForOpenAiChat
        : IReturn<GetOpenAiChatResponse>, IGet
    {
        public virtual int? Id { get; set; }
        public virtual string RefId { get; set; }
    }

    ///<summary>
    ///Add a watermark to an image
    ///</summary>
    public partial class WatermarkImage
        : IReturn<byte[]>, IPost
    {
        ///<summary>
        ///The image file to be watermarked
        ///</summary>
        [ApiMember(Description="The image file to be watermarked", ParameterType="body")]
        [Required]
        public virtual Stream Image { get; set; }

        ///<summary>
        ///The position of the watermark on the image
        ///</summary>
        [ApiMember(Description="The position of the watermark on the image", ParameterType="query")]
        public virtual WatermarkPosition Position { get; set; }

        ///<summary>
        ///The opacity of the watermark (0.0 to 1.0)
        ///</summary>
        [ApiMember(Description="The opacity of the watermark (0.0 to 1.0)", ParameterType="query")]
        public virtual float Opacity { get; set; }
    }

    public enum WatermarkPosition
    {
        TopLeft,
        TopRight,
        BottomLeft,
        BottomRight,
        Center,
    }

}

namespace AiServer.ServiceModel.Types
{
    public partial class AiProviderBase
        : ApiProviderBase
    {
        public AiProviderBase()
        {
            Models = new List<string>{};
        }

        public virtual List<string> Models { get; set; }
    }

    public enum AiServiceProvider
    {
        Replicate,
        Comfy,
        OpenAi,
    }

    public partial class ApiProviderBase
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string ApiKeyVar { get; set; }
        public virtual string ApiKey { get; set; }
        public virtual string ApiKeyHeader { get; set; }
        public virtual string ApiBaseUrl { get; set; }
        public virtual string HeartbeatUrl { get; set; }
        public virtual int Concurrency { get; set; }
        public virtual int Priority { get; set; }
        public virtual bool Enabled { get; set; }
        public virtual DateTime? OfflineDate { get; set; }
        public virtual DateTime CreatedDate { get; set; }
    }

    public partial class ApiTypeBase
    {
        public ApiTypeBase()
        {
            ApiModels = new Dictionary<string, string>{};
        }

        public virtual int Id { get; set; }
        public virtual string ApiBaseUrl { get; set; }
        public virtual string ApiKeyHeader { get; set; }
        public virtual string Name { get; set; }
        public virtual string Website { get; set; }
        public virtual string Icon { get; set; }
        public virtual Dictionary<string, string> ApiModels { get; set; }
        public virtual AiServiceProvider Provider { get; set; }
    }

    public enum ComfyMaskSource
    {
        red,
        blue,
        green,
        alpha,
    }

    public enum ComfySampler
    {
        euler,
        euler_cfg_pp,
        euler_ancestral,
        euler_ancestral_cfg_pp,
        huen,
        huenpp2,
        dpm_2,
        dpm_2_ancestral,
        lms,
        dpm_fast,
        dpm_adaptive,
        dpmpp_2s_ancestral,
        dpmpp_sde,
        dpmpp_sde_gpu,
        dpmpp_2m,
        dpmpp_2m_sde,
        dpmpp_2m_sde_gpu,
        dpmpp_3m_sde,
        dpmpp_3m_sde_gpu,
        ddpm,
        lcm,
        ddim,
        uni_pc,
        uni_pc_bh2,
    }

    public partial class GenerationApiProvider
        : AiProviderBase
    {
        [References(typeof(AiServer.ServiceModel.Types.GenerationApiType))]
        public virtual int GenerationApiTypeId { get; set; }

        public virtual GenerationApiType Type { get; set; }
    }

    public partial class GenerationApiType
        : ApiTypeBase
    {
    }

    public enum ModelType
    {
        TextToImage,
        TextEncoder,
        ImageUpscale,
        TextToSpeech,
        TextToAudio,
        SpeechToText,
        ImageToText,
        ImageToImage,
        ImageWithMask,
        VAE,
    }

    public partial class ProviderModelDefaults
    {
        public ProviderModelDefaults()
        {
            ApiModels = new Dictionary<string, string>{};
        }

        public virtual string Id { get; set; }
        public virtual Dictionary<string, string> ApiModels { get; set; }
        public virtual string Url { get; set; }
        public virtual double? Quality { get; set; }
        public virtual string AspectRatio { get; set; }
        public virtual double? CfgScale { get; set; }
        public virtual string Scheduler { get; set; }
        public virtual ComfySampler? Sampler { get; set; }
        public virtual int? Width { get; set; }
        public virtual int? Height { get; set; }
        public virtual int? Steps { get; set; }
        public virtual string NegativePrompt { get; set; }
        public virtual ModelType? ModelType { get; set; }
    }

    public partial class QueryGenerationApiTypes
        : QueryDb<GenerationApiType>, IReturn<QueryResponse<GenerationApiType>>
    {
    }

}

