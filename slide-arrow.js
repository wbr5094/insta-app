import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class PlayListArrow extends DDDSuper(I18NMixin(LitElement)) {

  static tag() {
    return "playlist-arrow";
  }
  
  static get properties() {
    return {
    currentIndex: { type: Number },
    total: { type: Number }
  };
}

  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: center;
        gap: 10px;
      }

      button {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: none;
        background: blue;
        color: white;
        cursor: pointer;
      }
    `;
  }
  render() {
  return html`
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