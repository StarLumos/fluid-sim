import { FluidField } from "./FluidField"
import { Mouse } from "./Mouse"
import { Interactor } from "./Interactor"

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

const fluid = new FluidField(canvas.width, canvas.height, 20)

const middlecell = fluid.grid[5][5]

middlecell.particles = 1000

const mouse = new Mouse()
mouse.initialize()

const interactor = new Interactor(mouse, fluid)

let count = 0
function frameloop() {
    console.log(middlecell.particles)
    graphics.clearRect(0, 0, canvas.width, canvas.height)
    fluid.render(graphics)
    fluid.diffuse(0.05)
    fluid.advect(0.4)
    fluid.contain()
    fluid.outline(mouse, graphics)
    interactor.wave()
    count++

    requestAnimationFrame(frameloop)
}

frameloop()
