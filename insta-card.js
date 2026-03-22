import { html, css, LitElement } from 'lit';

export class InstaCard extends LitElement {
  static styles = css`
    .card {
      width: 300px;
      border: 1px solid #ccc;
      border-radius: 12px;
      padding: 10px;
      text-align: center;
    }

    img {
      width: 100%;
      border-radius: 10px;
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