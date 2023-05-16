import { type Invoice } from '../../types'
import { PhaseRow } from './components/phase-row/PhaseRow'
import styles from './styles.module.scss'
import { PriceLabel } from '../../components'

type Props = {
  invoice: Invoice
}

const InvoiceDetails = ({ invoice }: Props) => {
  return (
    <>
      <h1>{invoice.name}</h1>
      <hr/>
      <div>
        {invoice.phases.map(phase => (
          <PhaseRow key={phase.id} phase={phase} />
        ))}
      </div>
      <div className={styles.invoiceDetailsSection}>
        <span>Subtotal: <PriceLabel price={invoice.subtotalPrice} /></span>
        <span>Discount: {invoice.relativePriceDiscount}%</span>
        <h4>Total:  <PriceLabel price={invoice.totalPrice} /></h4>
      </div>
    </>
  )
}

export {
  InvoiceDetails
}
