import { customElement as b, html as d } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as p } from "@umbraco-cms/backoffice/modal";
var c = Object.defineProperty, f = Object.getOwnPropertyDescriptor, y = (s, t, l, i) => {
  for (var e = i > 1 ? void 0 : i ? f(t, l) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (e = (i ? r(t, l, e) : r(e)) || e);
  return i && e && c(t, l, e), e;
};
let u = class extends p {
  render() {
    var n, r, m, o, v;
    const s = (n = this.data) == null ? void 0 : n.member, t = (r = s.values.find(
      (a) => a.alias === "firstName"
    )) == null ? void 0 : r.value, l = (m = s.values.find(
      (a) => a.alias === "lastName"
    )) == null ? void 0 : m.value, i = (o = s.values.find(
      (a) => a.alias === "subscriptionExpiry"
    )) == null ? void 0 : o.value, e = (v = s.values.find(
      (a) => a.alias === "comments"
    )) == null ? void 0 : v.value;
    return d`<umb-body-layout>
      <div slot="header">${s.name}</div>
      <div>
        <b>First name:</b>
        <span>${t}</span>
      </div>
      <div>
        <b>Last name:</b>
        <span>${l}</span>
      </div>
      <div>
        <b>Subscription expiry:</b>
        <span>${i}</span>
      </div>
      <div>
        <b>Comments:</b>
        <span>${e}</span>
      </div>
      <div slot="actions">
        <uui-button @click=${() => this._rejectModal()}>Close</uui-button>
      </div>
    </umb-body-layout>`;
  }
};
u = y([
  b("fast-track-member-modal")
], u);
export {
  u as FastTrackMemberModal,
  u as element
};
