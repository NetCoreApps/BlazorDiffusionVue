using Microsoft.AspNetCore.Identity;
using ServiceStack.Messaging;

namespace BlazorDiffusion;

/// <summary>
/// Sends emails by publishing a message to the Background MQ Server where it's processed in the background
/// </summary>
public class EmailSender(IMessageService messageService) : IEmailSender<AppUser>
{
    public Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        using var mqClient = messageService.CreateMessageProducer();
        mqClient.Publish(new SendEmail
        {
            To = email,
            Subject = subject,
            BodyHtml = htmlMessage,
        });

        return Task.CompletedTask;
    }

    public Task SendConfirmationLinkAsync(AppUser user, string email, string confirmationLink) =>
        SendEmailAsync(email, "Confirm your email", $"Please confirm your account by <a href='{confirmationLink}'>clicking here</a>.");

    public Task SendPasswordResetLinkAsync(AppUser user, string email, string resetLink) =>
        SendEmailAsync(email, "Reset your password", $"Please reset your password by <a href='{resetLink}'>clicking here</a>.");

    public Task SendPasswordResetCodeAsync(AppUser user, string email, string resetCode) =>
        SendEmailAsync(email, "Reset your password", $"Please reset your password using the following code: {resetCode}");
}
