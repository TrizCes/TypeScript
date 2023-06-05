import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesView } from '../views/negociacoes-view.js';
import { MensagemView } from '../views/mensagem-view.js';
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView("#negociacoesView");
        this.mensagemView = new MensagemView("#mensagemView");
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoesView.update(this.negociacoes);
    }
    ;
    adiciona() {
        if (this.inputData &&
            this.inputQuantidade &&
            this.inputValor) {
            const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
            if (!this.ehDiaUtil(negociacao.data)) {
                this.mensagemView.update('Apenas negociações em dias úteis são aceitas');
                return;
            }
            this.negociacoes.adiciona(negociacao);
            this.limparFormulario();
            this.atualizaView();
        }
        else {
            throw Error('Não foi possível adicionar negociação');
        }
    }
    ;
    ehDiaUtil(date) {
        return date.getDay() > DiasDaSemana.DOMINGO && date.getDay() < DiasDaSemana.SABADO;
    }
    limparFormulario() {
        if (this.inputData && this.inputQuantidade && this.inputValor) {
            this.inputData.value = '';
            this.inputQuantidade.value = '';
            this.inputValor.value = '';
            this.inputData.focus();
        }
    }
    atualizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("Negociação adicionada com sucesso!");
    }
}
