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

function drawRandomRectangles(ctx, width, height, count) {
  ctx.clearRect(0, 0, width, height) // Clear the canvas
  for (let i = 0; i < count; i++) {
    drawRandomRectangle(ctx, width, height)
  }
}

const RandomRectangleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const handleDraw = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      const { width, height } = canvas
      drawRandomRectangles(ctx, width, height, 50)
    }
  }

  useEffect(() => {
    handleDraw()
  }, [])

  return (
    <div className="flex flex-col rounded-md border border-gray-200 p-4 dark:border-gray-700">
      <div className="mb-4 rounded-md border border-gray-200 p-4 dark:border-gray-700 ">
        <canvas ref={canvasRef} width={400} height={400} className="mx-auto"></canvas>
      </div>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={handleDraw}
      >
        Refresh
      </button>
    </div>
  )
}

export default RandomRectangleCanvas
