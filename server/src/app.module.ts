import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { PrismaModule } from './modules/prisma/prisma.module';
import { InvoiceModule } from './modules/invoice/invoice.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      driver: ApolloDriver,
      definitions: {
        path: join(process.cwd(), 'src/types/graphql.ts'),
        outputAs: 'class',
      },
    }),
    PrismaModule,
    InvoiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
