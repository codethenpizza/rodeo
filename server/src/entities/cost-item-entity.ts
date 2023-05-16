import { CostItem } from '../types/graphql';
import { toFixedNumber } from '../helpers';
import { DBCostItem } from '../types';

export class CostItemEntity {
  constructor(
    private costItem: DBCostItem,
    private applyInvoiceDiscount: (price: number) => number,
    private applyPhaseDiscount: (price: number) => number,
  ) {}

  public getSubtotalBeforeTax(): number {
    return this.costItem.price * this.costItem.amount;
  }

  public toDto(): CostItem {
    return {
      ...this.costItem,
      finalPrice: toFixedNumber(this.calcFinalPrice()),
    };
  }

  private calcPriceWithTax(price: number): number {
    return price + price * (this.costItem.taxRate.rate / 100);
  }

  private calcFinalPrice(): number {
    const subtotalBeforeTax = this.getSubtotalBeforeTax();
    const priceWithPhaseDiscount = this.applyPhaseDiscount(subtotalBeforeTax);
    const priceWithInvoiceDiscount = this.applyInvoiceDiscount(
      priceWithPhaseDiscount,
    );
    return this.calcPriceWithTax(priceWithInvoiceDiscount);
  }
}
