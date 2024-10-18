import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import {
  LitElement,
  css,
  customElement,
  html,
  repeat,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import type { UmbDashboardElement } from "@umbraco-cms/backoffice/extension-registry";
import { UMB_MODAL_MANAGER_CONTEXT } from "@umbraco-cms/backoffice/modal";
import { UmbMemberCollectionRepository } from "@umbraco-cms/backoffice/member";

@customElement("fast-track-dashboard")
export class FastTrackDashboard
  extends UmbElementMixin(LitElement)
  implements UmbDashboardElement
{
  @state()
  activeMembers?: Array<any>;

  @state()
  expiredMembers?: Array<any>;

  constructor() {
    super();

    this.#requestActiveMembers();
    this.#requestExpiredMembers();
  }

  async #requestActiveMembers() {
    const repository = new UmbMemberCollectionRepository(this);
    const { data } = await repository.requestCollection({ skip: 0, take: 100 });
    this.activeMembers = data?.items;
  }

  async #requestExpiredMembers() {
    const repository = new UmbMemberCollectionRepository(this);
    const { data } = await repository.requestCollection({ skip: 0, take: 100 });
    this.expiredMembers = data?.items;
  }

  async #onOpenMember(member: any) {
    const modalContext = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
    const modalData = { member: member };
    modalContext.open(this, "Custom.Modal.Member", {
      data: modalData,
      modal: { type: "sidebar" },
    });
  }

  render() {
    return html`
      ${this.#renderActiveMembers()} ${this.#renderExpiredMembers()}
    `;
  }

  #renderActiveMembers() {
    if (!this.activeMembers) return;
    return html`<uui-box headline="Active Members">
      ${repeat(
        this.activeMembers,
        (member) => member.unique,
        (member) =>
          html`<uui-ref-node-member
            name=${member.variants[0].name}
            @open=${() => this.#onOpenMember(member)}
          ></uui-ref-node-member>`
      )}</uui-box
    >`;
  }

  #renderExpiredMembers() {
    if (!this.expiredMembers) return;
    return html`<uui-box headline="Expired Members">
      ${repeat(
        this.expiredMembers,
        (member) => member.unique,
        (member) =>
          html`<uui-ref-node-member
            name=${member.variants[0].name}
            @open=${() => this.#onOpenMember(member)}
          ></uui-ref-node-member>`
      )}</uui-box
    >`;
  }

  static styles = css`
    :host {
      display: grid;
      margin: var(--uui-size-layout-1);
      gap: var(--uui-size-layout-1);
      grid-template-columns: 1fr 1fr;
    }
  `;
}

export { FastTrackDashboard as element };
