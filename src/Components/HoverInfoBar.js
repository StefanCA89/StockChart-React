import { useEffect, useState, useContext } from "react"
import { ThemeContext } from "../App"

export default function HoverInfoBar(props) {
    const high = Math.max(...props.data.priceHigh)
    const low = Math.min(...props.data.priceLow)
    const diff = high - low

    const darkTheme = useContext(ThemeContext)
    const [price, setPrice] = useState()
    const [timestamp, setTimestamp] = useState()
    const [visibility, setVisibility] = useState("hidden")

    useEffect(() => {
        function handleMove(event) {
            setVisibility("visible")
            if (event.offsetX > 5 && event.offsetX < 545) {
                setPrice((high - (diff * ((event.offsetY - 15) / 300))).toFixed(2))
                setTimestamp(props.data.timeStamp[45 - Math.round(event.offsetX / 12)])
            }
        }

        props.refToCanvas.current.addEventListener("mousemove", handleMove)
        props.refToCanvas.current.addEventListener("mouseleave", (event) => setVisibility("hidden"))

        return () => {
            props.refToCanvas.current.removeEventListener("mousemove", handleMove)
            props.refToCanvas.current.removeEventListener("mouseleave", (event) => setVisibility("hidden"))
        }
    }, [])

    return (
        <div className="hoverInfo-Bar" style={{visibility : visibility}} >
            <div className="hoverInfoBar-Price">
                <div className="hoverPrice-Title">Price</div>
                <div className="hoverPrice-Price"
                style={{backgroundColor: darkTheme ? "#000000a3" : "whitesmoke"}}
                >{price}</div>
            </div>
            <div className="hoverInfoBar-Time">
                <div className="hoverTime-Title">Timestamp</div>
                <div className="hoverTime-Time"
                style={{backgroundColor: darkTheme ? "#000000a3" : "whitesmoke"}}
                >{timestamp}</div>
            </div>
        </div>
    )
}