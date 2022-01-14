export default class ShowInfo {
    constructor(triggers) {
        this.triggers = document.querySelectorAll(triggers);
    }

    init() {
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const content = trigger.closest('.module__info-show').nextElementSibling;
                
                content.classList.toggle('show');

                if(content.classList.contains('show')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = '0px';
                }
            });
        });
    }
}