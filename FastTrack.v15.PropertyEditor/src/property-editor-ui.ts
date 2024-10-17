import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UmbChangeEvent } from "@umbraco-cms/backoffice/event";
import {
  LitElement,
  css,
  customElement,
  html,
  property,
  repeat,
  state,
  type PropertyValueMap,
} from "@umbraco-cms/backoffice/external/lit";
import type { UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/extension-registry";
import type { UmbPropertyEditorConfigCollection } from "@umbraco-cms/backoffice/property-editor";
import type { UUIInputEvent } from "@umbraco-cms/backoffice/external/uui";

@customElement("fast-track-member-expire")
export class FastTrackPropertyEditor
  extends UmbElementMixin(LitElement)
  implements UmbPropertyEditorUiElement
{
  @property({ attribute: false })
  config?: UmbPropertyEditorConfigCollection;

  @property()
  value?: string;

  @state()
  _statusLabel?: string;

  protected updated(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (changedProperties.has("value") || changedProperties.has("config")) {
      this.#setStatusForDate();
    }
  }

  #setStatusForDate() {
    if (!this.config) return;

    if (this.value) {
      const valueDate = new Date(this.value);
      if (valueDate > new Date()) {
        this._statusLabel = this.config?.getValueByAlias("activeLabel");
      } else {
        this._statusLabel = this.config?.getValueByAlias("expiredLabel");
      }
    } else {
      this._statusLabel = this.config?.getValueByAlias("emptyLabel");
    }
  }

  #onChange(event: UUIInputEvent) {
    this.value = event.target.value as string;
    console.log(this.value);
    this.dispatchEvent(new UmbChangeEvent());
  }

  #addMonths(months: string) {
    const monthsAsInt = parseInt(months);
    if (!this.value || !monthsAsInt) return;
    const valueAsDate = new Date(this.value);
    valueAsDate.setMonth(valueAsDate.getMonth() + monthsAsInt);
    this.value = valueAsDate.toLocaleDateString();
    console.log(this.value);
    this.dispatchEvent(new UmbChangeEvent());
  }

  render() {
    return html`
      <div>
        <uui-input
          type="date"
          .value=${this.value ?? ""}
          @change=${this.#onChange}
        ></uui-input>

        <span class="date-picker-status">${this._statusLabel}</span>
      </div>
      <div>${this.#renderAddOptions()}</div>
    `;
  }

  #renderAddOptions() {
    const addOptions = this.config
      ?.getValueByAlias<string>("addMonthsButtons")
      ?.split(",");
    if (addOptions) {
      return repeat(
        addOptions,
        (option) => html`
          <uui-button look="secondary" @click=${() => this.#addMonths(option)}>
            Add ${option} months
          </uui-button>
        `
      );
    }
  }

  static styles = css`
    :host {
      display: grid;
      row-gap: 10px;
    }
  `;
}

export { FastTrackPropertyEditor as element };
