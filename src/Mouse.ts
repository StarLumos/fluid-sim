import { Vector } from "./Vector"

class Mouse {
    leftclick: boolean
    position: Vector
    velocity: Vector

    constructor() {
        this.leftclick = false
        this.position = new Vector(0, 0)
        this.velocity = new Vector(0, 0)
    }

    initialize() {
        document.addEventListener('mousedown', () => {
            this.leftclick = true
        })
        document.addEventListener('mouseup', () => {
            this.leftclick = false
        })
        document.addEventListener('mousemove', (event: MouseEvent) => {
            let last = this.position
            this.position = new Vector(event.clientX, event.clientY)
            this.velocity = this.position.subtract(last)
        })
    }
}

export { Mouse }
