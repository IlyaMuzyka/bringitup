export default class Difference {
    constructor(oldOfficer, newOfficer, items) {
        try {
            this.oldOfficer = document.querySelector(oldOfficer);
            this.newOfficer = document.querySelector(newOfficer);
            this.oldItems = this.oldOfficer.querySelectorAll(items);
            this.newItems = this.newOfficer.querySelectorAll(items);
            this.oldPlus = this.oldOfficer.querySelector('.plus');
            this.newPlus = this.newOfficer.querySelector('.plus');
            this.oldCounter = 0;
            this.newCounter = 0;
        } catch(e) {}
    }

    bindTriggers(plus, items, counter) {
        plus.addEventListener('click', () => {
            if(counter !== items.length - 2) {
                items[counter].style.display = 'flex';
                counter++;
            } else {
                items[counter].style.display = 'flex';
                items[items.length - 1].remove();
            }
        });
    }

    hideItems(items) {
        items.forEach((item, i, arr) => {
            if(i !== arr.length - 1) {
                item.style.display = 'none';
            }
        });
    }

    init() {
        try {
            this.hideItems(this.oldItems);
            this.hideItems(this.newItems);
            this.bindTriggers(this.oldPlus, this.oldItems, this.oldCounter);
            this.bindTriggers(this.newPlus, this.newItems, this.newCounter);
        } catch(e) {}
    }
}