import { Args, Resolver, Query } from '@nestjs/graphql';
import { InvoiceService } from './invoice.service';

@Resolver('Invoice')
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Query('invoices')
  getInvoices() {
    return this.invoiceService.findAll();
  }

  @Query('invoice')
  getInvoice(@Args('id') id: string) {
    return this.invoiceService.getInvoice(id);
  }
}
