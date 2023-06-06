import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";

export abstract class View<T>{

  protected element: HTMLElement;

  constructor(selector: string){
    const elemento = document.querySelector(selector) as HTMLElement;
    if (elemento){
    this.element = elemento;
    }else {
      throw new Error(`Seletor ${selector} não existe no dom`);
    }
  }

  protected abstract template(model: T): string;
  
  @inspect()
  @logarTempoDeExecucao(true)
  public update(model : T): void {
    let template = this.template(model);
    this.element.innerHTML = template;
  };
}
