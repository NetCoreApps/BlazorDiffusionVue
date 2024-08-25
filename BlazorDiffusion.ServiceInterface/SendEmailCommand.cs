using System.Net.Mail;
using System.Threading;
using Microsoft.Extensions.Logging;
using ServiceStack;
using BlazorDiffusion.ServiceModel;
using ServiceStack.DataAnnotations;

namespace BlazorDiffusion.ServiceInterface;

[Tag(Tag.Tasks)]
[ExcludeMetadata]
[Restrict(InternalOnly = true)]
public class SendEmail : IReturn<EmptyResponse>
{
    public string To { get; set; }
    public string? ToName { get; set; }
    public string Subject { get; set; }
    public string? BodyText { get; set; }
    public string? BodyHtml { get; set; }
}

[Worker("smtp")]
public class SendEmailCommand(ILogger<SendEmailCommand> log, SmtpConfig config) : SyncCommand<SendEmail>
{
    private static long count = 0;
    protected override void Run(SendEmail request)
    {
        Interlocked.Increment(ref count);
        log.LogInformation("Sending {Count} email to {Email} with subject {Subject}", count, request.To, request.Subject);

        using var client = new SmtpClient(config.Host, config.Port);
        client.Credentials = new System.Net.NetworkCredential(config.Username, config.Password);
        client.EnableSsl = true;

        // If DevToEmail is set, send all emails to that address instead
        var emailTo = config.DevToEmail != null
            ? new MailAddress(config.DevToEmail)
            : new MailAddress(request.To, request.ToName);

        var emailFrom = new MailAddress(config.FromEmail, config.FromName);

        var msg = new MailMessage(emailFrom, emailTo)
        {
            Subject = request.Subject,
            Body = request.BodyHtml ?? request.BodyText,
            IsBodyHtml = request.BodyHtml != null,
        };

        if (config.Bcc != null)
        {
            msg.Bcc.Add(new MailAddress(config.Bcc));
        }

        client.Send(msg);
    }
}
