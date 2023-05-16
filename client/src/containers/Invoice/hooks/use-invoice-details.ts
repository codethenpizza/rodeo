import { graphql } from '../../../gql'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import { type Invoice } from '../../../types'

const invoiceId = 'clhnu05270004tr3w2mdcxoly'

const invoicesQuery = graphql(/* GraphQL */ `
    query invoice ($id: String!) {
        invoice (id: $id){
            id
            name
            relativePriceDiscount
            subtotalPrice
            totalPrice
            phases {
                id
                discount
                name
                subtotal
                costItems {
                    id
                    finalPrice
                    billedByHour
                    price
                    name
                    amount
                    taxRate {
                        id
                        rate
                    }
                }
            }
        }
    }
`)

type UseInvoiceDetailsRes = {
  invoice: Invoice | null
  isLoading: boolean
  isLoadingError: boolean
  isError: boolean
}

const useInvoiceDetails = (): UseInvoiceDetailsRes => {
  const { data, isLoading, isLoadingError, isError } = useQuery(['invoices'], async () =>
    await request('http://localhost:4000/graphql', invoicesQuery, { id: invoiceId })
  )

  return {
    invoice: data?.invoice ?? null,
    isLoading,
    isLoadingError,
    isError
  }
}

export {
  useInvoiceDetails
}
