import { Vector } from "./Vector"
import { RGBa } from "./RGBa"
import { randomrange } from "./utilities"

class Cell {
    constructor(
        public velocity: Vector,
        public density: number,
        public viscosity: number,
        public color: RGBa
    ) { }
}

class FluidField {
    public grid: Cell[][]

    constructor(
        public width: number,
        public height: number,
        public cellsize: number
    ) {
        this.grid = []
        for (let row = 0; row < width / cellsize; row++) {
            this.grid[row] = []
            for (let col = 0; col < width / cellsize; col++) {
                this.grid[row][col] = new Cell(
                    new Vector(randomrange(-20, 20), randomrange(-20, 20)),
                    1,
                    1,
                    new RGBa(randomrange(0,255),179,55,0.5)
                )
                console.log(randomrange(1, 50))
            }
        }
    }
    diffuse() {   

    }
    advect() {
        for (let r = 0; r < this.grid.length; r++) {
            for (let c = 0; c < this.grid[r].length; c++) {
                let current = this.grid[r][c]
                if (Math.abs(current.velocity.x) == Math.abs(current.velocity.y)) {
                    if (current.velocity.x < 0 && current.velocity.y > 0) {
                        this.grid[r-1][c-1].velocity
                            = this.grid[r-1][c-1].velocity.add(
                                current.velocity.multiply(0.5))
                        current.velocity = current.velocity.multiply(0.5)
                    }
                }
            }
        }
    }
    render(graphics: CanvasRenderingContext2D) {
        for (let r = 0; r < this.grid.length; r++) {
            for(let c = 0; c < this.grid[r].length; c++) {
                graphics.fillStyle = this.grid[r][c].color.toString()
                let x = c*this.cellsize
                let y = r*this.cellsize
                graphics.fillRect(x, y, this.cellsize, this.cellsize)
                graphics.beginPath()
                graphics.moveTo(
                    x + (this.cellsize/2),
                    y + (this.cellsize/2))
                graphics.lineTo(
                    x + (this.cellsize/2) + this.grid[r][c].velocity.x, 
                    y + (this.cellsize/2) + this.grid[r][c].velocity.y)
                graphics.closePath()
                graphics.stroke()
            }
        }
    }
}

export { FluidField }
