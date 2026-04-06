import { html, css, LitElement } from 'lit';

export class InstaCard extends LitElement {
  static properties = {
    image: { type: String },
    title: { type: String },
    description: { type: String },
    author: {type: Object},
    liked: {type: Boolean},
    id: {type: Number}
  };

  constructor() {
    super();
    this.liked = false;
  }

  updated(changedProps) {
    if (changedProps.has("id")) {
      const saved = localStorage.getItem("like-" + this.id);
      this.liked = saved == "true";
    }
  }
  toggleLike() {
    this.liked = !this.liked;
    localStorage.setItem("like-" + this.id, this.liked);
  }

  static styles = css`
    .card {
      width: 500px;
      height: 700px;
      border: 1px solid #ccc;
      border-radius: 16px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .like-row {
      margin-top: auto;
      display: flex;
      justify-content: flex-start;
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
      width: 75px;
      height: 75px;
      border-radius: 50%;
    }

    .author-name {
      font-weight: bold;
      font-size: 20px;
    }

    button {
      background: none;
      border: none;
      font-size: 30px;
      cursor: pointer;
    }

    .image-container {
      width: 100%;
      height: 450px;
      overflow: hidden;
      border-radius: 12px;
    }

    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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

      <div class="image-container">
        <img src="${this.image}" loading="lazy" />
      </div>
        <p><strong>${this.title}</strong></p>
        <p>${this.description}</p>

        <div class="like-row">
          <button @click="${this.toggleLike}">
            ${this.liked ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("insta-card", InstaCard);