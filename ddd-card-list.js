/**
 * Copyright 2025 Olivia Sarsfield
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `ddd-card-list`
 * 
 * @demo index.html
 * @element ddd-card-list
 */
export class DddCardList extends DDDSuper(LitElement)
{
  static get tag() {
    return "ddd-card-list";
  }

  constructor() {
    super();
    this.title = "";
    this.dddPrimary = "";
    this.dddAccent = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ddd-card-list.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      dddPrimary: { type: String, attribute: "ddd-primary" },
      dddAccent: { type: String, attribute: "ddd-accent" },
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
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 {
        margin: 0 0 var(--ddd-spacing=4) var(--ddd-spacing-2);
        color: var(ddd-theme-default);
        font-size: var(--ddd-card-list-label-font-size, var(--ddd-font-size-s));
      }
      h3 span{
        font-size: var(---ddd-font-size-s);
        font-weight: bold;
        color: var(-ddd-theme-primary);
      }
      .card-container
      {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--ddd-spacing-2);
        padding: 0 var(--ddd-spacing-2);
      }
    `];
  }

  // Lit render the HTML
  render() 
  {
    const slottedCards = Array.from(this.children)
    .filter((child) => child.tagName === "DDD-CARD")
    .map((child)=> 
    {
      const clone = child.cloneNode(true);
      if(this.dddPrimary)
      {
        clone.setAttribute("ddd-primary", this.dddPrimary);
      }
      return clone;
    });
    return html`
    <div class="wrapper">
      <h3><span>${this.t.title}:</span> ${this.title}</h3>
      <div class="card-container">
        ${slottedCards}
      </div>
    </div>
      `;
  }
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(DddCardList.tag, DddCardList);