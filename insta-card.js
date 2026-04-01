import { html, css, LitElement } from 'lit';

export class InstaCard extends LitElement {
  static properties = {
    image: { type: String },
    title: { type: String },
    description: { type: String },
    author: {type: Object},
    liked: {type: Boolean}
  };

  constructor() {
    super();
    this.liked = false;
  }

  connectedCallback() {
    super.connectedCallback();
    const saved = localStorage.getItem(this.title);
    this.liked = saved == "true";
  }

  toggleLike() {
    this.liked = !this.lliked;
    localStorage.setItem(this.title, this.liked);
  }

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

    .author {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
      justify-content: flex-start;
    }

    .author img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }

    .author-name {
      font-weight: bold;
      font-size: 14px;
    }

    button {
      margin-top: 8px;
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
    }
  `;

  render() {
    return html`
      <div class="card">

        ${this.author ? html`
          <div class="author">
            <img src="${this.author.image}">
          <div class="author-name">${this.author.name}</div>
          </div>
        ` : ""}

        <img src="${this.image}" loading="lazy" />

        <p><strong>${this.title}</strong></p>
        <p>${this.description}</p>

        <button @click="${this.toggleLike}">
          ${this.liked ? "❤️" : "🤍"}
        </button>

      </div>
    `;
  }
}

customElements.define("insta-card", InstaCard);