using ServiceStack;

namespace BlazorDiffusion.ServiceModel;

[Route("/up")]
public class KamalUp : IGet, IReturn<KamalUpResponse>
{
}

public class KamalUpResponse
{
}
