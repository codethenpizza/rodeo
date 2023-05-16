import { InvoiceDetails, useInvoiceDetails } from '../../containers/Invoice'
import styles from './styles.module.scss'

const InvoiceDetailsPage = () => {
  const { invoice, isError, isLoadingError, isLoading } = useInvoiceDetails()

  if (isError || isLoadingError || !invoice) {
    return (
      // displaying error state of page
      <h1>opps, something went wrong</h1>
    )
  }

  if (isLoading) {
    return (
      // displaying loading state of page
      <h1>loading</h1>
    )
  }

  return (
    <div className={styles.invoiceDetailsWrapper}>
      <div className={styles.invoiceDetailsContainer}>
        <InvoiceDetails invoice={invoice}/>
      </div>
    </div>
  )
}

export {
  InvoiceDetailsPage
}
