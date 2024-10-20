import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { UmbChangeEvent } from '@umbraco-cms/backoffice/event';
import { LitElement, css, customElement, html, property, repeat, state } from '@umbraco-cms/backoffice/external/lit';
import type { UUIInputEvent } from '@umbraco-cms/backoffice/external/uui';
import type {
	UmbPropertyEditorConfigCollection,
	UmbPropertyEditorUiElement,
} from '@umbraco-cms/backoffice/property-editor';

@customElement('fast-track-subscription-expire')
class FastTrackPropertyEditor extends UmbElementMixin(LitElement) implements UmbPropertyEditorUiElement {
	//
	@property({ attribute: false })
	config?: UmbPropertyEditorConfigCollection;

	@property()
	value?: string;

	@state()
	private _statusLabel?: string;

	protected updated(changedProperties: Map<string, unknown>) {
		super.updated(changedProperties);
		if (changedProperties.has('value') || changedProperties.has('config')) {
			this.#setStatusForDate();
		}
	}

	#setStatusForDate() {
		if (!this.config) return;

		if (this.value) {
			const valueDate = new Date(this.value);
			if (valueDate > new Date()) {
				this._statusLabel = this.config.getValueByAlias('activeLabel');
			} else {
				this._statusLabel = this.config.getValueByAlias('expiredLabel');
			}
		} else {
			this._statusLabel = this.config.getValueByAlias('emptyLabel');
		}
	}

	#onChange(event: UUIInputEvent) {
		const newValue = event.target.value.toString() + ' 00:00:00';
		if (isNaN(new Date(newValue).getTime())) {
			return;
		}
		this.value = newValue;
		this.dispatchEvent(new UmbChangeEvent());
	}

	#addMonths(months: string) {
		const monthsAsInt = parseInt(months);
		if (!this.value || !monthsAsInt) return;

		const valueAsDate = new Date(this.value);
		valueAsDate.setMonth(valueAsDate.getMonth() + monthsAsInt);

		const year = valueAsDate.getFullYear();
		const month = (valueAsDate.getMonth() + 1).toString().padStart(2, '0');
		const day = valueAsDate.getDate().toString().padStart(2, '0');

		this.value = `${year}-${month}-${day} 00:00:00`;
		this.dispatchEvent(new UmbChangeEvent());
	}

	render() {
		return html` <div>
				<uui-input type="date" value=${(this.value ?? '').split(' ')[0]} @change=${this.#onChange}></uui-input>

				<span>${this._statusLabel}</span>
			</div>
			<div>${this.#renderAddMonthOptions()}</div>`;
	}

	#renderAddMonthOptions() {
		const addOptions = this.config?.getValueByAlias<string>('addMonthsButtons')?.split(',');
		if (addOptions) {
			return repeat(
				addOptions,
				(option) => html`
					<uui-button
						look="secondary"
						label="Add ${option} months"
						@click=${() => this.#addMonths(option)}></uui-button>
				`
			);
		}
	}

	static styles = css`
		:host {
			display: grid;
			row-gap: var(--uui-size-layout-1);
		}
	`;
}

export { FastTrackPropertyEditor as element };
