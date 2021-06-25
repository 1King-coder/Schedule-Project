import validator from "validator";
import ErrorThreatment from "./ThreatErrors";

export default class Contacts {
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
        const name = el.querySelector('[name="name"]');
        
        if (email.value && !validator.isEmail(email.value)) this.errors.push({ input: email, msg: 'Invalid e-mail.' });
        if (!name.value) this.errors.push({ input: name, msg: 'Name is required' });
        
        
        if (this.errors.length > 0) return this.errors = ErrorThreatment.throwErrors(this.errors);


        this.form.submit();
    };

};