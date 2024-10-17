import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement } from "@umbraco-cms/backoffice/modal";

@customElement("fast-track-member-modal")
export class FastTrackMemberModal extends UmbModalBaseElement<any> {
  render() {
    // Get the member from the data:
    const member = this.data?.member;
    const firstName = member.values.find(
      (x: any) => x.alias === "firstName"
    )?.value;
    const lastName = member.values.find(
      (x: any) => x.alias === "lastName"
    )?.value;
    const subscriptionExpiry = member.values.find(
      (x: any) => x.alias === "subscriptionExpiry"
    )?.value;
    const comments = member.values.find(
      (x: any) => x.alias === "comments"
    )?.value;

    return html`<umb-body-layout>
      <div slot="header">${member.name}</div>
      <div>
        <b>First name:</b>
        <span>${firstName}</span>
      </div>
      <div>
        <b>Last name:</b>
        <span>${lastName}</span>
      </div>
      <div>
        <b>Subscription expiry:</b>
        <span>${subscriptionExpiry}</span>
      </div>
      <div>
        <b>Comments:</b>
        <span>${comments}</span>
      </div>
      <div slot="actions">
        <uui-button @click=${() => this._rejectModal()}>Close</uui-button>
      </div>
    </umb-body-layout>`;
  }
}

export { FastTrackMemberModal as element };
