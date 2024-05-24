import { Mouse } from "./Mouse"
import { FluidField } from "./FluidField"

class Interactor {
    constructor(
        public mouse: Mouse, 
        public fluid: FluidField
    ) { }

    wave() {
        const x = Math.floor(this.mouse.position.x/this.fluid.cellsize)
        const y = Math.floor(this.mouse.position.y/this.fluid.cellsize)
        if (x > this.fluid.width || y > this.fluid.height)
            return
        const cells = this.fluid.grid
        const splash = {
            center: cells[y]?.[x] ?? null,
            midright: cells[y]?.[x+1] ?? null, 
            topright: cells[y-1]?.[x+1] ?? null,
            topmid: cells[y-1]?.[x] ?? null,
            topleft: cells[y-1]?.[x-1] ?? null,
            midleft: cells[y]?.[x-1] ?? null,
            bottomleft: cells[y+1]?.[x-1] ?? null,
            bottommid: cells[y+1]?.[x] ?? null,
            bottomright: cells[y+1]?.[x+1] ?? null,
        }
        for (const cell of Object.values(splash))
            if (cell !== null)
                cell.velocity = cell.velocity.add(this.mouse.velocity.multiply(3))
    }
}

export { Interactor }
