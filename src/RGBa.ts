type rgba = `rgba(${number},${number},${number},${number})`

class RGBa {
    constructor(
        public red: number,
        public green: number,
        public blue: number,
        public alpha: number,
    ) { }
    toString(): rgba {
        return `rgba(${this.red},${this.green},${this.blue},${this.alpha})`
    }
}

export { RGBa, type rgba }
