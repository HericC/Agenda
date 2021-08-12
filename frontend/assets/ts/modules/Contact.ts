import validator from 'validator';
import FormElement from './FormElement';

export default class Contact extends FormElement {
    protected check(e: Event): void {
        const el = e.target as HTMLFormElement;
        const firstNameInput = el.querySelector('input[name="firstNameRegister"]') as HTMLInputElement;
        const emailInput = el.querySelector('input[name="emailRegister"]') as HTMLInputElement;
        const phoneInput = el.querySelector('input[name="phoneRegister"]') as HTMLInputElement;

        let error = '';

        if (!firstNameInput.value) error += '\n- Nome requerido';
        if (!emailInput.value && !phoneInput.value)
            error += '\n- Pelo menos um contato precisa ser enviado: E-mail ou Telefone';
        if (emailInput.value && !validator.isEmail(emailInput.value)) error += '\n- E-mail inválido';

        if (error) {
            // eslint-disable-next-line no-alert
            alert(error);
        } else {
            el.submit();
        }
    }
}
