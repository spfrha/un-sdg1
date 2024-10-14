import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

//17 SDGs information and colors
const goalData = [
  {
    name: 'No Poverty',
    color: '#e5243b',
    image: new URL('../lib/svgs/goal-1.svg', import.meta.url).href,
  },
  { name: 'Zero Hunger', color: '#dda63a' },
  { name: 'Good Health and Well-being', color: '#4c9f38' },
  { name: 'Quality Education', color: '#c5192d' },
  { name: 'Gender Equality', color: '#ff3a21' },
  { name: 'Clean Water and Sanitation', color: '#26bde2' },
  { name: 'Affordable and Clean Energy', color: '#fcc30b' },
  { name: 'Decent Work and Economic Growth', color: '#a21942' },
  { name: 'Industry, Innovation and Infrastructure', color: '#fd6925' },
  { name: 'Reduced Inequalities', color: '#dd1367' },
  { name: 'Sustainable Cities and Communities', color: '#fd9d24' },
  { name: 'Responsible Consumption and Production', color: '#bf8b2e' },
  { name: 'Climate Action', color: '#3f7e44' },
  { name: 'Life Below Water', color: '#0a97d9' },
  { name: 'Life on Land', color: '#56c02b' },
  { name: 'Peace, Justice and Strong Institutions', color: '#00689d' },
  { name: 'Partnerships for the Goals', color: '#19486a' },
];

export class unSdg2 extends DDDSuper(LitElement) {

  static get tag() {
    return "un-sdg2";
  }

  // Constructor method to initialize default properties
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
  // properties for the web part
  static get properties() {
    return {
      goal: { type: String },
      label: { type: String },
      alt: { type: String },
      source: { type: String },
      colorOnly: { type: Boolean, attribute: 'color-only' },
      height: { type: String },
      width: { type: String }
    };
  }
  // styles for the visual
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--un-sdg2-font-size, var(--ddd-font-size-s));
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      div {
        padding: 0;
        margin: 0;
      }
    `];
  }
  //method for when properties change
  updated(changedProperties) {
    if (changedProperties.has('goal')) {
      this.updateGoalImage();
      this.getColor();
    }
  }

  // Method to update the goal image
  updateGoalImage() {
    //If the goal is circle load a specific image
    if(this.goal === 'circle') {
      this.source = new URL('../lib/svgs/circle.png', import.meta.url).href;
      this.alt = 'Sustainable Development Goals Circle';
    }
    // If the goal is all load an image showing SDGs
    else if(this.goal === 'all') {
      this.source = new URL('../lib/svgs/all.png', import.meta.url).href;
      this.alt = 'All Sustainable Development Goals';
    }
    // load the image for the specific goal number
    else {
      const goalNumber = parseInt(this.goal);
      this.source = new URL(`../lib/svgs/goal-${goalNumber}.svg`, import.meta.url).href;
      this.alt = `Goal ${goalNumber}: ${goalData[goalNumber - 1].name}`;
    }
  }
  //set the color based on the goal if colorOnly is true
  getColor() {
    if (this.colorOnly === 'true') {
      const goalNumber = parseInt(this.goal);
      color = goalData[goalNumber - 1].color;
    }
  }

  //html render method for display
  render() {
    const imgSize = `--img-width: ${this.width}; --img-height: ${this.height};`;
    // html constructor
    return html`
      <img style=${imgSize}
        src="${this.source}"
        alt="${this.label || this.alt}"
        fetchpriority="low"
        loading="lazy"/>
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

globalThis.customElements.define(unSdg2.tag, unSdg2);