import validator from 'validator';
import FormElement from './FormElement';

export default class AuthLogin extends FormElement {
    protected check(e: Event): void {
        const el = e.target as HTMLFormElement;
        const emailInput = el.querySelector('input[name="emailLogin"]') as HTMLInputElement;
        const passwordInput = el.querySelector('input[name="passwordLogin"]') as HTMLInputElement;

        let error = '';

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
