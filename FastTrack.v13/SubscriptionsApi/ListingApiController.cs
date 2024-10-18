using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.BackOffice.Controllers;
using Umbraco.Cms.Web.Common.Attributes;

namespace FastTrack.v13.SubscriptionsApi;

[PluginController("Subscriptions")]
public class ListingApiController : UmbracoAuthorizedJsonController
{
    private IMemberService _memberService;

    public ListingApiController(IMemberService memberService)
    {
        _memberService = memberService;
    }

    public List<SubscriptionListItem> GetAll()
    {
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