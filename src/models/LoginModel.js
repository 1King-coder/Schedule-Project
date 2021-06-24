const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

// Table Schema
const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

// Table model
const LoginModel = mongoose.model('users', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    };

    async login () {
        this.validate();
        if (this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });

        if(!this.user) {
            this.errors.push('User does not exists.');
            return;
        };

        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Invalid Password.');
            this.user = null;
            return;
        };
    };

    async register () {
        this.validate();
        await this.userExists();
        
        if (this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);


        this.user = await LoginModel.create(this.body);
        
    };
    
    async userExists () {
        this.user = await LoginModel.findOne({ email: this.body.email });
        if (this.user) this.errors.push('User already registered.');
    };

    validate () {
        // Validation
        this.cleanUp();
        // E-mail must be valid
        if (!validator.isEmail(this.body.email)) this.errors.push('Invalid E-mail.');

        // Password must have between 3 and 50 chars
        if (this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push('Invalid Password.');
        };


    };

    cleanUp () {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            };
        };

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }
};

module.exports = Login;
