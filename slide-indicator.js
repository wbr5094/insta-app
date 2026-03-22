/**
 * Copyright 2026 interested-learner
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `playlist-indicator`
 * 
 * @demo index.html
 * @element playlist-indicator
 */
export class PlaylistIndicator extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "playlist-indicator";
  }

  constructor() {
    super();
        this.total = 0;
        this.currentIndex = 0;
  }

  static get properties() {
    return {
      ...super.properties,
      total: { type: Number },
      currentIndex: { type: Number },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
      }
      .dots {
        display: flex;
        justify-content: center;
        gap: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-2);
        }
    .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--ddd-theme-default-beaverBlue);
    opacity: 0.4;
    cursor: pointer;
    }
    .dot.active {
    opacity: 1;
    }
        `];
  }

  render() {
    let dots = [];
    for (let i = 0; i < this.total; i++) {
      dots.push(html`
<span 
  class="dot ${i === this.currentIndex ? 'active' : ''}"
  @click="${() => this._dotClicked(i)}">
</span>        `);
    }
    return html`
      <div class="dots">
        ${dots}
      </div>`;
  }
  _dotClicked(index) {
  this.dispatchEvent(new CustomEvent("dot-selected", {
    bubbles: true,
    composed: true,
    detail: { index }
  }));
}

}

globalThis.customElements.define(PlaylistIndicator.tag, PlaylistIndicator);