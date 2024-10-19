import { UmbElementMixin as y } from "@umbraco-cms/backoffice/element-api";
import { UmbChangeEvent as c } from "@umbraco-cms/backoffice/event";
import { LitElement as b, html as p, css as w, property as v, state as D, customElement as E, repeat as L } from "@umbraco-cms/backoffice/external/lit";
var A = Object.defineProperty, C = Object.getOwnPropertyDescriptor, d = (t) => {
  throw TypeError(t);
}, l = (t, e, a, s) => {
  for (var i = s > 1 ? void 0 : s ? C(e, a) : e, u = t.length - 1, h; u >= 0; u--)
    (h = t[u]) && (i = (s ? h(e, a, i) : h(i)) || i);
  return s && i && A(e, a, i), i;
}, M = (t, e, a) => e.has(t) || d("Cannot " + a), O = (t, e, a) => e.has(t) ? d("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), o = (t, e, a) => (M(t, e, "access private method"), a), n, f, _, g, m;
let r = class extends y(b) {
  constructor() {
    super(...arguments), O(this, n);
  }
  updated(t) {
    (t.has("value") || t.has("config")) && o(this, n, f).call(this);
  }
  render() {
    return p`
			<div>
				<uui-input type="date" .value=${(this.value ?? "").split(" ")[0]} @change=${o(this, n, _)}></uui-input>

				<span class="date-picker-status">${this._statusLabel}</span>
			</div>
			<div>${o(this, n, m).call(this)}</div>
		`;
  }
};
n = /* @__PURE__ */ new WeakSet();
f = function() {
  var t, e, a;
  this.config && (this.value ? new Date(this.value) > /* @__PURE__ */ new Date() ? this._statusLabel = (t = this.config) == null ? void 0 : t.getValueByAlias("activeLabel") : this._statusLabel = (e = this.config) == null ? void 0 : e.getValueByAlias("expiredLabel") : this._statusLabel = (a = this.config) == null ? void 0 : a.getValueByAlias("emptyLabel"));
};
_ = function(t) {
  this.value = t.target.value, this.dispatchEvent(new c());
};
g = function(t) {
  const e = parseInt(t);
  if (!this.value || !e) return;
  const a = new Date(this.value);
  a.setMonth(a.getMonth() + e), this.value = a.toLocaleDateString(), this.dispatchEvent(new c());
};
m = function() {
  var e, a;
  const t = (a = (e = this.config) == null ? void 0 : e.getValueByAlias("addMonthsButtons")) == null ? void 0 : a.split(",");
  if (t)
    return L(
      t,
      (s) => p`
					<uui-button look="secondary" @click=${() => o(this, n, g).call(this, s)}> Add ${s} months </uui-button>
				`
    );
};
r.styles = w`
		:host {
			display: grid;
			row-gap: 10px;
		}
	`;
l([
  v({ attribute: !1 })
], r.prototype, "config", 2);
l([
  v()
], r.prototype, "value", 2);
l([
  D()
], r.prototype, "_statusLabel", 2);
r = l([
  E("fast-track-date-picker")
], r);
export {
  r as FastTrackPropertyEditor,
  r as element
};
