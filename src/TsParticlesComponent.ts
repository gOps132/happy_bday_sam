// src/TsParticlesComponent.ts
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { tsParticles } from '@tsparticles/engine';

@customElement('ts-particles-component')
export class TsParticlesComponent extends LitElement {
    static styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
    }
    #tsparticles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  `;

    firstUpdated() {
        // Wait for the component to render and then initialize tsParticles in the #tsparticles container
        const particlesContainer = this.shadowRoot?.getElementById('tsparticles');

        if (particlesContainer) {
            tsParticles.load({
                id: "tsparticles",
                options: {
                  preset: "confetti",
                },
              })
            .then((container) => {
                // container is the particles container instance
                console.log('tsParticles loaded', container);
              })
              .catch((error) => {
                console.error('tsParticles error', error);
              });
        }
    }

    render() {
        return html`
            <!-- This div is used as the container for tsParticles -->
            <div id="tsparticles"></div>
            <!-- You can include other content here if needed -->
            <slot></slot>
    `;
    }
}
