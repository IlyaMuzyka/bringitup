export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.triggers = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    bindTriggers() {
        this.triggers.forEach((trigger, i) => {
            try {
                const blockedElem = trigger.closest('.module__video-item').nextElementSibling;

                if(i % 2 == 0) {
                    blockedElem.setAttribute('data-disabled', 'true');
                }
            } catch(e) {}

            trigger.addEventListener('click', () => {
                if(!trigger.closest('.module__video-item') || trigger.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
                    this.activeTrigger = trigger;

                    if(document.querySelector('iframe#frame')) {
                        this.overlay.style.display = 'flex';

                        if(this.path !== trigger.getAttribute('data-url')) {
                            this.path = trigger.getAttribute('data-url');
                            this.player.loadVideoById({
                                videoId: this.path
                            });
                        }
                    } else {
                        this.path = trigger.getAttribute('data-url');
                        this.createPlayer(this.path);
                    }
                }
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        });
    }

    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            events: {
                'onStateChange': this.onPlayerStateChange
            }
        });

        this.overlay.style.display = 'flex';
    }

    onPlayerStateChange(state) {
        try {
            const playBtn = this.activeTrigger.querySelector('svg').cloneNode(true);

            const blockedElem = this.activeTrigger.closest('.module__video-item').nextElementSibling,
                  blockedBtnCircle = blockedElem.querySelector('.play__circle'),
                  blockedBtnLock = blockedElem.querySelector('svg'),
                  blockedBtnText = blockedElem.querySelector('.play__text');

            if(state.data === 0) {
                if(blockedBtnCircle.classList.contains('closed')) {
                    blockedBtnCircle.classList.remove('closed');
                    blockedBtnLock.remove();
                    blockedBtnCircle.appendChild(playBtn);
                    blockedBtnText.textContent = 'Play video';
                    blockedBtnText.classList.remove('.attention');
                    blockedElem.style.cssText = `
                        opacity: 1;
                        filter: none;
                    `;
                    blockedElem.setAttribute('data-disabled', 'false');
                }
            }
        } catch(e) {}
    }

    init() {
        if(this.triggers.length > 0) {
            const tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            this.bindTriggers();
            this.bindCloseBtn();
        }
    }
}