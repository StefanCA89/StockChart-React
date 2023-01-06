export default function PriceSideBar(props) {
    const high = Math.max(...props.data.priceHigh)
    const low = Math.min(...props.data.priceLow)
    const diff = high - low
    return (
        <div className="price-sideBar">
            <div className="price5">{high.toFixed(2)}</div>
            <div className="price4">{(high - (diff * 0.25)).toFixed(2)}</div>
            <div className="price3">{(high - (diff * 0.5)).toFixed(2)}</div>
            <div className="price2">{(high - (diff * 0.75)).toFixed(2)}</div>
            <div className="price1">{low.toFixed(2)}</div>
        </div>
    )
}