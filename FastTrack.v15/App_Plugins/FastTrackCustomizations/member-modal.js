import { customElement as o, html as b } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as l } from "@umbraco-cms/backoffice/modal";
var d = Object.defineProperty, p = Object.getOwnPropertyDescriptor, v = (e, t, r, s) => {
  for (var a = s > 1 ? void 0 : s ? p(t, r) : t, i = e.length - 1, m; i >= 0; i--)
    (m = e[i]) && (a = (s ? m(t, r, a) : m(a)) || a);
  return s && a && d(t, r, a), a;
};
let n = class extends l {
  render() {
    var t;
    const e = (t = this.data) == null ? void 0 : t.member;
    return b`<umb-body-layout>
      <div slot="header">${e.name}</div>
      <div>
        <b>First name:</b>
        <span>${e.firstName}</span>
      </div>
      <div>
        <b>Last name:</b>
        <span>${e.lastName}</span>
      </div>
      <div>
        <b>Email:</b>
        <span>${e.email}</span>
      </div>
      <div>
        <b>Subscription expiry:</b>
        <span>${e.subscriptionExpiry}</span>
      </div>
      <div slot="actions">
        <uui-button @click=${() => this._rejectModal()}>Close</uui-button>
      </div>
    </umb-body-layout>`;
  }
};
n = v([
  o("fast-track-member-modal")
], n);
export {
  n as FastTrackMemberModal,
  n as element
};
