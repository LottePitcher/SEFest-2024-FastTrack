import { UMB_AUTH_CONTEXT as i } from "@umbraco-cms/backoffice/auth";
import { O as e } from "./OpenAPI-CppMC34i.js";
const p = async (t) => {
  t.consumeContext(i, async (o) => {
    if (!o) return;
    const n = o.getOpenApiConfiguration();
    e.BASE = n.base, e.TOKEN = n.token, e.WITH_CREDENTIALS = n.withCredentials, e.CREDENTIALS = n.credentials;
  });
};
export {
  p as onInit
};
