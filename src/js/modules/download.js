export default class Download {
    constructor(triggers) {
        this.triggers = document.querySelectorAll(triggers);
        this.path = 'assets/img/mainbg.jpg';
    }

    downloadClick(path) {
        const link = document.createElement('a');

        link.setAttribute('download', 'file');
        link.setAttribute('href', path);

        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    init() {
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                this.downloadClick(this.path);
            });
        });
    }
}
