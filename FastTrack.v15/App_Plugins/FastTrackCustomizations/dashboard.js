import { UmbElementMixin as G } from "@umbraco-cms/backoffice/element-api";
import { LitElement as H, html as h, css as B, state as S, customElement as I, repeat as C } from "@umbraco-cms/backoffice/external/lit";
import { UMB_MODAL_MANAGER_CONTEXT as F } from "@umbraco-cms/backoffice/modal";
import { tryExecuteAndNotify as x } from "@umbraco-cms/backoffice/resources";
import { O as b } from "./OpenAPI-CppMC34i.js";
class A extends Error {
  constructor(e, r, i) {
    super(i), this.name = "ApiError", this.url = r.url, this.status = r.status, this.statusText = r.statusText, this.body = r.body, this.request = e;
  }
}
class L extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class V {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((r, i) => {
      this._resolve = r, this._reject = i;
      const s = (o) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(o));
      }, n = (o) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(o));
      }, a = (o) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(o);
      };
      return Object.defineProperty(a, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(a, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(a, "isCancelled", {
        get: () => this._isCancelled
      }), e(s, n, a);
    });
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(e, r) {
    return this.promise.then(e, r);
  }
  catch(e) {
    return this.promise.catch(e);
  }
  finally(e) {
    return this.promise.finally(e);
  }
  cancel() {
    if (!(this._isResolved || this._isRejected || this._isCancelled)) {
      if (this._isCancelled = !0, this.cancelHandlers.length)
        try {
          for (const e of this.cancelHandlers)
            e();
        } catch (e) {
          console.warn("Cancellation threw an error", e);
          return;
        }
      this.cancelHandlers.length = 0, this._reject && this._reject(new L("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
const p = (t) => typeof t == "string", y = (t) => p(t) && t !== "", R = (t) => t instanceof Blob, j = (t) => t instanceof FormData, z = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, k = (t) => {
  const e = [], r = (s, n) => {
    e.push(`${encodeURIComponent(s)}=${encodeURIComponent(String(n))}`);
  }, i = (s, n) => {
    n != null && (n instanceof Date ? r(s, n.toISOString()) : Array.isArray(n) ? n.forEach((a) => i(s, a)) : typeof n == "object" ? Object.entries(n).forEach(([a, o]) => i(`${s}[${a}]`, o)) : r(s, n));
  };
  return Object.entries(t).forEach(([s, n]) => i(s, n)), e.length ? `?${e.join("&")}` : "";
}, W = (t, e) => {
  const r = encodeURI, i = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (n, a) => {
    var o;
    return (o = e.path) != null && o.hasOwnProperty(a) ? r(String(e.path[a])) : n;
  }), s = t.BASE + i;
  return e.query ? s + k(e.query) : s;
}, J = (t) => {
  if (t.formData) {
    const e = new FormData(), r = (i, s) => {
      p(s) || R(s) ? e.append(i, s) : e.append(i, JSON.stringify(s));
    };
    return Object.entries(t.formData).filter(([, i]) => i != null).forEach(([i, s]) => {
      Array.isArray(s) ? s.forEach((n) => r(i, n)) : r(i, s);
    }), e;
  }
}, m = async (t, e) => typeof e == "function" ? e(t) : e, K = async (t, e) => {
  const [r, i, s, n] = await Promise.all([
    // @ts-ignore
    m(e, t.TOKEN),
    // @ts-ignore
    m(e, t.USERNAME),
    // @ts-ignore
    m(e, t.PASSWORD),
    // @ts-ignore
    m(e, t.HEADERS)
  ]), a = Object.entries({
    Accept: "application/json",
    ...n,
    ...e.headers
  }).filter(([, o]) => o != null).reduce((o, [d, c]) => ({
    ...o,
    [d]: String(c)
  }), {});
  if (y(r) && (a.Authorization = `Bearer ${r}`), y(i) && y(s)) {
    const o = z(`${i}:${s}`);
    a.Authorization = `Basic ${o}`;
  }
  return e.body !== void 0 && (e.mediaType ? a["Content-Type"] = e.mediaType : R(e.body) ? a["Content-Type"] = e.body.type || "application/octet-stream" : p(e.body) ? a["Content-Type"] = "text/plain" : j(e.body) || (a["Content-Type"] = "application/json")), new Headers(a);
}, Q = (t) => {
  var e, r;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (r = t.mediaType) != null && r.includes("+json") ? JSON.stringify(t.body) : p(t.body) || R(t.body) || j(t.body) ? t.body : JSON.stringify(t.body);
}, X = async (t, e, r, i, s, n, a) => {
  const o = new AbortController();
  let d = {
    headers: n,
    body: i ?? s,
    method: e.method,
    signal: o.signal
  };
  t.WITH_CREDENTIALS && (d.credentials = t.CREDENTIALS);
  for (const c of t.interceptors.request._fns)
    d = await c(d);
  return a(() => o.abort()), await fetch(r, d);
}, Y = (t, e) => {
  if (e) {
    const r = t.headers.get(e);
    if (p(r))
      return r;
  }
}, Z = async (t) => {
  if (t.status !== 204)
    try {
      const e = t.headers.get("Content-Type");
      if (e) {
        const r = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await t.json();
        if (r.some((i) => e.includes(i)))
          return await t.blob();
        if (e.includes("multipart/form-data"))
          return await t.formData();
        if (e.includes("text/"))
          return await t.text();
      }
    } catch (e) {
      console.error(e);
    }
}, ee = (t, e) => {
  const i = {
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "Im a teapot",
    421: "Misdirected Request",
    422: "Unprocessable Content",
    423: "Locked",
    424: "Failed Dependency",
    425: "Too Early",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required",
    ...t.errors
  }[e.status];
  if (i)
    throw new A(t, e, i);
  if (!e.ok) {
    const s = e.status ?? "unknown", n = e.statusText ?? "unknown", a = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new A(
      t,
      e,
      `Generic Error: status: ${s}; status text: ${n}; body: ${a}`
    );
  }
}, _ = (t, e) => new V(async (r, i, s) => {
  try {
    const n = W(t, e), a = J(e), o = Q(e), d = await K(t, e);
    if (!s.isCancelled) {
      let c = await X(t, e, n, o, a, d, s);
      for (const U of t.interceptors.response._fns)
        c = await U(c);
      const v = await Z(c), P = Y(c, e.responseHeader);
      let T = v;
      e.responseTransformer && c.ok && (T = await e.responseTransformer(v));
      const w = {
        url: n,
        ok: c.ok,
        status: c.status,
        statusText: c.statusText,
        body: P ?? T
      };
      ee(e, w), r(w.body);
    }
  } catch (n) {
    i(n);
  }
});
class M {
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoSubscriptionsApiV1GetActive() {
    return _(b, {
      method: "GET",
      url: "/umbraco/subscriptions/api/v1/GetActive"
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoSubscriptionsApiV1GetExpired() {
    return _(b, {
      method: "GET",
      url: "/umbraco/subscriptions/api/v1/GetExpired"
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoSubscriptionsApiV1GetNonsubscribed() {
    return _(b, {
      method: "GET",
      url: "/umbraco/subscriptions/api/v1/GetNonsubscribed"
    });
  }
}
var te = Object.defineProperty, re = Object.getOwnPropertyDescriptor, N = (t) => {
  throw TypeError(t);
}, g = (t, e, r, i) => {
  for (var s = i > 1 ? void 0 : i ? re(e, r) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (i ? a(e, r, s) : a(s)) || s);
  return i && s && te(e, r, s), s;
}, se = (t, e, r) => e.has(t) || N("Cannot " + r), ie = (t, e, r) => e.has(t) ? N("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), u = (t, e, r) => (se(t, e, "access private method"), r), l, O, q, E, D, $;
let f = class extends G(H) {
  constructor() {
    super(), ie(this, l), u(this, l, O).call(this), u(this, l, q).call(this);
  }
  render() {
    return h`
      ${u(this, l, D).call(this)} ${u(this, l, $).call(this)}
    `;
  }
};
l = /* @__PURE__ */ new WeakSet();
O = async function() {
  const { data: t } = await x(
    this,
    M.getUmbracoSubscriptionsApiV1GetActive()
  );
  this.activeMembers = t;
};
q = async function() {
  const { data: t } = await x(
    this,
    M.getUmbracoSubscriptionsApiV1GetExpired()
  );
  this.expiredMembers = t;
};
E = async function(t) {
  const e = await this.getContext(F), r = { member: t };
  e.open(this, "Custom.Modal.Member", {
    data: r,
    modal: { type: "sidebar" }
  });
};
D = function() {
  if (this.activeMembers)
    return h`<uui-box headline="Active Members">
      ${C(
      this.activeMembers,
      (t) => t.memberKey,
      (t) => h`<uui-ref-node-member
            name="${t.firstName} ${t.lastName}"
            @open=${() => u(this, l, E).call(this, t)}
          ></uui-ref-node-member>`
    )}</uui-box
    >`;
};
$ = function() {
  if (this.expiredMembers)
    return h`<uui-box headline="Expired Members">
      ${C(
      this.expiredMembers,
      (t) => t.memberKey,
      (t) => h`<uui-ref-node-member
            name="${t.firstName} ${t.lastName}"
            @open=${() => u(this, l, E).call(this, t)}
          ></uui-ref-node-member>`
    )}</uui-box
    >`;
};
f.styles = B`
    :host {
      display: grid;
      margin: var(--uui-size-layout-1);
      gap: var(--uui-size-layout-1);
      grid-template-columns: 1fr 1fr;
    }
  `;
g([
  S()
], f.prototype, "activeMembers", 2);
g([
  S()
], f.prototype, "expiredMembers", 2);
f = g([
  I("fast-track-dashboard")
], f);
export {
  f as FastTrackDashboard,
  f as element
};
