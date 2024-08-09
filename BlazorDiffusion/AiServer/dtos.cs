/* Options:
Date: 2024-08-09 16:24:29
Version: 8.31
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
//ExcludeTypes: 
//AddNamespaces: 
//AddDefaultXmlNamespace: http://schemas.servicestack.net/types
*/

using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.Serialization;
using ServiceStack;
using ServiceStack.DataAnnotations;
using System.IO;
using AiServer.ServiceModel.Types;
using AiServer.ServiceModel;
using ServiceStack.Jobs;
using AiServer.ServiceInterface;

namespace AiServer.ServiceInterface
{
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
    public partial class ActiveApiModels
        : IReturn<StringsResponse>, IGet
    {
    }

    public partial class AddComfyProviderModel
        : IReturn<IdResponse>, IPost
    {
        public virtual int ComfyApiProviderId { get; set; }
        public virtual int ComfyApiModelId { get; set; }
        public virtual string ComfyApiModelName { get; set; }
        public virtual string ComfyApiProviderName { get; set; }
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
        public virtual ApiModel Model { get; set; }

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

    public partial class AiServerHostedDiffusionFile
    {
        public virtual string FileName { get; set; }
        public virtual string Url { get; set; }
    }

    public partial class ApiModel
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string Parameters { get; set; }
        public virtual int? ContextSize { get; set; }
        public virtual string Website { get; set; }
        public virtual string Developer { get; set; }
        public virtual string Notes { get; set; }
    }

    public partial class ApiProvider
    {
        public ApiProvider()
        {
            TaskPaths = new Dictionary<TaskType, string>{};
            Models = new List<ApiProviderModel>{};
        }

        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual int ApiTypeId { get; set; }
        public virtual string ApiKey { get; set; }
        public virtual string ApiKeyHeader { get; set; }
        public virtual string ApiBaseUrl { get; set; }
        public virtual string HeartbeatUrl { get; set; }
        public virtual Dictionary<TaskType, string> TaskPaths { get; set; }
        public virtual int Concurrency { get; set; }
        public virtual int Priority { get; set; }
        public virtual bool Enabled { get; set; }
        public virtual DateTime? OfflineDate { get; set; }
        public virtual DateTime CreatedDate { get; set; }
        public virtual ApiType ApiType { get; set; }
        public virtual List<ApiProviderModel> Models { get; set; }
    }

    public partial class ApiProviderModel
    {
        public virtual int Id { get; set; }
        public virtual int ApiProviderId { get; set; }
        public virtual string Model { get; set; }
        public virtual string ApiModel { get; set; }
    }

    public partial class ApiType
    {
        public ApiType()
        {
            TaskPaths = new Dictionary<TaskType, string>{};
            ApiModels = new Dictionary<string, string>{};
        }

        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string Website { get; set; }
        public virtual string ApiBaseUrl { get; set; }
        public virtual string HeartbeatUrl { get; set; }
        public virtual string OpenAiProvider { get; set; }
        public virtual Dictionary<TaskType, string> TaskPaths { get; set; }
        public virtual Dictionary<string, string> ApiModels { get; set; }
    }

    public partial class ChangeApiProviderStatus
        : IReturn<StringResponse>, IPost
    {
        public virtual string Provider { get; set; }
        public virtual bool Online { get; set; }
    }

    public partial class ChangeComfyApiProviderStatus
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

    public partial class ComfyAgentDownloadStatus
    {
        public virtual string Name { get; set; }
        public virtual int? Progress { get; set; }
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
        : IReturn<IdResponse>, ICreateDb<ApiModel>
    {
        public virtual string Name { get; set; }
        public virtual string Parameters { get; set; }
        public virtual string Website { get; set; }
        public virtual int? ContextSize { get; set; }
        public virtual string Developer { get; set; }
        public virtual string Notes { get; set; }
    }

    ///<summary>
    ///Create an API Provider that can process AI Tasks
    ///</summary>
    public partial class CreateApiProvider
        : IReturn<IdResponse>, ICreateDb<ApiProvider>
    {
        ///<summary>
        ///The unique name for this API Provider
        ///</summary>
        public virtual string Name { get; set; }
        ///<summary>
        ///The behavior for this API Provider
        ///</summary>
        public virtual int ApiTypeId { get; set; }
        ///<summary>
        ///The API Key to use for this Provider
        ///</summary>
        public virtual string ApiKey { get; set; }
        ///<summary>
        ///Send the API Key in the Header instead of Authorization Bearer
        ///</summary>
        public virtual string ApiKeyHeader { get; set; }
        ///<summary>
        ///The Base URL for the API Provider
        ///</summary>
        public virtual string ApiBaseUrl { get; set; }
        ///<summary>
        ///The URL to check if the API Provider is still online
        ///</summary>
        public virtual string HeartbeatUrl { get; set; }
        ///<summary>
        ///Override API Paths for different AI Tasks
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
        ///The models this API Provider can process
        ///</summary>
        public virtual List<ApiProviderModel> Models { get; set; }
    }

