using BlazorDiffusion.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;
using System.Net.Mail;

namespace BlazorDiffusion.ServiceInterface;

public class EmailServices : Service
{
    public SmtpConfig Config { get; set; }
    public ILogger<EmailServices> Log { get; set; }

    public object Any(SendEmail request)
    {
        Log.LogInformation("Sending email to {Email} with subject {Subject}", request.To, request.Subject);

        using var client = new SmtpClient(Config.Host, Config.Port);
        client.Credentials = new System.Net.NetworkCredential(Config.Username, Config.Password);
        client.EnableSsl = true;

        // If DevToEmail is set, send all emails to that address instead
        var emailTo = Config.DevToEmail != null
            ? new MailAddress(Config.DevToEmail)
            : new MailAddress(request.To, request.ToName);

        var emailFrom = new MailAddress(Config.FromEmail, Config.FromName);

        var msg = new MailMessage(emailFrom, emailTo)
        {
            Subject = request.Subject,
            Body = request.BodyHtml ?? request.BodyText,
            IsBodyHtml = request.BodyHtml != null,
        };

        if (Config.Bcc != null)
        {
            msg.Bcc.Add(new MailAddress(Config.Bcc));
        }

        client.Send(msg);

        return new EmptyResponse();
    }
}
