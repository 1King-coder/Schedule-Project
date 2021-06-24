import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login'
import Register from './modules/Register';
import Contacts from './modules/Contacts';

const loginFormValidator = new Login('.form-login');
const registerFormValidator = new Register('.form-register');
const contactsFormValidator = new Contacts('form-register-contact');

loginFormValidator.init();
registerFormValidator.init();
contactsFormValidator.init();