    ///<summary>
    ///Register a Model supported by an API Provider
    ///</summary>
    public partial class CreateApiProviderModel
        : IReturn<IdResponse>, ICreateDb<ApiProviderModel>
    {
        ///<summary>
        ///The ApiProvider Id
        ///</summary>
        public virtual int ApiProviderId { get; set; }
        ///<summary>
        ///Supported ApiModel Name
        ///</summary>
        public virtual string Model { get; set; }
        ///<summary>
        ///Model to use when sending requests to the API Provider
        ///</summary>
        public virtual string ApiModel { get; set; }
    }

    ///<summary>
    ///Create a Comfy API Model that can be used by Comfy API Providers
    ///</summary>
    public partial class CreateComfyApiModel
        : IReturn<IdResponse>, ICreateDb<ComfyApiModel>
    {
        public virtual string Name { get; set; }
        public virtual string Description { get; set; }
        public virtual string Tags { get; set; }
        public virtual string Filename { get; set; }
        public virtual string DownloadUrl { get; set; }
        public virtual string IconUrl { get; set; }
        public virtual string Url { get; set; }
        public virtual ComfyApiModelSettings ModelSettings { get; set; }
    }

    public partial class CreateComfyApiModelSettings
        : IReturn<IdResponse>, ICreateDb<ComfyApiModelSettings>
    {
        public virtual int ComfyApiModelId { get; set; }
        public virtual double? CfgScale { get; set; }
        public virtual string Scheduler { get; set; }
        public virtual ComfySampler? Sampler { get; set; }
        public virtual int? Width { get; set; }
        public virtual int? Height { get; set; }
        public virtual int? Steps { get; set; }
        public virtual string NegativePrompt { get; set; }
    }

    ///<summary>
    ///Create a Comfy API Provider that can process Comfy Workflow Tasks
    ///</summary>
    public partial class CreateComfyApiProvider
        : IReturn<IdResponse>, ICreateDb<ComfyApiProvider>
    {
        public virtual string Name { get; set; }
        public virtual string ApiKey { get; set; }
        public virtual string ApiKeyHeader { get; set; }
        public virtual string ApiBaseUrl { get; set; }
        public virtual string HeartbeatUrl { get; set; }
        public virtual Dictionary<ComfyTaskType, string> TaskWorkflows { get; set; }
        public virtual int Concurrency { get; set; }
        public virtual int Priority { get; set; }
        public virtual bool Enabled { get; set; }
        public virtual List<ComfyApiProviderModel> Models { get; set; }
    }

    ///<summary>
    ///Update a Comfy API Model that can be used by Comfy API Providers
    ///</summary>
    public partial class CreateComfyApiProviderModel
        : IReturn<IdResponse>, ICreateDb<ComfyApiProviderModel>
    {
        public virtual int ComfyApiProviderId { get; set; }
        public virtual int ComfyApiModelId { get; set; }
    }

    public partial class CreateComfyGeneration
        : IReturn<CreateComfyGenerationResponse>, ICreateDb<ComfyGenerationTask>
    {
        public virtual string RefId { get; set; }
        public virtual string Provider { get; set; }
        public virtual string ReplyTo { get; set; }
        public virtual string Tag { get; set; }
        public virtual ComfyWorkflowRequest Request { get; set; }
        public virtual Object Context { get; set; }
    }

    public partial class CreateComfyGenerationResponse
    {
        public virtual long Id { get; set; }
        public virtual string RefId { get; set; }
        public virtual ResponseStatus ResponseStatus { get; set; }
    }

    public partial class CreateDiffusionApiProvider
        : IReturn<IdResponse>, ICreateDb<DiffusionApiProvider>
    {
        public virtual string Name { get; set; }
        public virtual string ApiKey { get; set; }
        public virtual string ApiKeyHeader { get; set; }
        public virtual string ApiBaseUrl { get; set; }
        public virtual string HeartbeatUrl { get; set; }
        public virtual int Concurrency { get; set; }
        public virtual int Priority { get; set; }
        public virtual bool Enabled { get; set; }
        public virtual DateTime? OfflineDate { get; set; }
        public virtual List<string> Models { get; set; }
        public virtual string Type { get; set; }
    }

