import validator from "validator";
import ErrorThreatment from "./ThreatErrors";

export default class LoginRegister {
    constructor (formClass) {
        this.form = document.querySelector(formClass);
        this.errors = [];
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

        if (!validator.isEmail(email.value)) this.errors.push({ input: email, msg: 'Invalid e-mail.' });
        if (password.value.length < 3 || password.value.length > 50) this.errors.push({ input: password, msg: 'Password must have 3-50 characteres.' });

        if (this.errors.length > 0) return this.errors = ErrorThreatment.throwErrors(this.errors);

        this.form.submit();
    };
};