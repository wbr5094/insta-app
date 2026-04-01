import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class PlaylistIndicator extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "playlist-indicator";
  }

  static get properties() {
    return {
      total: { type: Number },
      currentIndex: { type: Number },
    };
  }

    constructor() {
    super();
        this.total = 0;
        this.currentIndex = 0;
  }

  static get styles() {
    return css`
      .dots {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 10px;
      }

    .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: gray;
    opacity: 0.4;
    cursor: pointer;
    }
    .dot.active {
    opacity: 1;
    background: blue;
    }
        `;
  }

  render() {
    return html`
      <div class="dots">
        ${Array.from({ length: this.total }, (_, i) => html`
          <span 
            class="dot ${i === this.currentIndex ? 'active' : ''}"
            @click="${() => this._dotClicked(i)}">
          </span>
        `)}
      </div>
    `;
  }

  _select(index) {
    this.dispatchEvent(new CustomEvent("dot-selected", {
      bubbles: true,
      composed: true,
      detail: { index }
    }));
  }
}

globalThis.customElements.define(PlaylistIndicator.tag, PlaylistIndicator);