import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);

            if(this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if(!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }

        if(this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        for(let i = 1; i < this.slides.length; i++) {
            if(this.slides[i].tagName !== 'BUTTON') {
                this.container.appendChild(this.slides[0]);
                this.decorizeSlides();
                break;
            } else {
                this.container.appendChild(this.slides[i]);
                i--;
            }
        }
    }

    bindTriggers() {
        this.next.forEach(btn => {
            btn.addEventListener('click', () => this.nextSlide());
        });

        this.prev.forEach(btn => {
            btn.addEventListener('click', () => {
                for(let i = this.slides.length - 1; i > 0; i--) {
                    if(this.slides[i].tagName !== 'BUTTON') {
                        let active = this.slides[i];
                        this.container.insertBefore(active, this.slides[0]);
                        this.decorizeSlides();
                        break;
                    }
                }
            });
        });
    }

    startAutoplay() {
        const autoplay = setInterval(() => {
            this.nextSlide();
        }, 5000);

        this.container.addEventListener('mouseenter', () => {
            clearInterval(autoplay);
        });

        this.next.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                clearInterval(autoplay);
            });
        });

        this.prev.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                clearInterval(autoplay);
            });
        });
    }

    init() {
        try {
            this.container.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                align-items: flex-start;
            `;

            this.bindTriggers();
            this.decorizeSlides();

            if(this.autoplay) {
                this.startAutoplay();

                this.container.addEventListener('mouseleave', () => {
                    this.startAutoplay();
                });

                this.next.forEach(btn => {
                    btn.addEventListener('mouseleave', () => {
                        this.startAutoplay();
                    });
                });

                this.prev.forEach(btn => {
                    btn.addEventListener('mouseleave', () => {
                        this.startAutoplay();
                    });
                });
            }
        } catch(e) {}
    }
}