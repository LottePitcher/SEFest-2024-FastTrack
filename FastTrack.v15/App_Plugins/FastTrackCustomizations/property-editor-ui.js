import { UmbElementMixin as b } from "@umbraco-cms/backoffice/element-api";
import { UmbChangeEvent as h } from "@umbraco-cms/backoffice/event";
import { LitElement as w, html as p, css as C, property as v, state as d, customElement as D, repeat as L } from "@umbraco-cms/backoffice/external/lit";
var E = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, f = (t) => {
  throw TypeError(t);
}, u = (t, e, a, s) => {
  for (var i = s > 1 ? void 0 : s ? $(e, a) : e, o = t.length - 1, c; o >= 0; o--)
    (c = t[o]) && (i = (s ? c(e, a, i) : c(i)) || i);
  return s && i && E(e, a, i), i;
}, A = (t, e, a) => e.has(t) || f("Cannot " + a), M = (t, e, a) => e.has(t) ? f("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), l = (t, e, a) => (A(t, e, "access private method"), a), n, _, g, y, m;
let r = class extends b(w) {
  constructor() {
    super(...arguments), M(this, n);
  }
  updated(t) {
    super.updated(t), (t.has("value") || t.has("config")) && l(this, n, _).call(this);
  }
  render() {
    return p` <div>
				<uui-input type="date" value=${(this.value ?? "").split(" ")[0]} @change=${l(this, n, g)}></uui-input>

				<span class="statusLabel ${this._statusClass ?? ""}">${this._statusLabel}</span>
			</div>
			<div>${l(this, n, m).call(this)}</div>`;
  }
};
n = /* @__PURE__ */ new WeakSet();
_ = function() {
  this.config && (this.value ? new Date(this.value) > /* @__PURE__ */ new Date() ? (this._statusClass = "active", this._statusLabel = this.config.getValueByAlias("activeLabel")) : (this._statusClass = "expired", this._statusLabel = this.config.getValueByAlias("expiredLabel")) : (this._statusClass = "", this._statusLabel = this.config.getValueByAlias("emptyLabel")));
};
g = function(t) {
  const e = t.target.value.toString() + " 00:00:00";
  isNaN(new Date(e).getTime()) || (this.value = e, this.dispatchEvent(new h()));
};
y = function(t) {
  const e = parseInt(t);
  if (!this.value || !e) return;
  const a = new Date(this.value);
  a.setMonth(a.getMonth() + e);
  const s = a.getFullYear(), i = (a.getMonth() + 1).toString().padStart(2, "0"), o = a.getDate().toString().padStart(2, "0");
  this.value = `${s}-${i}-${o} 00:00:00`, this.dispatchEvent(new h());
};
m = function() {
  var e, a;
  const t = (a = (e = this.config) == null ? void 0 : e.getValueByAlias("addMonthsButtons")) == null ? void 0 : a.split(",");
  if (t)
    return L(
      t,
      (s) => p`
					<uui-button
						look="secondary"
						label="Add ${s} months"
						@click=${() => l(this, n, y).call(this, s)}></uui-button>
				`
    );
};
r.styles = C`
		:host {
			display: grid;
			row-gap: var(--uui-size-layout-1);
		}

		.statusLabel {
			padding: var(--uui-size-2);
		}

		.active {
			background-color: var(--uui-color-positive);
			color: var(--uui-color-positive-contrast);
		}

		.expired {
			background-color: var(--uui-color-warning);
			color: var(--uui-color-warning-contrast);
		}
	`;
u([
  v({ attribute: !1 })
], r.prototype, "config", 2);
u([
  v()
], r.prototype, "value", 2);
u([
  d()
], r.prototype, "_statusLabel", 2);
u([
  d()
], r.prototype, "_statusClass", 2);
r = u([
  D("fast-track-subscription-expire")
], r);
export {
  r as element
};
