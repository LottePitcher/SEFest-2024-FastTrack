import { UmbElementMixin as y } from "@umbraco-cms/backoffice/element-api";
import { LitElement as C, html as n, css as E, state as h, customElement as w, repeat as d } from "@umbraco-cms/backoffice/external/lit";
import { UMB_MODAL_MANAGER_CONTEXT as $ } from "@umbraco-cms/backoffice/modal";
import { UmbMemberCollectionRepository as f } from "@umbraco-cms/backoffice/member";
var A = Object.defineProperty, O = Object.getOwnPropertyDescriptor, b = (e) => {
  throw TypeError(e);
}, p = (e, t, r, c) => {
  for (var i = c > 1 ? void 0 : c ? O(t, r) : t, m = e.length - 1, u; m >= 0; m--)
    (u = e[m]) && (i = (c ? u(t, r, i) : u(i)) || i);
  return c && i && A(t, r, i), i;
}, q = (e, t, r) => t.has(e) || b("Cannot " + r), D = (e, t, r) => t.has(e) ? b("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), a = (e, t, r) => (q(e, t, "access private method"), r), s, v, _, l, M, x;
let o = class extends y(C) {
  constructor() {
    super(), D(this, s), a(this, s, v).call(this), a(this, s, _).call(this);
  }
  render() {
    return n`
      ${a(this, s, M).call(this)} ${a(this, s, x).call(this)}
    `;
  }
};
s = /* @__PURE__ */ new WeakSet();
v = async function() {
  const e = new f(this), { data: t } = await e.requestCollection({ skip: 0, take: 100 });
  this.activeMembers = t == null ? void 0 : t.items;
};
_ = async function() {
  const e = new f(this), { data: t } = await e.requestCollection({ skip: 0, take: 100 });
  this.expiredMembers = t == null ? void 0 : t.items;
};
l = async function(e) {
  const t = await this.getContext($), r = { member: e };
  t.open(this, "Custom.Modal.Member", {
    data: r,
    modal: { type: "sidebar" }
  });
};
M = function() {
  if (this.activeMembers)
    return n`<uui-box headline="Active Members">
      ${d(
      this.activeMembers,
      (e) => e.unique,
      (e) => n`<uui-ref-node-member
            name=${e.variants[0].name}
            @open=${() => a(this, s, l).call(this, e)}
          ></uui-ref-node-member>`
    )}</uui-box
    >`;
};
x = function() {
  if (this.expiredMembers)
    return n`<uui-box headline="Expired Members">
      ${d(
      this.expiredMembers,
      (e) => e.unique,
      (e) => n`<uui-ref-node-member
            name=${e.variants[0].name}
            @open=${() => a(this, s, l).call(this, e)}
          ></uui-ref-node-member>`
    )}</uui-box
    >`;
};
o.styles = E`
    :host {
      display: grid;
      margin: var(--uui-size-layout-1);
      gap: var(--uui-size-layout-1);
      grid-template-columns: 1fr 1fr;
    }
  `;
p([
  h()
], o.prototype, "activeMembers", 2);
p([
  h()
], o.prototype, "expiredMembers", 2);
o = p([
  w("fast-track-dashboard")
], o);
export {
  o as FastTrackDashboard,
  o as element
};
