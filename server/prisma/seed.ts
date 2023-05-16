import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const taxRateMid = await prisma.taxRate.create({
    data: {
      rate: 15,
    },
  });

  const taxRateZero = await prisma.taxRate.create({
    data: {
      rate: 0,
    },
  });

  const invoice = await prisma.invoice.create({
    data: {
      id: 'clhnu05270004tr3w2mdcxoly',
      name: 'myInvoiceOne',
      relativePriceDiscount: 7,
    },
  });

  const phaseOne = await prisma.phase.create({
    data: {
      invoiceId: invoice.id,
      name: 'MyPhaseOne',
      discount: -30,
    },
  });

  const phaseTwo = await prisma.phase.create({
    data: {
      invoiceId: invoice.id,
      name: 'MyPhaseTwo',
      discount: 10,
    },
  });

  await prisma.costItem.createMany({
    data: [
      // phase one
      {
        name: 'MyItemOne_MyPhaseOne',
        amount: 1,
        billedByHour: true,
        price: 100,
        taxRateId: taxRateZero.id,
        phaseId: phaseOne.id,
      },
      {
        name: 'MyItemTwo_MyPhaseOne',
        amount: 1,
        billedByHour: false,
        price: 100,
        taxRateId: taxRateZero.id,
        phaseId: phaseOne.id,
      },

      // phase two
      {
        name: 'MyItemOne_MyPhaseTwo',
        amount: 2,
        billedByHour: true,
        price: 100,
        taxRateId: taxRateMid.id,
        phaseId: phaseTwo.id,
      },
      {
        name: 'MyItemTwo_MyPhaseTwo',
        amount: 4,
        billedByHour: false,
        price: 50,
        taxRateId: taxRateZero.id,
        phaseId: phaseTwo.id,
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
