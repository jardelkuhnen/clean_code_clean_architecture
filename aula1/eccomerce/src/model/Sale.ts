import Item from "./Item";


export default class Sale {
    totalSale = 0.0;

    constructor(
            readonly cpf: string,
            readonly itens: Item[], 
            readonly priceTransport: number, 
            readonly taxValue: number, 
            readonly discount: number){
        this.cpf = cpf;
        this.itens = itens;
        this.priceTransport = priceTransport;
        this.taxValue = taxValue;
        this.discount = discount;
        this.totalSale = totalSale(itens, discount, priceTransport, taxValue);
    }
}

function totalSale(itens: Item[], discount: number, priceTransport: number, taxValue: number): number {
    let totalItens = 0.0;
    itens.forEach(item => {
        totalItens += item.amount * item.price;
    });
    totalItens += priceTransport += taxValue;
    return totalItens - (totalItens * (discount/100));
}