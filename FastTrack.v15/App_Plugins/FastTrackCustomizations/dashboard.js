import { UmbElementMixin as x } from "@umbraco-cms/backoffice/element-api";
import { LitElement as N, html as E, repeat as q, css as O, state as P, customElement as D } from "@umbraco-cms/backoffice/external/lit";
import { tryExecuteAndNotify as U } from "@umbraco-cms/backoffice/resources";
import { O as b } from "./OpenAPI-CppMC34i.js";
class v extends Error {
  constructor(e, r, i) {
    super(i), this.name = "ApiError", this.url = r.url, this.status = r.status, this.statusText = r.statusText, this.body = r.body, this.request = e;
  }
}
class $ extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class H {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((r, i) => {
      this._resolve = r, this._reject = i;
      const s = (o) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(o));
      }, a = (o) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(o));
      }, n = (o) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(o);
      };
      return Object.defineProperty(n, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(n, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(n, "isCancelled", {
        get: () => this._isCancelled
      }), e(s, a, n);
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
      this.cancelHandlers.length = 0, this._reject && this._reject(new $("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
const u = (t) => typeof t == "string", f = (t) => u(t) && t !== "", m = (t) => t instanceof Blob, T = (t) => t instanceof FormData, G = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, I = (t) => {
  const e = [], r = (s, a) => {
    e.push(`${encodeURIComponent(s)}=${encodeURIComponent(String(a))}`);
  }, i = (s, a) => {
    a != null && (a instanceof Date ? r(s, a.toISOString()) : Array.isArray(a) ? a.forEach((n) => i(s, n)) : typeof a == "object" ? Object.entries(a).forEach(([n, o]) => i(`${s}[${n}]`, o)) : r(s, a));
  };
  return Object.entries(t).forEach(([s, a]) => i(s, a)), e.length ? `?${e.join("&")}` : "";
}, B = (t, e) => {
  const r = encodeURI, i = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (a, n) => {
    var o;
    return (o = e.path) != null && o.hasOwnProperty(n) ? r(String(e.path[n])) : a;
  }), s = t.BASE + i;
  return e.query ? s + I(e.query) : s;
}, F = (t) => {
  if (t.formData) {
    const e = new FormData(), r = (i, s) => {
      u(s) || m(s) ? e.append(i, s) : e.append(i, JSON.stringify(s));
    };
    return Object.entries(t.formData).filter(([, i]) => i != null).forEach(([i, s]) => {
      Array.isArray(s) ? s.forEach((a) => r(i, a)) : r(i, s);
    }), e;
  }
}, d = async (t, e) => typeof e == "function" ? e(t) : e, M = async (t, e) => {
  const [r, i, s, a] = await Promise.all([
    // @ts-ignore
    d(e, t.TOKEN),
    // @ts-ignore
    d(e, t.USERNAME),
    // @ts-ignore
    d(e, t.PASSWORD),
    // @ts-ignore
    d(e, t.HEADERS)
  ]), n = Object.entries({
    Accept: "application/json",
    ...a,
    ...e.headers
  }).filter(([, o]) => o != null).reduce((o, [l, c]) => ({
    ...o,
    [l]: String(c)
  }), {});
  if (f(r) && (n.Authorization = `Bearer ${r}`), f(i) && f(s)) {
    const o = G(`${i}:${s}`);
    n.Authorization = `Basic ${o}`;
  }
  return e.body !== void 0 && (e.mediaType ? n["Content-Type"] = e.mediaType : m(e.body) ? n["Content-Type"] = e.body.type || "application/octet-stream" : u(e.body) ? n["Content-Type"] = "text/plain" : T(e.body) || (n["Content-Type"] = "application/json")), new Headers(n);
}, L = (t) => {
  var e, r;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (r = t.mediaType) != null && r.includes("+json") ? JSON.stringify(t.body) : u(t.body) || m(t.body) || T(t.body) ? t.body : JSON.stringify(t.body);
}, V = async (t, e, r, i, s, a, n) => {
  const o = new AbortController();
  let l = {
    headers: a,
    body: i ?? s,
    method: e.method,
    signal: o.signal
  };
  t.WITH_CREDENTIALS && (l.credentials = t.CREDENTIALS);
  for (const c of t.interceptors.request._fns)
    l = await c(l);
  return n(() => o.abort()), await fetch(r, l);
}, k = (t, e) => {
  if (e) {
    const r = t.headers.get(e);
    if (u(r))
      return r;
  }
}, z = async (t) => {
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
}, W = (t, e) => {
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
    throw new v(t, e, i);
  if (!e.ok) {
    const s = e.status ?? "unknown", a = e.statusText ?? "unknown", n = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new v(
      t,
      e,
      `Generic Error: status: ${s}; status text: ${a}; body: ${n}`
    );
  }
}, p = (t, e) => new H(async (r, i, s) => {
  try {
    const a = B(t, e), n = F(e), o = L(e), l = await M(t, e);
    if (!s.isCancelled) {
      let c = await V(t, e, a, o, n, l, s);
      for (const j of t.interceptors.response._fns)
        c = await j(c);
      const _ = await z(c), C = k(c, e.responseHeader);
      let R = _;
      e.responseTransformer && c.ok && (R = await e.responseTransformer(_));
      const g = {
        url: a,
        ok: c.ok,
        status: c.status,
        statusText: c.statusText,
        body: C ?? R
      };
      W(e, g), r(g.body);
    }
  } catch (a) {
    i(a);
  }
});
class J {
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoSubscriptionsApiV1GetActive() {
    return p(b, {
      method: "GET",
      url: "/umbraco/subscriptions/api/v1/GetActive"
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoSubscriptionsApiV1GetExpired() {
    return p(b, {
      method: "GET",
      url: "/umbraco/subscriptions/api/v1/GetExpired"
    });
  }
  /**
   * @returns unknown OK
   * @throws ApiError
   */
  static getUmbracoSubscriptionsApiV1GetNonsubscribed() {
    return p(b, {
      method: "GET",
      url: "/umbraco/subscriptions/api/v1/GetNonsubscribed"
    });
  }
}
var K = Object.defineProperty, Q = Object.getOwnPropertyDescriptor, w = (t) => {
  throw TypeError(t);
}, S = (t, e, r, i) => {
  for (var s = i > 1 ? void 0 : i ? Q(e, r) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (i ? n(e, r, s) : n(s)) || s);
  return i && s && K(e, r, s), s;
}, X = (t, e, r) => e.has(t) || w("Cannot " + r), Y = (t, e, r) => e.has(t) ? w("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), Z = (t, e, r) => (X(t, e, "access private method"), r), y, A;
let h = class extends x(N) {
  constructor() {
    super(), Y(this, y), Z(this, y, A).call(this);
  }
  render() {
    if (this.activeMembers)
      return E`<uui-box headline="Active Members">
			<uui-table>
				<uui-table-column></uui-table-column>
				<uui-table-column></uui-table-column>
				<uui-table-column></uui-table-column>
				<uui-table-head>
					<uui-table-head-cell>Name</uui-table-head-cell>
					<uui-table-head-cell>E-mail</uui-table-head-cell>
					<uui-table-head-cell>Subscription expire</uui-table-head-cell>
				</uui-table-head>
				${q(
        this.activeMembers,
        (t) => t.memberKey,
        (t) => E` <uui-table-row>
							<uui-table-cell>${t.firstName} ${t.lastName}</uui-table-cell>
							<uui-table-cell>${t.email}</uui-table-cell>
							<uui-table-cell>${t.subscriptionExpiry}</uui-table-cell>
						</uui-table-row>`
      )}
			</uui-table>
		</uui-box> `;
  }
};
y = /* @__PURE__ */ new WeakSet();
A = async function() {
  const { data: t } = await U(this, J.getUmbracoSubscriptionsApiV1GetActive());
  this.activeMembers = t;
};
h.styles = O`
		:host {
			display: grid;
			margin: var(--uui-size-layout-1);
		}
	`;
S([
  P()
], h.prototype, "activeMembers", 2);
h = S([
  D("fast-track-dashboard")
], h);
export {
  h as FastTrackDashboard,
  h as element
};
