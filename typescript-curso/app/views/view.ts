export abstract class View<T>{

  protected element: HTMLElement;

  constructor(selector: string){
    this.element = document.querySelector(selector);
  }

  protected abstract template(model: T): string;
  
  public update(model : T): void {
    const template = this.template(model);
    this.element.innerHTML = template;
  };

}
