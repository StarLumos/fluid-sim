import { RGBa } from "./RGBa"
import { randomrange } from "./utilities"

class Cell {
    constructor(
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
                this.grid[row][col] = new Cell(1,1,new RGBa(randomrange(0,255),179,55,0.5))
            }
        }
    }
    render(graphics: CanvasRenderingContext2D) {
        for (let r = 0; r < this.grid.length; r++) {
            for(let c = 0; c < this.grid[r].length; c++) {
                graphics.fillStyle = this.grid[r][c].color.toString()
                graphics.fillRect(c*this.cellsize, r*this.cellsize, this.cellsize, this.cellsize)
            }
        }
    }
}

export { FluidField }
