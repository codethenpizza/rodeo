import { Prisma, TaxRate } from '@prisma/client';

type DBInvoice = Prisma.InvoiceGetPayload<{
  include: {
    phases: { include: { costItems: { include: { taxRate: true } } } };
  };
}>;

type DBPhase = Prisma.PhaseGetPayload<{
  include: { costItems: { include: { taxRate: true } } };
}>;

type DBCostItem = Prisma.CostItemGetPayload<{ include: { taxRate: true } }>;

type DBTaxRate = TaxRate;

export type { DBCostItem, DBPhase, DBInvoice, DBTaxRate };
