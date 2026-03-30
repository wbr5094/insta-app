import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class PlayListArrow extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "playlist-arrow";
  }

  constructor() {
    super();
  }

  // Lit reactive properties
static get properties() {
  return {
    ...super.properties,
    currentIndex: { type: Number },
    total: { type: Number }
  };
}
  // Lit scoped styles
static get styles() {
  return [super.styles, css`
    :host {
      display: block;
    }

    .wrapper {
      display: flex;
      justify-content: center;
      gap: var(--ddd-spacing-2);
      margin-top: var(--ddd-spacing-2);
    }

    button {
      background-color: var(--ddd-theme-default-beaverBlue);
      color: white;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 16px;
    }

    button:hover {
      opacity: 0.8;
    }
  `];
}
  // Lit render the HTML
  render() {
  return html`
    <div class="wrapper">
      <button 
        ?disabled="${this.currentIndex === 0}"
        @click="${this._prev}">
        ◀
      </button>

      <button 
        ?disabled="${this.currentIndex === this.total - 1}"
        @click="${this._next}">
        ▶
      </button>
    </div>
  `;
}
_prev() {
  this.dispatchEvent(new CustomEvent('prev-clicked', {
    bubbles: true,
    composed: true
  }));
}

_next() {
  this.dispatchEvent(new CustomEvent('next-clicked', {
    bubbles: true,
    composed: true
  }));
}

}

globalThis.customElements.define(PlayListArrow.tag, PlayListArrow);