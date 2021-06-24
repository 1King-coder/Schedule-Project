import validator from "validator";

export default class Contacts {
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
        const name = el.querySelector('[name="name"]');

        if (email.value && !validator.isEmail(email.value)) return this.throwError(email, 'Invalid e-mail.');
        if (!name.value) return this.throwError(name, 'Name is required');

        this.form.submit();
    };

    throwError (el, message) {
        const div = document.createElement('div');
        div.setAttribute('class', 'text-danger error');
        div.innerHTML = message;
        el.insertAdjacentElement('afterend', div);
    };
};