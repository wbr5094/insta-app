import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class InstaApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-app";
  }

  constructor() {
    super();
    this.currentIndex = 0;
    this.data = [];
    this.author = null;
  }

  static get properties() {
    return {
      ...super.properties,
      currentIndex: {type: Number},
      data: {type: Array},
      author: {type: Object}
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        gap: var(--ddd-spacing-2);
      }

      .slider {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .arrow {
        position: absolute;
        top: 50%;
        background: var(--ddd-theme-default-beaverBlue);
        color: white;
        border: none;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        cursor: pointer;
      }

      .left {
        left: -50px;
      }

      .right {
        right: -50px;
      }

      .arrow:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    `];
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadData();

    const params = new URLSearchParams(window.location.search);
    const index = parseInt(params.get("activeIndex"));
    if (!isNaN(index)) {
      this.currentIndex = index;
    }
  }

  async loadData() {
    const res = await fetch("./data.json");
    const json = await res.json();
    this.data = json.images;
    this.author = json.author;
  }

   updateURL() {
    const url = new URL(window.location);
    url.searchParams.set("activeIndex", this.currentIndex);
    window.history.replaceState({}, "", url);
  }

  next() {
  if (this.currentIndex < this.data.length - 1) {
    this.currentIndex++;
    this.updateURL();
  }
}

prev() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
    this.updateURL();
  }
}

_handleDotSelected(e) {
  this.currentIndex = e.detail.index;
  this.updateURL();
}

  render() {
  return html`
    <div class="wrapper">
      <div class = "slider">
      <button 
      class="arrow left"
      ?disabled="${this.currentIndex === 0}"
      @click="${this.prev}">
       ◀
      </button>

    ${this.data.length > 0 ? html`
      <insta-card
        .id="${this.data[this.currentIndex].id}"
        .image="${this.data[this.currentIndex].fullSize}"
        .title="${this.data[this.currentIndex].name}"
        .description="${this.data[this.currentIndex].description}"
        .author="${this.author}">
        </insta-card>
      ` : ""}

      <button 
      class="arrow right"
      ?disabled="${this.currentIndex === this.data.length - 1}"
      @click="${this.next}">
      ▶
      </button>
      </div>
        <playlist-indicator
          .total="${this.data.length}"
          .currentIndex="${this.currentIndex}"
          @dot-selected="${this._handleDotSelected}">
        </playlist-indicator>
      </div>
    `;
  }

}

globalThis.customElements.define(InstaApp.tag, InstaApp);