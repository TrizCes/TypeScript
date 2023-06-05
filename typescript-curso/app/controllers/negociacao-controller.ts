import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesView } from '../views/negociacoes-view.js';
import { MensagemView } from '../views/mensagem-view.js';

export class NegociacaoController {
  private inputData: HTMLInputElement;
  private inputQuantidade: HTMLInputElement;
  private inputValor: HTMLInputElement;
  private negociacoes: Negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView("#negociacoesView");
  private mensagemView = new MensagemView("#mensagemView");
  private readonly SABADO = 6;
  private readonly DOMINGO = 0;

  constructor() {
    this.inputData = document.querySelector('#data');
    this.inputQuantidade = document.querySelector('#quantidade');
    this.inputValor = document.querySelector('#valor');
    this.negociacoesView.update(this.negociacoes);
  };

  public adiciona(): void {
    const negociacao = this.criaNegociacao();
    if(!this.ehDiaUtil(negociacao.data)){
      this.mensagemView.update('Apenas negociações em dias úteis são aceitas');
      return 
    }
      this.negociacoes.adiciona(negociacao);
      this.limparFormulario();
      this.atualizaView();
  };

  private ehDiaUtil(date: Date){
    return date.getDay() > DiasDaSemana.DOMINGO && date.getDay() < DiasDaSemana.SABADO;
  }

  private criaNegociacao(): Negociacao {
    const exp = /-/g;
    const date: Date = new Date(this.inputData.value.replace(exp, ','));
    const quantidade: number = parseInt(this.inputQuantidade.value);
    const valor: number = parseFloat(this.inputValor.value);
    return new Negociacao(date, quantidade, valor);
  };

  private limparFormulario():void{
    this.inputData.value = '';
    this.inputQuantidade.value = '';
    this.inputValor.value = '';
    this.inputData.focus();
  }

  private atualizaView(): void{
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update("Negociação adicionada com sucesso!");
  }
}
