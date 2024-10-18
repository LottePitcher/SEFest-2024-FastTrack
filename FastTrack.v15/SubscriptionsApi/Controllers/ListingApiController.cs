using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using FastTrack.v15.SubscriptionsApi.Models;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.Common.Routing;
using Umbraco.Cms.Web.Common.Authorization;

namespace FastTrack.v15.SubscriptionsApi.Controllers;

[ApiController]
[Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
[ApiVersion("1.0")]
[ApiExplorerSettings(GroupName = "Subscriptions API")]
[BackOfficeRoute("subscriptions/api/v{version:apiVersion}")]
[Produces("application/json")]
public class ListingApiController : ControllerBase
{
    private readonly IMemberService _memberService;

    public ListingApiController(IMemberService memberService)
    {
        _memberService = memberService;
    }

    [HttpGet("GetActive")]
    [ProducesResponseType(typeof(List<SubscriptionListItem>), StatusCodes.Status200OK)]
    public List<SubscriptionListItem> GetActive()
    {
        return GetAllMembers()
            .Where(x => x.SubscriptionExpiry.HasValue && x.SubscriptionExpiry.Value >= DateTime.Now)
            .OrderBy(x => x.SubscriptionExpiry)
            .ThenBy(x => x.LastName)
            .ThenBy(x => x.FirstName)
            .ToList();
    }

    [HttpGet("GetExpired")]
    [ProducesResponseType(typeof(List<SubscriptionListItem>), StatusCodes.Status200OK)]
    public List<SubscriptionListItem> GetExpired()
    {
        return GetAllMembers()
            .Where(x => x.SubscriptionExpiry.HasValue && x.SubscriptionExpiry.Value < DateTime.Now)
            .OrderBy(x => x.SubscriptionExpiry)
            .ThenBy(x => x.LastName)
            .ThenBy(x => x.FirstName)
            .ToList();
    }

    [HttpGet("GetNonsubscribed")]
    [ProducesResponseType(typeof(List<SubscriptionListItem>), StatusCodes.Status200OK)]
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