export class MensagemView {
    constructor(selector) {
        this.element = document.querySelector(selector);
    }
    template(model) {
        return `
    <p class="alert alert-info"> 
    ${model}
    </p>
    `;
    }
    update(model) {
        const template = this.template(model);
        this.element.innerHTML = template;
    }
    ;
}
