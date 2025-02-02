import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('photo-slideshow')
export class PhotoSlideshow extends LitElement {
	static styles = css`
		:host {
			display: block;
			// width: 100%;
			// height: 70vh;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.slideshow {
			position: relative;
			display: flex;
			max-height: 50vh;
			overflow: hidden;
			align-items: center;
			justify-content: center;
		}
		img {
			object-fit: contain;
			position: absolute;
			opacity: 0;
			transition: opacity 1s ease-in-out;
			border-radius: 15px;
			max-width: 100%;
			max-height: 100%;
		}
		img.active {
			opacity: 1;
			border-radius: 15pt;
		}

		
	`;

	@property({ type: Array }) images: string[] = [];
	@state() 
	private timer?: number;
	private currentIndex = 0;
	private aspectRatio = 1;

	constructor() {
		super();
	}

	connectedCallback() {
		super.connectedCallback();
		this.images = [];
		for (let i = 1; i <= 23; i++) {
			this.images.push(`/sam/${i}.jpg`);
		}
		this.loadImageAspectRatio();
		this.startTimer();
		this.addEventListener('click', this.handleClick);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		clearInterval(this.timer);
	}

	// Handle click event and determine if it's on the left or right side
	handleClick(event: MouseEvent) {
		const windowWidth = window.innerWidth;
		const clickPosition = event.clientX;
		
		// If click is on the left half of the window, go to the previous image
		if (clickPosition < windowWidth / 2) {
			this.prevImage();
		} else {
			// If click is on the right half of the window, go to the next image
			this.nextImage();	
		}
	}

	async loadImageAspectRatio() {
		const img = new Image();
		img.src = this.images[this.currentIndex];
		await img.decode();
		this.aspectRatio = img.naturalWidth / img.naturalHeight;
		this.requestUpdate();
	}

	startTimer() {
		clearInterval(this.timer);
		this.timer = setInterval(() => this.nextImage(),5000);
	}

	nextImage() {
		this.currentIndex = (this.currentIndex + 1) % this.images.length;
		this.loadImageAspectRatio();
		this.startTimer();
	}

	prevImage() {
		this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
		this.loadImageAspectRatio();
		this.startTimer();
	}

	render() {
		return html`
			<div class="slideshow" style="width: 80vh; height: calc(80vh / ${this.aspectRatio})">
					${this.images.map((src, index) => html`
						<img src="${src}" class="${index === this.currentIndex ? 'active' : ''}" />
					`)}
			</div>
		`;
	}
}