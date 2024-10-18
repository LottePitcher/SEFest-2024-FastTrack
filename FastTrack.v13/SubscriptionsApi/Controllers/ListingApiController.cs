using FastTrack.v13.SubscriptionsApi.Models;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Cms.Web.Common.Attributes;

namespace FastTrack.v13.SubscriptionsApi.Controllers;

[PluginController("Subscriptions")]
public class ListingApiController : UmbracoAuthorizedJsonController
{
    private readonly IMemberService _memberService;

    public ListingApiController(IMemberService memberService)
    {
        _memberService = memberService;
    }
    
    public List<SubscriptionListItem> GetActive()
    {
        return GetAllMembers()
            .Where(x => x.SubscriptionExpiry.HasValue && x.SubscriptionExpiry.Value >= DateTime.Now)
            .OrderBy(x => x.SubscriptionExpiry)
            .ThenBy(x => x.LastName)
            .ThenBy(x => x.FirstName)
            .ToList();
    }
    
    public List<SubscriptionListItem> GetExpired()
    {
        return GetAllMembers()
            .Where(x => x.SubscriptionExpiry.HasValue && x.SubscriptionExpiry.Value < DateTime.Now)
            .OrderBy(x => x.SubscriptionExpiry)
            .ThenBy(x => x.LastName)
            .ThenBy(x => x.FirstName)
            .ToList();
    }
    
    public List<SubscriptionListItem> GetNonsubscribed()
    {
        return GetAllMembers()
            .Where(x => !x.SubscriptionExpiry.HasValue)
            .OrderBy(x => x.LastName)
            .ThenBy(x => x.FirstName)
            .ToList();
    }
    
    private List<SubscriptionListItem> GetAllMembers()
    {
        // NB for a performant real-world solution, should put custom properties in Examine index and filter using Examine 
        
        var allMembers = _memberService.GetAll(0, int.MaxValue, out var totalRecords);
        
        var subscriptions = allMembers.Select(x => new SubscriptionListItem
            {
                MemberKey = x.Key,
                FirstName = x.GetValue<string>("firstName"),
                LastName = x.GetValue<string>("lastName"),
                Email = x.Email,
                SubscriptionExpiry = x.GetValue<DateTime?>("subscriptionExpiry")
            })
            .ToList();
        
        return subscriptions;
    }
}