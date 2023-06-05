export class View {
    constructor(selector, escapar) {
        this.escapar = false;
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
        if (this.escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this.element.innerHTML = template;
    }
    ;
}
