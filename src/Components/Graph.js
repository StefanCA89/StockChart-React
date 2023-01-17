import { useEffect, useContext} from "react"
import ThemeContext from '../App'

export default function Graph(props) {
  const {priceOpen, priceClose, priceHigh, priceLow} = props.data
  const darkTheme = useContext(ThemeContext)

  useEffect(() => {
    const canvas = props.refToCanvas.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, 550, 330)
    drawLines(ctx)
    drawGraph(ctx)
  }, [props.data])
   
  function drawLines(ctx) {
    let posY = [15, 90, 165, 240, 315]
    ctx.strokeStyle = "#e6e6e6c7"
    for (let value in posY) {
      ctx.beginPath()
      ctx.moveTo(0, posY[value])
      ctx.lineTo(550, posY[value])
      ctx.stroke()
    }
}

  function drawGraph (ctx) {
    const high = Math.max(...priceHigh)
    const low = Math.min(...priceLow)
    let maxDiff = high - low
    let posXline = 12
    let posYline
    let heightLine
    
    for (let i = 0; i < 45; ++i) {
      posYline = 3 * ((high - priceHigh[i]) * 100 / maxDiff) + 15
      heightLine = 3 * ((high - priceLow[i]) * 100 / maxDiff) + 15 - posYline
      if (priceHigh[i] === priceLow[i]) {
        drawX(posXline, posYline, ctx)
      } else {
        ctx.fillRect(posXline, posYline, 1, heightLine)
      }
      posXline += 12
    }

    posXline = 8
    for (let i = 0; i < 45; ++i) {
      let highValue = priceOpen[i]
      let lowValue = priceClose[i]
      ctx.fillStyle = "#dc3232"
      if (priceOpen[i] < priceClose[i]) {
        lowValue = priceOpen[i]
        highValue = priceClose[i]
        ctx.fillStyle = "#4CAF50"
      }
      posYline = 3 * ((high - highValue) * 100 / maxDiff) + 15
      heightLine = 3 * ((high - lowValue) * 100 / maxDiff) + 15 - posYline
      if (heightLine === 0) {
        ctx.fillStyle = "black"
        ++heightLine
      }
      ctx.fillRect(posXline, posYline, 10, heightLine)
      posXline += 12
    }
  }

  function drawX(posX, posY, ctx) {
    ctx.fillRect(posX, posY - 2.5, 1, 5)
    ctx.fillRect(posX - 2.5, posY, 5, 1)
  }

  return (
    <canvas
      id="myCanvas"
      ref={props.refToCanvas}
      width="550"
      height="330"
      style={{ border: "1.5px solid #d3d3d3"}}
    ></canvas>
  )
}