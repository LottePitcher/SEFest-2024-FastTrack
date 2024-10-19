import type { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { OpenAPI } from './api/index.ts';

export const onInit: UmbEntryPointOnInit = async (host) => {
	host.consumeContext(UMB_AUTH_CONTEXT, async (auth) => {
		if (!auth) return;

		const umbOpenApi = auth.getOpenApiConfiguration();
		OpenAPI.BASE = umbOpenApi.base;
		OpenAPI.TOKEN = umbOpenApi.token;
		OpenAPI.WITH_CREDENTIALS = umbOpenApi.withCredentials;
		OpenAPI.CREDENTIALS = umbOpenApi.credentials;
	});
};
