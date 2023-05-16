import type {
  Invoice as GqlInvoice,
  Phase as GqlPhase,
  CostItem as GqlCostItem
} from '../gql/graphql'

// here's layer of types - we create them based on the graphql to have
// single source of truth or create our own/modify them
type OmitGql<T> = Omit<T, '__typename'>

type Invoice = OmitGql<GqlInvoice>

type Phase = OmitGql<GqlPhase>

type CostItem = OmitGql<GqlCostItem>

export type {
  Invoice,
  Phase,
  CostItem
}
