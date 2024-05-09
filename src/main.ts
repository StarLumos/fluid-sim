import { FluidField } from "./FluidField"

const canvas = document.querySelector('canvas')!

if (canvas == null)
    throw new Error('Could not find canvas element.')

function resize(canvas: HTMLCanvasElement) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight 
}

resize(canvas)
window.addEventListener('resize', () => { resize(canvas) }) 

const graphics = canvas.getContext('2d') as CanvasRenderingContext2D

graphics.fillStyle = 'red'
graphics.fillRect(0, 0, 100, 100)

const fluid = new FluidField(canvas.width, canvas.height, 5)

function frameloop() {
    graphics.clearRect(0, 0, canvas.width, canvas.height)
    fluid.render(graphics)
    requestAnimationFrame(frameloop)
}

frameloop()
