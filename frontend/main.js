import 'core-js/stable';
import 'regenerator-runtime/runtime';

import LoginRegister from './modules/Login';
import Contacts from './modules/Contacts';

const loginFormValidator = new LoginRegister('.form-login');
const registerFormValidator = new LoginRegister('.form-register');
const contactsFormValidator = new Contacts('.form-register-contact');

loginFormValidator.init();
registerFormValidator.init();
contactsFormValidator.init();
