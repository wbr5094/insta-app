import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";


export class InstaApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-app";
  }

  constructor() {
    super();
    this.title = "";
    this.currentIndex = 0;
    this.slides = [];
    
    this.t = {
      ...this.t,
      title: "Title",
    };

    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/insta-app.ar.json", import.meta.url).href +
        "/../",
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      currentIndex: {type: Number},
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--ddd-spacing-2);
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      .slides {
        position: relative;
        display: flex;
        justify-content: center;
      }
    `];
  }

  // Lit render the HTML
  render() {
  return html`
    <div class="wrapper">
      <h3><span>${this.t.title}:</span> ${this.title}</h3>

      <playlist-arrow
        .currentIndex="${this.currentIndex}"
        .total="${this.slides.length}"
        @prev-clicked="${this.prev}"
        @next-clicked="${this.next}">
      </playlist-arrow>

      <div class="slides">
        <slot @slotchange="${this._handleSlotChange}"></slot>
        </div>

        <playlist-indicator
          .total="${this.slides.length}"
          .currentIndex="${this.currentIndex}"
          @dot-selected="${this._handleDotSelected}">
        </playlist-indicator>
      </div>
    `;
  }

_handleSlotChange(e) {
  this.slides = e.target.assignedElements({ flatten: true });
  this.currentIndex = 0;
  this._updateSlides();}



  next() {
  if (this.currentIndex < this.slides.length - 1) {
    this.currentIndex++;
    this._updateSlides();
  }
}

prev() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
    this._updateSlides();
  }
}

_handleDotSelected(e) {
  this.currentIndex = e.detail.index;
  this._updateSlides();
}

firstUpdated() {
  this._updateSlides();
}

_updateSlides() {
    if (!this.slides || this.slides.length === 0) return;

    this.slides.forEach((slide, i) => {
      slide.style.display = i === this.currentIndex ? "block" : "none";
    });

    this.dispatchEvent(new CustomEvent("play-list-index-changed", {
      bubbles: true,
      composed: true,
      detail: { index: this.currentIndex },
    }));
  }
}

globalThis.customElements.define(InstaApp.tag, InstaApp);