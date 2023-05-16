/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CostItem = {
  __typename?: 'CostItem';
  amount: Scalars['Int'];
  billedByHour: Scalars['Boolean'];
  finalPrice: Scalars['Float'];
  id: Scalars['ID'];
  name: Scalars['String'];
  phase?: Maybe<Phase>;
  phaseId?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  taxRate?: Maybe<TaxRate>;
  taxRateId?: Maybe<Scalars['String']>;
};

export type Invoice = {
  __typename?: 'Invoice';
  id: Scalars['ID'];
  name: Scalars['String'];
  phases: Array<Phase>;
  relativePriceDiscount?: Maybe<Scalars['Float']>;
  subtotalPrice: Scalars['Float'];
  totalPrice: Scalars['Float'];
};

export type Phase = {
  __typename?: 'Phase';
  costItems: Array<CostItem>;
  discount?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  invoice?: Maybe<Invoice>;
  invoiceId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  subtotal: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  calcInvoice?: Maybe<Invoice>;
  invoice?: Maybe<Invoice>;
  invoices: Array<Maybe<Invoice>>;
};


export type QueryCalcInvoiceArgs = {
  id: Scalars['String'];
};


export type QueryInvoiceArgs = {
  id: Scalars['String'];
};

export type TaxRate = {
  __typename?: 'TaxRate';
  id: Scalars['ID'];
  rate: Scalars['Float'];
};

export type InvoiceQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type InvoiceQuery = { __typename?: 'Query', invoice?: { __typename?: 'Invoice', id: string, name: string, relativePriceDiscount?: number | null, subtotalPrice: number, totalPrice: number, phases: Array<{ __typename?: 'Phase', id: string, discount?: number | null, name: string, subtotal: number, costItems: Array<{ __typename?: 'CostItem', id: string, finalPrice: number, billedByHour: boolean, price: number, name: string, amount: number, taxRate?: { __typename?: 'TaxRate', id: string, rate: number } | null }> }> } | null };


export const InvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"invoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"relativePriceDiscount"}},{"kind":"Field","name":{"kind":"Name","value":"subtotalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"phases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"costItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"finalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"billedByHour"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"taxRate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<InvoiceQuery, InvoiceQueryVariables>;