// src/HiddenContent.ts
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('hidden-content')
export class HiddenContent extends LitElement {
  @state() private isVisible = false;
  @state() private hasClicked = false; // Track if the click has happened

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      text-align: center;
      position: relative;
    }

    .content {
      display: none;
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    .content.visible {
      display: block;
      opacity: 1;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(10px);  /* Blur effect */
      z-index: 2;
      cursor: pointer;
      transition: backdrop-filter 0.5s ease;
    }

    /* When content is visible, remove the overlay */
    .overlay.hidden {
      backdrop-filter: none;
    }

    ::slotted(*) {
      position: relative;
      z-index: 1;
    }
  `;

  private toggleVisibility() {
    if (!this.hasClicked) {
      this.isVisible = true; // Make content visible
      this.hasClicked = true; // Mark that the click has happened
    }
  }

  render() {
    return html`
      <div 
        @click="${this.toggleVisibility}" 
        class="overlay ${this.hasClicked ? 'hidden' : ''}"
      ></div>
      <div class="content ${this.isVisible ? 'visible' : ''}">
        <slot></slot>
      </div>
    `;
  }
}
