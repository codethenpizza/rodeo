import { PhaseEntity } from './phase-entity';
import { Invoice, Phase } from '../types/graphql';
import { toFixedNumber } from '../helpers';
import { DBInvoice } from '../types';

export class InvoiceEntity {
  private phasesMap: Map<string, PhaseEntity>;

  constructor(private invoice: DBInvoice) {
    this.phasesMap = new Map(
      invoice.phases.map((phase) => [
        phase.id,
        new PhaseEntity(phase, this.applyInvoiceDiscount.bind(this)),
      ]),
    );
  }

  public toDto(): Invoice {
    const phases = Array.from(this.phasesMap.values()).map((phase) =>
      phase.toDto(),
    );

    return {
      ...this.invoice,
      totalPrice: toFixedNumber(this.calcInvoiceTotal(phases)),
      subtotalPrice: toFixedNumber(this.calcInvoiceSubtotal()),
      phases,
    };
  }

  private applyInvoiceDiscount(price: number): number {
    if (this.invoice.relativePriceDiscount) {
      return price - price * (this.invoice.relativePriceDiscount / 100);
    }
    if (this.invoice.fee) {
      return price + this.invoice.fee * (price / 100);
    }

    return price;
  }

  private calcInvoiceTotal(phases: Phase[]): number {
    return phases.reduce((acc, phase) => acc + phase.subtotal, 0);
  }

  private calcInvoiceSubtotal() {
    return Array.from(this.phasesMap.values()).reduce(
      (acc, phase) => acc + phase.getItemsTotalPrice(),
      0,
    );
  }
}
