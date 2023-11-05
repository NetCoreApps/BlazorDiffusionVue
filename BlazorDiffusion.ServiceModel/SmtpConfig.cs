namespace BlazorDiffusion.ServiceModel;

public class SmtpConfig
{
    public string Username { get; set; }
    public string Password { get; set; }
    public string Host { get; set; }
    public int Port { get; set; }
    public string FromEmail { get; set; }
    public string FromName { get; set; }
    public string DevToEmail { get; set; }
    public string Bcc { get; set; }
}
