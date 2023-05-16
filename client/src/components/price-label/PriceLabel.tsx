type Props = {
  price: number
}

/*
* we can handle formatting of currency here,
* but for simplification I just add sign for now
* */
const PriceLabel = ({ price }: Props) => {
  return (
    <span>€{price}</span>
  )
}
export {
  PriceLabel
}
