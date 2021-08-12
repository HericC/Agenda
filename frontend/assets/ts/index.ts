import AuthRegister from './modules/AuthRegister';
import AuthLogin from './modules/AuthLogin';
import Contact from './modules/Contact';

const authRegister = new AuthRegister('#formRegister');
const authLogin = new AuthLogin('#formLogin');
const contact = new Contact('#formContact');

authRegister.init();
authLogin.init();
contact.init();
