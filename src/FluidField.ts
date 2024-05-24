import { Vector } from "./Vector"
import { radians, degrees } from "./utilities"
import { Cell } from "./Cell"
import { RGBa } from "./RGBa"
import { Mouse } from "./Mouse"

const angled = (minimum: degrees, maximum: degrees, vector: Vector) => 
    radians(vector.angle) >= minimum && radians(vector.angle) < maximum

class FluidField {
    public grid: Cell[][]

    constructor(
        public width: number,
        public height: number,
        public cellsize: number,
    ) {
        this.grid = []

        for (let row = 0; row < width / cellsize; row++) {
            this.grid[row] = []
            for (let col = 0; col < width / cellsize; col++) {       
                let velocity = new Vector(0, 0)
                this.grid[row][col] = new Cell(0, velocity )
            }
        }
    }
    contain() {
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                if ((x == 0 && this.grid[y][x].velocity.x < 0) || 
                    (x == this.grid[y].length-1 && this.grid[y][x].velocity.x > 0))
                    this.grid[y][x].velocity.x = -this.grid[y][x].velocity.x
                if ((y == 0 && this.grid[y][x].velocity.y > 0) ||
                    (y == this.grid.length-1 && this.grid[y][x].velocity.y < 0))
                    this.grid[y][x].velocity.y = -this.grid[y][x].velocity.y
            }
        }
    }
    diffuse(rate: number) {
        let functions: (() => void)[] = []
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                const adjacents = {
                    midright: this.grid[y]?.[x+1] ?? null, 
                    topright: this.grid[y-1]?.[x+1] ?? null,
                    topmid: this.grid[y-1]?.[x] ?? null,
                    topleft: this.grid[y-1]?.[x-1] ?? null,
                    midleft: this.grid[y]?.[x-1] ?? null,
                    bottomleft: this.grid[y+1]?.[x-1] ?? null,
                    bottommid: this.grid[y+1]?.[x] ?? null,
                    bottomright: this.grid[y+1]?.[x+1] ?? null,
                }
                for (const adjacent of Object.values(adjacents)) {
                    if (adjacent == null)
                        continue
                    functions.push(() => {
                        adjacent.velocity = adjacent.velocity.add(this.grid[y][x].velocity.multiply(rate))
                        this.grid[y][x].velocity = this.grid[y][x].velocity.multiply(1-rate)

                        adjacent.particles += this.grid[y][x].particles * rate
                        this.grid[y][x].particles = this.grid[y][x].particles * (1-rate)
                    })
                }
            }
        }
        for (const fn of functions) {
            fn()
        }
    }
    advect(transfer_rate: number) {
        let functions: (() => void)[] = []
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                let current = this.grid[y][x]
                let adjacent: Cell

                if (angled(0, 22.5, current.velocity) || angled(337.5, 360.01, current.velocity))
                    adjacent = this.grid[y]?.[x+1]
                else if (angled(22.5, 67.5, current.velocity))
                    adjacent = this.grid[y+1]?.[x+1]
                else if (angled(67.5, 112.5, current.velocity))
                    adjacent = this.grid[y+1]?.[x]
                else if (angled(112.5, 157.5, current.velocity))
                    adjacent = this.grid[y+1]?.[x-1]
                else if (angled(157.5, 202.5, current.velocity))
                    adjacent = this.grid[y]?.[x-1]
                else if (angled(202.5, 247.5, current.velocity))
                    adjacent = this.grid[y-1]?.[x-1]
                else if (angled(247.5, 292.5, current.velocity))
                    adjacent = this.grid[y-1]?.[x]
                else if (angled(292.5, 337.5, current.velocity))
                    adjacent = this.grid[y-1]?.[x+1]
                else
                    throw new Error(`angle not handled: ${radians(current.velocity.angle)}`)

                if (adjacent != null) {
                    functions.push(() => {
                        adjacent.particles += (current.velocity.multiply(transfer_rate)).magnitude
                        current.particles -= (current.velocity.multiply(transfer_rate)).magnitude

                        adjacent.velocity = adjacent.velocity.add(current.velocity.multiply(transfer_rate))
                        current.velocity = current.velocity.multiply(transfer_rate)
                    })
                }
            }
        }
        for (const fn of functions) {
            fn()
        }
    }
    render(graphics: CanvasRenderingContext2D) {
        for (let r = 0; r < this.grid.length; r++) {
            for(let c = 0; c < this.grid[r].length; c++) {
                graphics.fillStyle =  new RGBa(0,20,168,1).stringify()
                let x = c*this.cellsize
                let y = r*this.cellsize
                graphics.fillRect(x, y, this.cellsize, this.cellsize)
                graphics.fillStyle = this.grid[r][c].color.stringify()
                graphics.fillRect(x, y, this.cellsize, this.cellsize)
                // this.showVelocity(graphics, r, c)
            }
        }
    }
    showVelocity(graphics: CanvasRenderingContext2D, r: number, c: number) {
        let x = c*this.cellsize
        let y = r*this.cellsize
        graphics.beginPath()
        graphics.moveTo(
            x + (this.cellsize/2),
            y + (this.cellsize/2))
        graphics.lineTo(
            x + (this.cellsize/2) + this.grid[r][c].velocity.x, 
            y + (this.cellsize/2) + this.grid[r][c].velocity.y)
        graphics.closePath()
        graphics.arc(x + (this.cellsize/2), y + (this.cellsize/2), 2, 0, Math.PI*2)
        graphics.strokeStyle = 'green'
        graphics.stroke()
    }
    outline(mouse: Mouse, graphics: CanvasRenderingContext2D) {
        const x = Math.floor(mouse.position.x/this.cellsize) * this.cellsize
        const y = Math.floor(mouse.position.y/this.cellsize) * this.cellsize
        graphics.strokeStyle = 'white'
        graphics.strokeRect(x, y, this.cellsize, this.cellsize)
    }
}

export { Cell, FluidField }
