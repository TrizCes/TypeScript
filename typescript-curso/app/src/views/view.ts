import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";

export abstract class View<T>{

  protected element: HTMLElement;
  private escapar = false;

  constructor(selector: string, escapar?: boolean){
    const elemento = document.querySelector(selector) as HTMLElement;
    if (elemento){
    this.element = elemento;
    }else {
      throw new Error(`Seletor ${selector} não existe no dom`);
      
    }
  }

  protected abstract template(model: T): string;
  
  @logarTempoDeExecucao()
  public update(model : T): void {
    let template = this.template(model);
    if(this.escapar){
      template = template.replace(/<script>[\s\S]*?<\/script>/, '');
    }
    this.element.innerHTML = template;
    
  };

}
