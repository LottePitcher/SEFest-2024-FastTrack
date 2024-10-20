import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { LitElement, css, customElement, html, repeat, state } from '@umbraco-cms/backoffice/external/lit';
import type { UmbDashboardElement } from '@umbraco-cms/backoffice/dashboard';
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import { SubscriptionsApiService, type SubscriptionListItem } from './api';

@customElement('fast-track-dashboard')
export class FastTrackDashboard extends UmbElementMixin(LitElement) implements UmbDashboardElement {
	//
	@state()
	activeMembers?: Array<SubscriptionListItem>;

	constructor() {
		super();

		this.#requestActiveMembers();
	}

	async #requestActiveMembers() {
		const { data } = await tryExecuteAndNotify(this, SubscriptionsApiService.getUmbracoSubscriptionsApiV1GetActive());
		this.activeMembers = data;
	}

	render() {
		if (!this.activeMembers) return;

		return html`<uui-box headline="Active Members">
			<uui-table>
				<uui-table-column></uui-table-column>
				<uui-table-column></uui-table-column>
				<uui-table-column></uui-table-column>
				<uui-table-head>
					<uui-table-head-cell>Name</uui-table-head-cell>
					<uui-table-head-cell>E-mail</uui-table-head-cell>
					<uui-table-head-cell>Subscription expire</uui-table-head-cell>
				</uui-table-head>
				${repeat(
					this.activeMembers,
					(member) => member.memberKey,
					(member) =>
						html` <uui-table-row>
							<uui-table-cell>${member.firstName} ${member.lastName}</uui-table-cell>
							<uui-table-cell>${member.email}</uui-table-cell>
							<uui-table-cell>${member.subscriptionExpiry}</uui-table-cell>
						</uui-table-row>`
				)}
			</uui-table>
		</uui-box> `;
	}

	static styles = css`
		:host {
			display: grid;
			margin: var(--uui-size-layout-1);
		}
	`;
}

export { FastTrackDashboard as element };
