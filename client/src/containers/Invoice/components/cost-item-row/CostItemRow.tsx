import { type CostItem } from '../../../../types'
import styles from './styles.module.scss'
import { PriceLabel } from '../../../../components'

type Props = {
  costItem: CostItem
}

const CostItemRow = ({ costItem }: Props) => {
  const { name, billedByHour, taxRate, finalPrice, price, amount } = costItem

  return (
    <div className={styles.costItem}>
      <div className={styles.itemTitleWrap}>
        <h3 className={styles.itemTitle}>{name}</h3>
        <h3><PriceLabel price={finalPrice} /></h3>
      </div>
      <div className={styles.itemBody}>
        <span>Gross price per item: <PriceLabel price={price} /></span>
        <span>Qnt: {amount} ({billedByHour ? 'Hours' : 'Units'})</span>
        <span>Tax: {taxRate?.rate}%</span>
      </div>
    </div>
  )
}

export {
  CostItemRow
}
