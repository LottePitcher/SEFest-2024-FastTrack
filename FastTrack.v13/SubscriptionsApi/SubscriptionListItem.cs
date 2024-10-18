namespace FastTrack.v13.SubscriptionsApi;

public class SubscriptionListItem
{
    public Guid MemberKey { get; set; }
    public string FirstName { get; set; }
    
    public string LastName { get; set; }
    
    public string Email { get; set; }
    
    public DateTime? SubscriptionExpiry { get; set; }
}