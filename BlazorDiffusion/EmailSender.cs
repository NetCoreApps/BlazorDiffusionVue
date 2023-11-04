using BlazorDiffusion.ServiceModel;
using Microsoft.AspNetCore.Identity.UI.Services;
using ServiceStack.Messaging;

namespace BlazorDiffusion;

public class EmailSender : IEmailSender
{
    IMessageService MessageService { get; }
    public EmailSender(IMessageService messageService)
    {
        MessageService = messageService;
    }

    public Task SendEmailAsync(string email, string subject, string htmlMessage)
    {        
        using var mqClient = MessageService.CreateMessageProducer();
        mqClient.Publish(new SendEmail
        {
            To = email,
            Subject = subject,
            BodyHtml = htmlMessage,
        });

        return Task.CompletedTask;
    }
}