    [Route("/diffusion/generate", "POST")]
    public partial class CreateDiffusionGeneration
        : IReturn<CreateDiffusionGenerationResponse>
    {
        public virtual string Provider { get; set; }
        public virtual DiffusionImageGeneration Request { get; set; }
        public virtual Object Context { get; set; }
        public virtual string ReplyTo { get; set; }
        public virtual string RefId { get; set; }
    }

    public partial class CreateDiffusionGenerationResponse
    {
        public virtual long Id { get; set; }
        public virtual string RefId { get; set; }
    }

    public partial class CreateOpenAiChat
        : IReturn<CreateOpenAiChatResponse>
    {
        public virtual string RefId { get; set; }
        public virtual string Provider { get; set; }
        public virtual string ReplyTo { get; set; }
        public virtual string Tag { get; set; }
        public virtual OpenAiChat Request { get; set; }
    }

    public partial class CreateOpenAiChatResponse
    {
        public virtual long Id { get; set; }
        public virtual string RefId { get; set; }
        public virtual ResponseStatus ResponseStatus { get; set; }
    }

    ///<summary>
    ///Delete a Model supported by the API Provider
    ///</summary>
    public partial class DeleteApiProviderModel
        : IReturn<IdResponse>, IDeleteDb<ApiProviderModel>
    {
        ///<summary>
        ///The ApiProviderModel Id
        ///</summary>
        public virtual int Id { get; set; }
    }

    public partial class DeleteComfyApiModel
        : IReturn<IdResponse>, IDeleteDb<ComfyApiModel>
    {
        public virtual int? Id { get; set; }
        public virtual string Name { get; set; }
    }

    public partial class DeleteComfyApiModelSettings
        : IReturn<EmptyResponse>, IDeleteDb<ComfyApiModelSettings>
    {
        public virtual int Id { get; set; }
    }

    public partial class DeleteComfyApiProvider
        : IReturn<IdResponse>, IDeleteDb<ComfyApiProvider>
    {
        public virtual int? Id { get; set; }
        public virtual string Name { get; set; }
    }

    public partial class DeleteComfyApiProviderModel
        : IReturn<EmptyResponse>, IDeleteDb<ComfyApiProviderModel>
    {
        public virtual int Id { get; set; }
    }

    public partial class DeleteDiffusionApiProvider
        : IReturn<IdResponse>, IDeleteDb<DiffusionApiProvider>
    {
        public virtual int? Id { get; set; }
        public virtual string Name { get; set; }
    }

    public partial class DiffusionApiProviderOutput
    {
        public virtual string FileName { get; set; }
        public virtual string Url { get; set; }
    }

    public partial class DiffusionGenerationResponse
    {
        public DiffusionGenerationResponse()
        {
            Outputs = new List<DiffusionApiProviderOutput>{};
        }

        public virtual List<DiffusionApiProviderOutput> Outputs { get; set; }
    }

    public partial class DiffusionImageGeneration
    {
        public virtual string Model { get; set; }
        public virtual int Width { get; set; }
        public virtual int Height { get; set; }
        public virtual int Images { get; set; }
        public virtual long? Seed { get; set; }
        public virtual string PositivePrompt { get; set; }
        public virtual string NegativePrompt { get; set; }
        public virtual int Steps { get; set; }
    }

    [Route("/comfy/{Year}/{Month}/{Day}/{Filename}")]
    public partial class DownloadComfyFile
        : IReturn<Stream>
    {
        public virtual int? Year { get; set; }
        public virtual int? Month { get; set; }
        public virtual int? Day { get; set; }
        public virtual string FileName { get; set; }
    }

    public partial class DownloadComfyProviderModel
        : IReturn<DownloadComfyProviderModelResponse>
    {
        public virtual int? ComfyApiProviderModelId { get; set; }
    }

    public partial class DownloadComfyProviderModelResponse
    {
        public virtual ComfyAgentDownloadStatus DownloadStatus { get; set; }
    }

    public partial class FireComfyPeriodicTask
    {
        public virtual PeriodicFrequency Frequency { get; set; }
    }

