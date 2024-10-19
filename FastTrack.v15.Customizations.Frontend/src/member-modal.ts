import { customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement } from "@umbraco-cms/backoffice/modal";

@customElement("fast-track-member-modal")
export class FastTrackMemberModal extends UmbModalBaseElement<any> {
  render() {
    // Get the member from the data:
    const member = this.data?.member;

    return html`<umb-body-layout>
      <div slot="header">${member.name}</div>
      <div>
        <b>First name:</b>
        <span>${member.firstName}</span>
      </div>
      <div>
        <b>Last name:</b>
        <span>${member.lastName}</span>
      </div>
      <div>
        <b>Email:</b>
        <span>${member.email}</span>
      </div>
      <div>
        <b>Subscription expiry:</b>
        <span>${member.subscriptionExpiry}</span>
      </div>
      <div slot="actions">
        <uui-button @click=${() => this._rejectModal()}>Close</uui-button>
      </div>
    </umb-body-layout>`;
  }
}

export { FastTrackMemberModal as element };
