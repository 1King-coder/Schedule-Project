import validator from "validator";

export default class Register {
    constructor (formClass) {
        this.form = document.querySelector(formClass);
    };

    init () {
        this.events();
    };

    events () {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    };

    validate (e) {
        for (let errorText of this.form.querySelectorAll('.error')) errorText.remove();
        const el = e.target;
        const email = el.querySelector('[type="email"]');
        const password = el.querySelector('[type="password"]');

        if (!validator.isEmail(email.value)) return this.throwError(email, 'Invalid e-mail.');
        if (password.value.length < 3 || password.value.length > 50) return this.throwError(password, 'Password must have 3-50 characteres.')
    
        this.form.submit();
    };

    throwError (el, message) {
        const div = document.createElement('div');
        div.setAttribute('class', 'text-danger error');
        div.innerHTML = message;
        el.insertAdjacentElement('afterend', div);
    };
};