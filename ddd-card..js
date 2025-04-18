import{LitElement, html, css} from 'lit';
import { DDDCard } from '@haxtheweb/d-d-d/d-d-d.js';
import { I18NMixin } from '@haxtheweb/i18n-manager/lib/I18NMixin.js';

export class DddCard extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return 'ddd-card';
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      image: { type: String, attribute: 'data-image' },
      line: { type: String },
      link: { type: String },
      dddPrimary: { type: String, attribute: 'ddd-priamry' },
      dddAccent: { type: String, attribute: 'ddd-accent' },
    };
  }
  constructor() {
    super();
    this.title = '';
    this.image = '';
    this.line = '';
    this.link = '#';
    this.dddPrimary = '';
    this.dddAccent = '';
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: 'Title',
      explore: 'Explore',
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL('./locales/ddd-card.ar.json', import.meta.url).href + '/../',
      locales: ['ar', 'es', 'hi', 'zh'],
    });
  }
  static get styles() {
    return css`
      .card {
        border: 1px solid #ccc;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        max-width: 300px;
      }

      .card-image img {
        width: 100%;
        height: auto;
        display: block;
      }

      .color-bar {
        height: 5px;
        background-color: var(--ddd-theme-primary);
      }

      .card-content {
        padding: 1rem;
      }

      h3 {
        margin-top: 0;
      }

      .explore-btn {
        margin-top: 1rem;
        display: inline-block;
        padding: 10px;
        background-color: var(--ddd-theme-default-beaverBlue, #005fa2);
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      }
    `;
  }

  render() {
    return html`
      <div class="card">
        <div class="card-image">
          <img src="${this.image}" alt="${this.title}">
        </div>
        <div class="color-bar" style="background-color: var(--ddd-theme-primary-${this.dddPrimary}, var(--ddd-theme-primary))"></div>
        <div class="card-content">
          <h3>${this.title}</h3>
          <div class="description">
            <slot></slot>
          </div>
          <a href="${this.link}" class="explore-btn">${this.t.explore} ›</a>
        </div>
      </div>
    `;
  }
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

customElements.define(DddCard.tag, DddCard);