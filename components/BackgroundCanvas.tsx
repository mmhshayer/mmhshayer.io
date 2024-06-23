import { useEffect, useRef } from 'react'

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function drawRandomRectangle(ctx, width, height) {
  const x = getRandomInt(0, width)
  const y = getRandomInt(0, height)
  const rectWidth = getRandomInt(20, 100)
  const rectHeight = getRandomInt(20, 100)
  const color = `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`
  ctx.fillStyle = color
  ctx.fillRect(x, y, rectWidth, rectHeight)
}

function drawRandomCircle(ctx, width, height) {
  const x = getRandomInt(0, width)
  const y = getRandomInt(0, height)
  const radius = getRandomInt(10, 50)
  const color = `rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
}

function drawRandomShapes(ctx, width, height, count) {
  ctx.clearRect(0, 0, width, height) // Clear the canvas
  for (let i = 0; i < count; i++) {
    if (Math.random() > 0.5) {
      drawRandomRectangle(ctx, width, height)
    } else {
      drawRandomCircle(ctx, width, height)
    }
  }
}

const BackgroundCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const handleDraw = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      const { width, height } = canvas
      drawRandomShapes(ctx, width, height, 30)
    }
  }

  useEffect(() => {
    handleDraw()
    window.addEventListener('resize', handleDraw)
    return () => window.removeEventListener('resize', handleDraw)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    ></canvas>
  )
}

export default BackgroundCanvas
