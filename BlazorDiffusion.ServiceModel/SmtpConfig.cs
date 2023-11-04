namespace BlazorDiffusion.ServiceModel;

public class SmtpConfig
{
    public string UserId { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string Host { get; set; }
    public int Port { get; set; }
    public string DefaultFromEmail { get; set; }
    public string DefaultFromName { get; set; }
    public string DevToEmail { get; set; }
    public string EchoToEmail { get; set; }
}
