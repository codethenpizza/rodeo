
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class TaxRate {
    id: string;
    rate: number;
}

export class CostItem {
    id: string;
    name: string;
    billedByHour: boolean;
    amount: number;
    price: number;
    finalPrice: number;
    phaseId?: Nullable<string>;
    phase?: Nullable<Phase>;
    taxRateId?: Nullable<string>;
    taxRate?: Nullable<TaxRate>;
}

export class Phase {
    id: string;
    name: string;
    discount?: Nullable<number>;
    subtotal: number;
    invoiceId?: Nullable<string>;
    invoice?: Nullable<Invoice>;
    costItems: CostItem[];
}

export class Invoice {
    id: string;
    name: string;
    relativePriceDiscount?: Nullable<number>;
    phases: Phase[];
    subtotalPrice: number;
    totalPrice: number;
}

export abstract class IQuery {
    abstract invoices(): Nullable<Invoice>[] | Promise<Nullable<Invoice>[]>;

    abstract invoice(id: string): Nullable<Invoice> | Promise<Nullable<Invoice>>;
}

type Nullable<T> = T | null;
