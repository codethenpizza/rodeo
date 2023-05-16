import { type Phase } from '../../../../types'
import { CostItemRow } from '../cost-item-row/CostItemRow'
import styles from './styles.module.scss'
import { PriceLabel } from '../../../../components'

type Props = {
  phase: Phase
}

const PhaseRow = ({ phase }: Props) => {
  return (
    <div className={styles.phaseWrap}>
      <h2 className={styles.title}>{phase.name}</h2>
      <hr/>
      <div>
        {
          phase.costItems?.map(item => (
            <CostItemRow key={item.id} costItem={item}/>
          ))
        }
      </div>
      <hr/>
      <div className={styles.detailsWrap}>
        <span> Subtotal: <PriceLabel price={phase.subtotal} /></span>
      </div>
    </div>
  )
}

export {
  PhaseRow
}
