import { InvoiceEntity } from '../../src/entities/invoice-entity';
import {
  costItemFactory,
  invoiceFactory,
  phaseFactory,
} from '../mocks/invoice';

describe('Invoice entity', () => {
  it('should calc prices correctly over phases without tax or discounts', () => {
    const rawInvoice = invoiceFactory.build({
      fee: 0,
      relativePriceDiscount: 0,
      phases: phaseFactory.buildList(2, {
        discount: 0,
        costItems: costItemFactory.buildList(2, {
          amount: 1,
          price: 100,
          taxRate: {
            rate: 0,
          },
        }),
      }),
    });
    const invoice = new InvoiceEntity(rawInvoice).toDto();

    expect(invoice.totalPrice).toBe(400);
    expect(invoice.subtotalPrice).toBe(400);

    // make sure phase calculated well
    expect(invoice.phases[0].subtotal).toBe(200);
    expect(invoice.phases[1].subtotal).toBe(200);

    // make sure item calculated well
    expect(invoice.phases[0].costItems[0].finalPrice).toBe(100);
  });

  it('should calc prices correctly over phases without taxes, with invoice discount', () => {
    const rawInvoice = invoiceFactory.build({
      fee: 0,
      relativePriceDiscount: 10,
      phases: phaseFactory.buildList(2, {
        discount: 0,
        costItems: costItemFactory.buildList(2, {
          amount: 1,
          price: 100,
          taxRate: {
            rate: 0,
          },
        }),
      }),
    });
    const invoice = new InvoiceEntity(rawInvoice).toDto();

    expect(invoice.totalPrice).toBe(360);
    expect(invoice.subtotalPrice).toBe(400);

    // make sure phase calculated well
    expect(invoice.phases[0].subtotal).toBe(180);
    expect(invoice.phases[1].subtotal).toBe(180);

    // make sure item calculated well
    expect(invoice.phases[0].costItems[0].finalPrice).toBe(90);
  });

  it('should calc prices correctly over phases with fees, with invoice discount, with phase discount and item taxes', () => {
    const rawInvoice = invoiceFactory.build({
      fee: 10,
      relativePriceDiscount: 10,
      phases: phaseFactory.buildList(2, {
        discount: 5,
        costItems: costItemFactory.buildList(2, {
          amount: 4,
          price: 100,
          taxRate: {
            rate: 5,
          },
        }),
      }),
    });
    const invoice = new InvoiceEntity(rawInvoice).toDto();

    expect(invoice.totalPrice).toBe(1502.56);
    expect(invoice.subtotalPrice).toBe(1600);

    // make sure phase calculated well
    expect(invoice.phases[0].subtotal).toBe(751.28);
    expect(invoice.phases[1].subtotal).toBe(751.28);

    // make sure item calculated well
    expect(invoice.phases[0].costItems[0].finalPrice).toBe(375.64);
  });
});