    public partial class FirePeriodicTask
        : IReturn<EmptyResponse>, IPost
    {
        public virtual PeriodicFrequency Frequency { get; set; }
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

    public partial class GetComfyGeneration
        : IReturn<GetComfyGenerationResponse>
    {
        public virtual int? Id { get; set; }
        public virtual string RefId { get; set; }
    }

    public partial class GetComfyGenerationResponse
    {
        public GetComfyGenerationResponse()
        {
            Outputs = new List<AiServerHostedComfyFile>{};
        }

        public virtual CreateComfyGeneration Request { get; set; }
        public virtual List<AiServerHostedComfyFile> Outputs { get; set; }
        public virtual ComfyWorkflowStatus Result { get; set; }
        public virtual ResponseStatus ResponseStatus { get; set; }
    }

    [Route("/diffusion/{Id}", "GET")]
    [Route("/diffusion/ref/{RefId}", "GET")]
    public partial class GetDiffusionGeneration
        : IReturn<GetDiffusionGenerationResponse>
    {
        public virtual int? Id { get; set; }
        public virtual string RefId { get; set; }
    }

    public partial class GetDiffusionGenerationResponse
    {
        public GetDiffusionGenerationResponse()
        {
            Outputs = new List<AiServerHostedDiffusionFile>{};
        }

        public virtual DiffusionImageGeneration Request { get; set; }
        public virtual DiffusionGenerationResponse Result { get; set; }
        public virtual List<AiServerHostedDiffusionFile> Outputs { get; set; }
    }

    [Route("/icons/models/{Model}", "GET")]
    public partial class GetModelImage
        : IReturn<byte[]>, IGet
    {
        public virtual string Model { get; set; }
    }

    public partial class GetOpenAiChat
        : IReturn<GetOpenAiChatResponse>, IGet
    {
        public virtual int? Id { get; set; }
        public virtual string RefId { get; set; }
    }

    public partial class GetOpenAiChatResponse
    {
        public virtual BackgroundJob Result { get; set; }
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

    public partial class GetWorkerStats
        : IReturn<GetWorkerStatsResponse>, IGet
    {
    }

    public partial class GetWorkerStatsResponse
    {
        public GetWorkerStatsResponse()
        {
            Results = new List<WorkerStats>{};
        }

        public virtual List<WorkerStats> Results { get; set; }
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

    public partial class ImportCivitAiModel
        : IReturn<ImportCivitAiModelResponse>
    {
        public virtual string Provider { get; set; }
        public virtual string ModelUrl { get; set; }
        public virtual ComfyApiModelSettings Settings { get; set; }
    }

    public partial class ImportCivitAiModelResponse
    {
        public virtual ComfyApiModel Model { get; set; }
        public virtual ComfyApiProvider Provider { get; set; }
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
        public virtual double TopP { get; set; }

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
        : QueryDb<ApiModel>, IReturn<QueryResponse<ApiModel>>
    {
    }

    ///<summary>
    ///View and API Provider Models
    ///</summary>
    public partial class QueryApiProviderModels
        : QueryDb<ApiProviderModel>, IReturn<QueryResponse<ApiProviderModel>>
    {
        public virtual int? ApiProviderId { get; set; }
        public virtual string Model { get; set; }
        public virtual string ApiModel { get; set; }
    }

    ///<summary>
    ///API Providers that can process AI Tasks
    ///</summary>
    public partial class QueryApiProviders
        : QueryDb<ApiProvider>, IReturn<QueryResponse<ApiProvider>>
    {
        public virtual string Name { get; set; }
    }

    ///<summary>
    ///The Type and behavior of different API Providers
    ///</summary>
    public partial class QueryApiType
        : QueryDb<ApiType>, IReturn<QueryResponse<ApiType>>
    {
    }

    public partial class QueryBackgroundJobs
        : QueryDb<BackgroundJob>, IReturn<QueryResponse<BackgroundJob>>
    {
        public virtual int? Id { get; set; }
        public virtual string RefId { get; set; }
    }

    public partial class QueryComfyApiModels
        : QueryDb<ComfyApiModel>, IReturn<QueryResponse<ComfyApiModel>>
    {
        public virtual string Name { get; set; }
    }

    public partial class QueryComfyApiModelSettings
        : QueryDb<ComfyApiModelSettings>, IReturn<QueryResponse<ComfyApiModelSettings>>
    {
        public virtual int? ComfyApiModelId { get; set; }
    }

    public partial class QueryComfyApiProviderModels
        : QueryDb<ComfyApiProviderModel>, IReturn<QueryResponse<ComfyApiProviderModel>>
    {
        public virtual int? ComfyApiProviderId { get; set; }
        public virtual int? ComfyApiModelId { get; set; }
    }

    public partial class QueryComfyApiProviders
        : QueryDb<ComfyApiProvider>, IReturn<QueryResponse<ComfyApiProvider>>
    {
        public virtual string Name { get; set; }
    }

    public partial class QueryComfyGenerationTasks
        : QueryDb<ComfyGenerationTask>, IReturn<QueryResponse<ComfyGenerationTask>>
    {
        public virtual string RefId { get; set; }
        public virtual string Provider { get; set; }
        public virtual ComfyWorkflowStatus Status { get; set; }
    }

    public partial class QueryComfySummary
        : QueryDb<ComfySummary>, IReturn<QueryResponse<ComfySummary>>
    {
        public virtual string RefId { get; set; }
        public virtual string Provider { get; set; }
    }

    public partial class QueryCompletedChatTasks
        : QueryDb<CompletedJob>, IReturn<QueryResponse<CompletedJob>>
    {
        public virtual DateTime? Db { get; set; }
        public virtual int? Id { get; set; }
        public virtual string RefId { get; set; }
    }

    public partial class QueryCompletedComfyTasks
        : QueryDb<ComfyGenerationCompleted>, IReturn<QueryResponse<ComfyGenerationCompleted>>
    {
        public virtual string Db { get; set; }
        public virtual int? Id { get; set; }
        public virtual string RefId { get; set; }
    }

    public partial class QueryDiffusionApiProviders
        : QueryDb<DiffusionApiProvider>, IReturn<QueryResponse<DiffusionApiProvider>>
    {
        public virtual int? Id { get; set; }
        public virtual string Name { get; set; }
    }

    public partial class QueryFailedChatTasks
        : QueryDb<FailedJob>, IReturn<QueryResponse<FailedJob>>
    {
        public virtual DateTime? Db { get; set; }
    }

    public partial class QueryFailedComfyTasks
        : QueryDb<ComfyGenerationFailed>, IReturn<QueryResponse<ComfyGenerationFailed>>
    {
        public virtual string Db { get; set; }
    }

    public partial class QueryJobSummary
        : QueryDb<JobSummary>, IReturn<QueryResponse<JobSummary>>
    {
        public virtual int? Id { get; set; }
        public virtual string RefId { get; set; }
    }

    public partial class ResetActiveComfyProviders
    {
    }

    public enum ResponseFormat
    {
        [EnumMember(Value="text")]
        Text,
        [EnumMember(Value="json_object")]
        JsonObject,
    }

    public partial class RestartComfyWorkers
    {
    }

    public partial class RestartWorkers
        : IReturn<EmptyResponse>, IPost
    {
    }

    public partial class StartComfyWorkers
    {
    }

    public partial class StartWorkers
        : IReturn<EmptyResponse>, IPost
    {
    }

    public partial class StopComfyWorkers
    {
    }

    public partial class StopWorkers
        : IReturn<EmptyResponse>, IPost
    {
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

    public partial class TaskBase
    {
        public virtual long Id { get; set; }
        public virtual string Model { get; set; }
        public virtual string Provider { get; set; }
        public virtual string RefId { get; set; }
        public virtual string Tag { get; set; }
        public virtual string ReplyTo { get; set; }
        public virtual DateTime CreatedDate { get; set; }
        public virtual string CreatedBy { get; set; }
        public virtual string Worker { get; set; }
        public virtual string WorkerIp { get; set; }
        public virtual string RequestId { get; set; }
        public virtual DateTime? StartedDate { get; set; }
        public virtual DateTime? CompletedDate { get; set; }
        public virtual int DurationMs { get; set; }
        public virtual int? RetryLimit { get; set; }
        public virtual int Retries { get; set; }
        public virtual DateTime? NotificationDate { get; set; }
        public virtual string ErrorCode { get; set; }
        public virtual ResponseStatus Error { get; set; }
    }

    public enum TaskType
    {
        OpenAiChat = 1,
        Comfy = 2,
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

    public partial class UpdateApiProvider
        : IReturn<IdResponse>, IPatchDb<ApiProvider>
    {
        public virtual int Id { get; set; }
        public virtual string ApiKey { get; set; }
        public virtual string ApiBaseUrl { get; set; }
        public virtual string HeartbeatUrl { get; set; }
        public virtual int? Concurrency { get; set; }
        public virtual int? Priority { get; set; }
        public virtual bool? Enabled { get; set; }
    }

    ///<summary>
    ///Update the Model supported by the API Provider
    ///</summary>
    public partial class UpdateApiProviderModel
        : IReturn<IdResponse>, IPatchDb<ApiProviderModel>
    {
        ///<summary>
        ///The ApiProviderModel Id
        ///</summary>
        public virtual int Id { get; set; }
        ///<summary>
        ///The ApiProvider Id
        ///</summary>
        public virtual int? ApiProviderId { get; set; }
        ///<summary>
        ///Supported ApiModel Name
        ///</summary>
        public virtual string Model { get; set; }
        ///<summary>
        ///Model to use when sending requests to the API Provider
        ///</summary>
        public virtual string ApiModel { get; set; }
    }

    public partial class UpdateComfyApiModelSettings
        : IReturn<EmptyResponse>, IUpdateDb<ComfyApiModelSettings>
    {
        public virtual int Id { get; set; }
        public virtual double? CfgScale { get; set; }
        public virtual string Scheduler { get; set; }
        public virtual ComfySampler? Sampler { get; set; }
        public virtual int? Width { get; set; }
        public virtual int? Height { get; set; }
        public virtual int? Steps { get; set; }
        public virtual string NegativePrompt { get; set; }
    }

    public partial class UpdateComfyApiProvider
        : IReturn<IdResponse>, IUpdateDb<ComfyApiProvider>
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string ApiKey { get; set; }
        public virtual string ApiKeyHeader { get; set; }
        public virtual string ApiBaseUrl { get; set; }
        public virtual string HeartbeatUrl { get; set; }
        public virtual Dictionary<ComfyTaskType, string> TaskPaths { get; set; }
        public virtual int? Concurrency { get; set; }
        public virtual int? Priority { get; set; }
        public virtual bool? Enabled { get; set; }
    }

    public partial class UpdateComfyApiProviderModel
        : IReturn<EmptyResponse>, IUpdateDb<ComfyApiProviderModel>
    {
        public virtual int Id { get; set; }
        public virtual int ComfyApiModelId { get; set; }
        public virtual int ComfyApiProviderId { get; set; }
    }

    public partial class UpdateDiffusionApiProvider
        : IReturn<DiffusionApiProvider>, IPatchDb<DiffusionApiProvider>
    {
        public virtual int Id { get; set; }
        public virtual string ApiKey { get; set; }
        public virtual string ApiKeyHeader { get; set; }
        public virtual string ApiBaseUrl { get; set; }
        public virtual string HeartbeatUrl { get; set; }
        public virtual int? Concurrency { get; set; }
        public virtual int? Priority { get; set; }
        public virtual bool? Enabled { get; set; }
        public virtual List<string> Models { get; set; }
    }

    public partial class WaitForOpenAiChat
        : IReturn<GetOpenAiChatResponse>, IGet
    {
        public virtual int? Id { get; set; }
        public virtual string RefId { get; set; }
    }

}

namespace AiServer.ServiceModel.Types
{
    public partial class AiServerHostedComfyFile
    {
        public virtual string Url { get; set; }
        public virtual string FileName { get; set; }
        public virtual string ContentType { get; set; }
    }

    public partial class ComfyApiModel
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string Description { get; set; }
        public virtual string Tags { get; set; }
        public virtual string Filename { get; set; }
        public virtual string DownloadUrl { get; set; }
        public virtual string IconUrl { get; set; }
        public virtual string Url { get; set; }
        public virtual DateTime CreatedDate { get; set; }
        public virtual ComfyApiModelSettings ModelSettings { get; set; }
    }

    public partial class ComfyApiModelSettings
    {
        public virtual int Id { get; set; }
        [References(typeof(AiServer.ServiceModel.Types.ComfyApiModel))]
        public virtual int ComfyApiModelId { get; set; }

        public virtual ComfyApiModel ComfyApiModel { get; set; }
        public virtual double? CfgScale { get; set; }
        public virtual string Scheduler { get; set; }
        public virtual ComfySampler? Sampler { get; set; }
        public virtual int? Width { get; set; }
        public virtual int? Height { get; set; }
        public virtual int? Steps { get; set; }
        public virtual string NegativePrompt { get; set; }
    }

    public partial class ComfyApiProvider
    {
        public ComfyApiProvider()
        {
            TaskWorkflows = new Dictionary<ComfyTaskType, string>{};
            Models = new List<ComfyApiProviderModel>{};
        }

        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string ApiKey { get; set; }
        public virtual string ApiKeyHeader { get; set; }
        public virtual string ApiBaseUrl { get; set; }
        public virtual string HeartbeatUrl { get; set; }
        public virtual Dictionary<ComfyTaskType, string> TaskWorkflows { get; set; }
        public virtual int Concurrency { get; set; }
        public virtual int Priority { get; set; }
        public virtual bool Enabled { get; set; }
        public virtual DateTime? OfflineDate { get; set; }
        public virtual DateTime CreatedDate { get; set; }
        public virtual List<ComfyApiProviderModel> Models { get; set; }
    }

    public partial class ComfyApiProviderModel
    {
        public virtual int Id { get; set; }
        [References(typeof(AiServer.ServiceModel.Types.ComfyApiProvider))]
        public virtual int ComfyApiProviderId { get; set; }

        [References(typeof(AiServer.ServiceModel.Types.ComfyApiModel))]
        public virtual int ComfyApiModelId { get; set; }

        public virtual ComfyApiProvider ComfyApiProvider { get; set; }
        public virtual ComfyApiModel ComfyApiModel { get; set; }
    }

    public partial class ComfyFileInput
    {
        public virtual string Name { get; set; }
        public virtual string Type { get; set; }
        public virtual string Subfolder { get; set; }
    }

    public partial class ComfyFileOutput
    {
        public virtual string Filename { get; set; }
        public virtual string Type { get; set; }
        public virtual string Subfolder { get; set; }
    }

    public partial class ComfyGenerationCompleted
        : ComfyGenerationTask
    {
    }

    public partial class ComfyGenerationFailed
        : ComfyGenerationTask
    {
        public virtual DateTime FailedDate { get; set; }
    }

    public partial class ComfyGenerationTask
        : TaskBase
    {
        public virtual ComfyWorkflowRequest Request { get; set; }
        public virtual ComfyWorkflowResponse Response { get; set; }
        public virtual ComfyWorkflowStatus Status { get; set; }
        public virtual ComfyTaskType TaskType { get; set; }
        public virtual string WorkflowTemplate { get; set; }
    }

    public enum ComfyMaskSource
    {
        red,
        blue,
        green,
        alpha,
    }

    public partial class ComfyOutput
    {
        public ComfyOutput()
        {
            Files = new List<ComfyFileOutput>{};
            Texts = new List<ComfyTextOutput>{};
        }

        public virtual List<ComfyFileOutput> Files { get; set; }
        public virtual List<ComfyTextOutput> Texts { get; set; }
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

    public partial class ComfySummary
    {
        public virtual long Id { get; set; }
        public virtual ComfyTaskType Type { get; set; }
        public virtual string Model { get; set; }
        public virtual string Provider { get; set; }
        public virtual string RefId { get; set; }
        public virtual string PromptId { get; set; }
        public virtual string Tag { get; set; }
        public virtual int DurationMs { get; set; }
        public virtual DateTime CreatedDate { get; set; }
        public virtual long JobId { get; set; }
    }

    public enum ComfyTaskType
    {
        TextToImage = 1,
        ImageToImage = 2,
        ImageToImageUpscale = 3,
        ImageToImageWithMask = 4,
        ImageToText = 5,
        TextToAudio = 6,
        TextToSpeech = 7,
        SpeechToText = 8,
    }

    public partial class ComfyTextOutput
    {
        public virtual string Text { get; set; }
    }

    public partial class ComfyWorkflowRequest
    {
        public virtual string Model { get; set; }
        public virtual int? Steps { get; set; }
        public virtual int BatchSize { get; set; }
        public virtual int? Seed { get; set; }
        public virtual string PositivePrompt { get; set; }
        public virtual string NegativePrompt { get; set; }
        public virtual ComfyFileInput Image { get; set; }
        public virtual ComfyFileInput Speech { get; set; }
        public virtual ComfyFileInput Mask { get; set; }
        public virtual Stream ImageInput { get; set; }
        public virtual Stream SpeechInput { get; set; }
        public virtual Stream MaskInput { get; set; }
        public virtual ComfySampler? Sampler { get; set; }
        public virtual string Scheduler { get; set; }
        public virtual double? CfgScale { get; set; }
        public virtual double? Denoise { get; set; }
        public virtual string UpscaleModel { get; set; }
        public virtual int? Width { get; set; }
        public virtual int? Height { get; set; }
        public virtual ComfyTaskType TaskType { get; set; }
        public virtual string Clip { get; set; }
        public virtual double? SampleLength { get; set; }
        public virtual ComfyMaskSource MaskChannel { get; set; }
    }

    public partial class ComfyWorkflowResponse
    {
        public ComfyWorkflowResponse()
        {
            NodeErrors = new List<NodeError>{};
        }

        public virtual string PromptId { get; set; }
        public virtual int Number { get; set; }
        public virtual List<NodeError> NodeErrors { get; set; }
    }

    public partial class ComfyWorkflowStatus
    {
        public ComfyWorkflowStatus()
        {
            Outputs = new List<ComfyOutput>{};
        }

        public virtual string StatusMessage { get; set; }
        public virtual string Error { get; set; }
        public virtual bool Completed { get; set; }
        public virtual List<ComfyOutput> Outputs { get; set; }
    }

    public partial class DiffusionApiProvider
    {
        public DiffusionApiProvider()
        {
            Models = new List<string>{};
        }

        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string ApiKey { get; set; }
        public virtual string ApiKeyHeader { get; set; }
        public virtual string ApiBaseUrl { get; set; }
        public virtual string HeartbeatUrl { get; set; }
        public virtual int Concurrency { get; set; }
        public virtual int Priority { get; set; }
        public virtual bool Enabled { get; set; }
        public virtual DateTime? OfflineDate { get; set; }
        public virtual DateTime CreatedDate { get; set; }
        public virtual List<string> Models { get; set; }
        public virtual string Type { get; set; }
    }

    public partial class NodeError
    {
    }

    public enum PeriodicFrequency
    {
        Minute,
        Hourly,
        Daily,
        Monthly,
    }

}

namespace ServiceStack.Jobs
{
    public partial class BackgroundJob
        : IMeta
    {
        public BackgroundJob()
        {
            Args = new Dictionary<string, string>{};
            Meta = new Dictionary<string, string>{};
        }

        public virtual long Id { get; set; }
        public virtual long? ParentId { get; set; }
        public virtual string RefId { get; set; }
        public virtual string Worker { get; set; }
        public virtual string Tag { get; set; }
        public virtual string Callback { get; set; }
        public virtual DateTime? RunAfter { get; set; }
        public virtual DateTime CreatedDate { get; set; }
        public virtual string CreatedBy { get; set; }
        public virtual string RequestId { get; set; }
        public virtual string RequestType { get; set; }
        public virtual string Command { get; set; }
        public virtual string Request { get; set; }
        public virtual string RequestBody { get; set; }
        public virtual string RequestUserId { get; set; }
        public virtual string Response { get; set; }
        public virtual string ResponseBody { get; set; }
        public virtual BackgroundJobState State { get; set; }
        public virtual DateTime? StartedDate { get; set; }
        public virtual DateTime? CompletedDate { get; set; }
        public virtual DateTime? NotifiedDate { get; set; }
        public virtual int DurationMs { get; set; }
        public virtual int? TimeoutSecs { get; set; }
        public virtual int? RetryLimit { get; set; }
        public virtual int Attempts { get; set; }
        public virtual double? Progress { get; set; }
        public virtual string Status { get; set; }
        public virtual string Logs { get; set; }
        public virtual DateTime? LastActivityDate { get; set; }
        public virtual string ReplyTo { get; set; }
        public virtual string ErrorCode { get; set; }
        public virtual ResponseStatus Error { get; set; }
        public virtual Dictionary<string, string> Args { get; set; }
        public virtual Dictionary<string, string> Meta { get; set; }
        [Ignore]
        public virtual bool Transient { get; set; }

        [Ignore]
        public virtual Action<Object> OnSuccess { get; set; }

        [Ignore]
        public virtual Action<Exception> OnFailed { get; set; }
    }

    public enum BackgroundJobState
    {
        Queued,
        Started,
        Executed,
        Completed,
        Failed,
        Cancelled,
    }

    public partial class CompletedJob
        : BackgroundJob
    {
    }

    public partial class FailedJob
        : BackgroundJob
    {
    }

    public partial class JobSummary
    {
        public virtual long Id { get; set; }
        public virtual long? ParentId { get; set; }
        public virtual string RefId { get; set; }
        public virtual string Worker { get; set; }
        public virtual string Tag { get; set; }
        public virtual DateTime CreatedDate { get; set; }
        public virtual string CreatedBy { get; set; }
        public virtual string RequestId { get; set; }
        public virtual string RequestType { get; set; }
        public virtual string Request { get; set; }
        public virtual string Response { get; set; }
        public virtual string RequestUserId { get; set; }
        public virtual string Callback { get; set; }
        public virtual DateTime? StartedDate { get; set; }
        public virtual DateTime? CompletedDate { get; set; }
        public virtual BackgroundJobState Status { get; set; }
        public virtual int DurationMs { get; set; }
        public virtual int? RetryLimit { get; set; }
        public virtual int Retries { get; set; }
        public virtual string ErrorCode { get; set; }
        public virtual string ErrorMessage { get; set; }
    }

    public partial class WorkerStats
    {
        public virtual string Name { get; set; }
        public virtual long Queued { get; set; }
        public virtual long Received { get; set; }
        public virtual long Completed { get; set; }
        public virtual long Retries { get; set; }
        public virtual long Failed { get; set; }
    }

}

