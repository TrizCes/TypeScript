import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesView } from '../views/negociacoes-view.js';
import { MensagemView } from '../views/mensagem-view.js';
import { logarTempoDeExecucao } from '../decorators/logar-tempo-de-execucao.js';
import { inspect } from '../decorators/inspect.js';
import { domInjector } from '../decorators/dom-injector.js';
import { NegociacoesDoDia } from '../interfaces/negociacao-do-dia.js';
import { NegociacoesService } from '../services/negociacoes-service.js';

export class NegociacaoController {

  @domInjector("#data")
  private inputData: HTMLInputElement | null;
  @domInjector("#quantidade")
  private inputQuantidade: HTMLInputElement | null;
  @domInjector("#valor")
  private inputValor: HTMLInputElement | null;

  private negociacoes: Negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView("#negociacoesView");
  private mensagemView = new MensagemView("#mensagemView");
  private negociacoesService = new NegociacoesService();

  constructor() {
    /*
    this.inputData = document.querySelector('#data') as HTMLInputElement;
    this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
    this.inputValor = document.querySelector('#valor') as HTMLInputElement;
    */
    this.negociacoesView.update(this.negociacoes);
  };

  @inspect()
  @logarTempoDeExecucao()
  public adiciona(): void {
    if(this.inputData && 
      this.inputQuantidade &&
      this.inputValor){
        const negociacao = Negociacao.criaDe(
          this.inputData.value,
          this.inputQuantidade.value,
          this.inputValor.value
        );
        if(!this.ehDiaUtil(negociacao.data)){
          this.mensagemView.update('Apenas negociações em dias úteis são aceitas');
          return 
        }
          this.negociacoes.adiciona(negociacao);
          this.limparFormulario();
          this.atualizaView();
      }else{
        throw Error('Não foi possível adicionar negociação')
      }
  };

  private ehDiaUtil(date: Date){
    return date.getDay() > DiasDaSemana.DOMINGO && date.getDay() < DiasDaSemana.SABADO;
  }

  private limparFormulario():void{
    if(this.inputData && this.inputQuantidade && this.inputValor){
      this.inputData.value = '';
      this.inputQuantidade.value = '';
      this.inputValor.value = '';
      this.inputData.focus();
      }
  }

  private atualizaView(): void{
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update("Negociação adicionada com sucesso!");
  }

  public importarDados(): void {
    this.negociacoesService.obterNegociacoesDoDia().then(negociacoesDeHoje => {
      for(let negociacao of negociacoesDeHoje){
        this.negociacoes.adiciona(negociacao);
      }
      this.negociacoesView.update(this.negociacoes);
    });
  }
  
}
