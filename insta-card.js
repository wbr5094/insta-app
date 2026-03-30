import { html, css, LitElement } from 'lit';

export class InstaCard extends LitElement {
  static styles = css`
    .card {
      width: 300px;
      border: var(--ddd-border-md);
      border-radius: var(--ddd-radius-lg);
      padding: var(--ddd-spacing-3);

      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--ddd-spacing-2);
    }

    img {
      width: 100%;
      max-width: 250px;
      border-radius: var(--ddd-radius-md);
      display: block;
    }

    a {
      color: var(--ddd-theme-primary);
    }
  `;

  static properties = {
    image: { type: String },
    link: { type: String }
  };

  constructor() {
    super();
    this.image = '';
    this.link = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.getFox();
  }

  async getFox() {
    const resp = await fetch("https://randomfox.ca/floof/");
    const data = await resp.json();

    this.image = data.image;
    this.link = data.link;
  }

  render() {
    return html`
      <div class="card">
        ${this.image ? html`<img src="${this.image}" alt="fox" />` : ''}
        <p><a href="${this.link}" target="_blank">View Source</a></p>
        <button @click="${this.getFox}">New Fox</button>
      </div>
    `;
  }
}

customElements.define('insta-card', InstaCard);