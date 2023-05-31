export class MensagemView {

  private element: HTMLElement;

  constructor(selector: string){
    this.element = document.querySelector(selector);
  }

  template(model : string): string {
    return `
    <p class="alert alert-info"> 
    ${model}
    </p>
    `;
  }

  update(model : string): void {
    const template = this.template(model);
    this.element.innerHTML = template;
  };

}
