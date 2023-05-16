import { Factory } from 'fishery';
import { DBCostItem, DBInvoice, DBPhase, DBTaxRate } from '../../src/types';

export const taxFactory = Factory.define<DBTaxRate>(({ sequence }) => ({
  id: `${sequence}`,
  rate: 0,
}));

export const costItemFactory = Factory.define<DBCostItem>(({ sequence }) => {
  const tax = taxFactory.build({ rate: 2 });

  return {
    id: `${sequence}`,
    name: `myCostItem ${sequence}`,
    price: 100,
    amount: 1,
    billedByHour: true,
    phaseId: 'phase_id_1',
    taxRateId: tax.id,
    taxRate: tax,
  };
});

export const phaseFactory = Factory.define<DBPhase>(({ sequence }) => ({
  id: `${sequence}`,
  discount: 0,
  name: `myPhase ${sequence}`,
  invoiceId: 'id',
  costItems: costItemFactory.buildList(2),
}));

export const invoiceFactory = Factory.define<DBInvoice>(({ sequence }) => ({
  id: `${sequence}`,
  name: `myPhase ${sequence}`,
  relativePriceDiscount: 0,
  fee: 0,
  phases: phaseFactory.buildList(2),
}));
