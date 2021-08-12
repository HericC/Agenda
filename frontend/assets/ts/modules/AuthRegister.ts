import validator from 'validator';
import FormElement from './FormElement';

export default class AuthRegister extends FormElement {
    protected check(e: Event): void {
        const el = e.target as HTMLFormElement;
        const nameInput = el.querySelector('input[name="nameRegister"]') as HTMLInputElement;
        const emailInput = el.querySelector('input[name="emailRegister"]') as HTMLInputElement;
        const passwordInput = el.querySelector('input[name="passwordRegister"]') as HTMLInputElement;

        let error = '';

        if (!nameInput.value) error += '\n- Nome requerido';
        if (!emailInput.value) error += '\n- E-mail requerido';
        if (!passwordInput.value) error += '\n- Senha requerido';
        if (!validator.isEmail(emailInput.value)) error += '\n- E-mail inválido';

        if (passwordInput.value.length < 3 || passwordInput.value.length > 50)
            error += '\n- A senha precisa ter entre 3 e 50 caracteres';

        if (error) {
            // eslint-disable-next-line no-alert
            alert(error);
        } else {
            el.submit();
        }
    }
}
