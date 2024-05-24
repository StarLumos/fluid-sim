import { Vector } from "./Vector"
import { RGB, RGBa } from "./RGBa"

class Cell {
    constructor(
        public particles: number,
        public velocity: Vector,
    ) { }
    get color() {
        let sum = new RGB(0, 0, 0)
        for (let i = 0; i < this.particles; i++) {
            sum.green += 1
        }
        
        const opacity = this.particles / 1000
        const final = new RGBa(sum.red, sum.green, sum.blue, opacity)
        return final
    }
}

export { Cell }
