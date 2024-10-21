import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

const goalData = [
  { name: 'Zero Hunger', color: 'var(--un-sdg-goal-2)' },
  { name: 'Good Health and Well-being', color: 'var(--un-sdg-goal-3)' },
  { name: 'Quality Education', color: 'var(--un-sdg-goal-4)' },
  { name: 'Gender Equality', color: 'var(--un-sdg-goal-5)' },
  { name: 'Clean Water and Sanitation', color: 'var(--un-sdg-goal-6)' },
  { name: 'Affordable and Clean Energy', color: 'var(--un-sdg-goal-7)' },
  { name: 'Decent Work and Economic Growth', color: 'var(--un-sdg-goal-8)' },
  { name: 'Industry, Innovation and Infrastructure', color: 'var(--un-sdg-goal-9)' },
  { name: 'Reduced Inequalities', color: 'var(--un-sdg-goal-10)' },
  { name: 'Sustainable Cities and Communities', color: 'var(--un-sdg-goal-11)' },
  { name: 'Responsible Consumption and Production', color: 'var(--un-sdg-goal-12)' },
  { name: 'Climate Action', color: 'var(--un-sdg-goal-13)' },
  { name: 'Life Below Water', color: 'var(--un-sdg-goal-14)' },
  { name: 'Life on Land', color: 'var(--un-sdg-goal-15)' },
  { name: 'Peace, Justice and Strong Institutions', color: 'var(--un-sdg-goal-16)' },
  { name: 'Partnerships for the Goals', color: 'var(--un-sdg-goal-17)' },
];

export class unSdg extends DDDSuper(LitElement) {

  static get tag() {
    return "un-sdg";
  }

  // setting default values for variables
  constructor() {
    super();
    this.goal = '1';
    this.label = '';
    this.alt = '';
    this.source = '';
    this.colorOnly = false;
    this.height = '254px';
    this.width = '254px';
  }

  // establishing variables
  static get properties() {
    return {
      title: { type: String },
      goal: { type: String },
      label: { type: String },
      alt: { type: String },
      source: { type: String },
      colorOnly: { type: Boolean, attribute: 'color-only', reflect: true },
      height: { type: String },
      width: { type: String }
    };
  }

  static get styles() {
    return [super.styles,
    css`

      /* styles applied to whole page */
      :host {
        --un-sdg-goal-1: rgb(235, 28, 44);
        --un-sdg-goal-2: rgb(210, 160, 42);
        --un-sdg-goal-3: rgb(44, 155, 72);
        --un-sdg-goal-4: rgb(194, 31, 51);
        --un-sdg-goal-5: rgb(239, 64, 42);
        --un-sdg-goal-6: rgb(0, 173, 216);
        --un-sdg-goal-7: rgb(253, 183, 19);
        --un-sdg-goal-8: rgb(143, 23, 55);
        --un-sdg-goal-9: rgb(243, 109, 36);
        --un-sdg-goal-10: rgb(224, 21, 131);
        --un-sdg-goal-11: rgb(249, 157, 37);
        --un-sdg-goal-12: rgb(207, 141, 42);
        --un-sdg-goal-13: rgb(72, 119, 61);
        --un-sdg-goal-14: rgb(0, 125, 187);
        --un-sdg-goal-15: rgb(63, 175, 73);
        --un-sdg-goal-16: rgb(1, 85, 138);
        --un-sdg-goal-17: rgb(25, 54, 103);

        display: inline-block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--un-sdg-font-size, var(--ddd-font-size-s));
      }

      /* creating and setting default values for image height and width based off constraints */
      img {
        height: var(--img-height, 254px);
        width: var(--img-width, 254px);
      }

      /* styling for when colorOnly is true */
      .color-only {
        height: 254px;
        width: 254px;
      }
    `];
  }

  // if the goal has changed, update the image and color
  updated(changedProperties) {
    if (changedProperties.has('goal')) {
      this.updateGoalImage();
    }
  }

  // looks at what goal is set to and sets the correct image and alt text accordingly
  updateGoalImage() {
    if(this.goal === 'circle') {
      this.source = new URL('../lib/svgs/circle.png', import.meta.url).href;
      this.alt = 'Sustainable Development Goals Circle';
    }
    else if(this.goal === 'all') {
      this.source = new URL('../lib/svgs/all.png', import.meta.url).href;
      this.alt = 'All Sustainable Development Goals';
    }
    else {
      const goalNumber = parseInt(this.goal);
      this.source = new URL(`../lib/svgs/goal-${goalNumber}.svg`, import.meta.url).href;
      this.alt = `Goal ${goalNumber}: ${goalData[goalNumber - 1].name}`;
    }
  }

  // render only the svg color if the selector is set
  renderColor() {
    if (this.colorOnly == true) {
      const goalNumber = parseInt(this.goal);
      if (goalNumber >= 1 && goalNumber <= 17) {
        const color = goalData[goalNumber - 1].color;
        return html`<div class="color-only" style="background-color: ${color};"></div>`;
      }
    }
  }

  // render the svg normally
  renderSVG() {
    // allows user to edit image height and width in html file
    const imgSize = `--img-width: ${this.width}; --img-height: ${this.height};`;

    // html constructor
    return html`
      <img style="${imgSize}"
        src="${this.source}"
        alt="${this.label || this.alt}"
        fetchpriority="low"
        loading="lazy"
      />
    `;
  }

  // deciode which render function to actually render
  render() {
    if (this.colorOnly == true) {
      return this.renderColor();
    }
    else {
      return this.renderSVG();
    }
  }

  // haxProperties integration via file reference
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(unSdg.tag, unSdg);