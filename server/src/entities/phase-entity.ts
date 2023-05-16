import { Phase, CostItem } from '../types/graphql';
import { CostItemEntity } from './cost-item-entity';
import { toFixedNumber } from '../helpers';
import { DBPhase } from '../types';

export class PhaseEntity {
  private itemsMap: Map<string, CostItemEntity>;

  constructor(
    private phase: DBPhase,
    private applyInvoiceDiscount: (price: number) => number,
  ) {
    this.itemsMap = new Map(
      phase.costItems.map((item) => [
        item.id,
        new CostItemEntity(
          item,
          applyInvoiceDiscount,
          this.applyPhaseDiscount.bind(this),
        ),
      ]),
    );
  }

  public getItemsTotalPrice(): number {
    return Array.from(this.itemsMap.values()).reduce((acc, item) => {
      acc += item.getSubtotalBeforeTax();
      return acc;
    }, 0);
  }

  public toDto(): Phase {
    const costItems = this.getCostItemsDto();

    return {
      ...this.phase,
      subtotal: toFixedNumber(this.calcSubtotal(costItems)),
      costItems,
    };
  }

  private calcPhaseFixedDiscountPerItem(itemSubtotalBeforeTax: number): number {
    const totalPrice = this.getItemsTotalPrice();
    const onePercent = totalPrice / 100;
    return this.phase.discount * (itemSubtotalBeforeTax / onePercent / 100);
  }

  private applyPhaseDiscount(price: number): number {
    if (this.phase.discount > 0) {
      return price - this.calcPhaseFixedDiscountPerItem(price);
    }

    if (this.phase.discount < 0) {
      return price + this.calcPhaseFixedDiscountPerItem(price);
    }

    return price;
  }

  private calcSubtotal(costItems: CostItem[]): number {
    return costItems.reduce((acc, item) => acc + item.finalPrice, 0);
  }

  private getCostItemsDto(): CostItem[] {
    return Array.from(this.itemsMap.values()).map((item) => item.toDto());
  }
}
