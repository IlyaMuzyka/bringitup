export default class Forms {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.messages = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с Вами свяжемся.',
            failure: 'Что-то пошло не так :(',
        };
        this.inputs = document.querySelectorAll('input');
        this.path = 'assets/question.php';
    }

    async postData(url, data) {
        let result = await fetch(url, {
            method: 'POST',
            body: data
        });
    
        return await result.text();
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    phoneMask() {
        const setCursorPosition = (position, element) => {
            element.focus();
    
            if(element.setSelectionRange) {
                element.setSelectionRange(position, position);
            } else if(element.createTextRange) {
                let range = element.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', position);
                range.moveStart('character', position);
                range.select();
            }
        };
    
        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
    
            if(def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
    
            if(event.type === 'blur') {
                if(this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    
        const inputs = document.querySelectorAll('[name="phone"]');
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    checkEmailInputs() {
        const emailInputs = document.querySelectorAll('[type="email"]');

        emailInputs.forEach(emailInput => {
            emailInput.addEventListener('keypress', function(e) {
                if(e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    init() {
        this.checkEmailInputs();
        this.phoneMask();

        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    font-size: 18px;
                    color: #9ec73d;
                    margin-top: 20px;
                `;
                form.parentNode.appendChild(statusMessage);
                statusMessage.textContent = this.messages.loading;

                const formData = new FormData(form);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.messages.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.messages.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000);
                    });
            });
        });
    }
}