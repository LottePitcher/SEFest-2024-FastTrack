import { UmbElementMixin as m } from "@umbraco-cms/backoffice/element-api";
import { UmbChangeEvent as p } from "@umbraco-cms/backoffice/event";
import { LitElement as b, html as c, css as w, property as v, state as D, customElement as E, repeat as A } from "@umbraco-cms/backoffice/external/lit";
var L = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, d = (t) => {
  throw TypeError(t);
}, l = (t, e, a, s) => {
  for (var i = s > 1 ? void 0 : s ? $(e, a) : e, o = t.length - 1, h; o >= 0; o--)
    (h = t[o]) && (i = (s ? h(e, a, i) : h(i)) || i);
  return s && i && L(e, a, i), i;
}, M = (t, e, a) => e.has(t) || d("Cannot " + a), S = (t, e, a) => e.has(t) ? d("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), u = (t, e, a) => (M(t, e, "access private method"), a), n, f, _, g, y;
let r = class extends m(b) {
  constructor() {
    super(...arguments), S(this, n);
  }
  updated(t) {
    super.updated(t), (t.has("value") || t.has("config")) && u(this, n, f).call(this);
  }
  render() {
    return c` <div>
				<uui-input type="date" value=${(this.value ?? "").split(" ")[0]} @change=${u(this, n, _)}></uui-input>

				<span>${this._statusLabel}</span>
			</div>
			<div>${u(this, n, y).call(this)}</div>`;
  }
};
n = /* @__PURE__ */ new WeakSet();
f = function() {
  this.config && (this.value ? new Date(this.value) > /* @__PURE__ */ new Date() ? this._statusLabel = this.config.getValueByAlias("activeLabel") : this._statusLabel = this.config.getValueByAlias("expiredLabel") : this._statusLabel = this.config.getValueByAlias("emptyLabel"));
};
_ = function(t) {
  const e = t.target.value.toString() + " 00:00:00";
  isNaN(new Date(e).getTime()) || (this.value = e, this.dispatchEvent(new p()));
};
g = function(t) {
  const e = parseInt(t);
  if (!this.value || !e) return;
  const a = new Date(this.value);
  a.setMonth(a.getMonth() + e);
  const s = a.getFullYear(), i = (a.getMonth() + 1).toString().padStart(2, "0"), o = a.getDate().toString().padStart(2, "0");
  this.value = `${s}-${i}-${o} 00:00:00`, this.dispatchEvent(new p());
};
y = function() {
  var e, a;
  const t = (a = (e = this.config) == null ? void 0 : e.getValueByAlias("addMonthsButtons")) == null ? void 0 : a.split(",");
  if (t)
    return A(
      t,
      (s) => c`
					<uui-button
						look="secondary"
						label="Add ${s} months"
						@click=${() => u(this, n, g).call(this, s)}></uui-button>
				`
    );
};
r.styles = w`
		:host {
			display: grid;
			row-gap: var(--uui-size-layout-1);
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
  E("fast-track-subscription-expire")
], r);
export {
  r as element
};
