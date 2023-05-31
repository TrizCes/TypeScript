export class Negociacao {
  constructor(private _data: Date, public readonly quantidade: number, public readonly valor: number) {};

  get volume(): number{
    return this.quantidade * this.valor; 
  }

  get data(): Date{
    const data = new Date(this._data.getTime());
    return data;
  }

  //metodos não necessários devido ao emprego da propriedade readonly
  //Variavei do tipo Date podem ser atribuidas mesmo sendo readonly 
  //através da metodo :  data.setDate();
  /*
    get quantidade(): number{
    return this.quantidade;
  }
  get valor(): number{
    return this.valor;
  }
*/
}
