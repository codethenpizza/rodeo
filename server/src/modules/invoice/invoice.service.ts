import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InvoiceEntity } from '../../entities/invoice-entity';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  public findAll() {
    return this.prisma.invoice.findMany();
  }

  public async getInvoice(id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: {
        phases: {
          include: {
            costItems: {
              include: {
                taxRate: true,
              },
            },
          },
        },
      },
    });

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    const invoiceEntity = new InvoiceEntity(invoice);

    return invoiceEntity.toDto();
  }
}
