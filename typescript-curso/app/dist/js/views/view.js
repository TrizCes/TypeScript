export class View {
    constructor(selector) {
        const elemento = document.querySelector(selector);
        if (elemento) {
            this.element = elemento;
        }
        else {
            throw new Error(`Seletor ${selector} não existe no dom`);
        }
    }
    update(model) {
        let template = this.template(model);
        this.element.innerHTML = template;
    }
    ;
}
//# sourceMappingURL=view.js.map