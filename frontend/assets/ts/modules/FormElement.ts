export default abstract class FormElement {
    form: HTMLFormElement;

    constructor(formId: string) {
        this.form = document.querySelector(formId) as HTMLFormElement;
    }

    public init(): void {
        if (this.form) this.events();
    }

    private events(): void {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.check(e);
        });
    }

    protected abstract check(e: Event): void;
}
