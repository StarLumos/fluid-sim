type rgb = `rgb(${number},${number},${number})` 
         | `rgba(${number},${number},${number},${number})`

class RGB {
    constructor(
        public red: number,
        public green: number,
        public blue: number,
    ) { }
    stringify(): rgb {
        return `rgb(${this.red},${this.green},${this.blue})`
    }
    add(other: RGB) {
        return new RGB(
            this.red + other.red,
            this.green + other.green,
            this.blue + other.blue)
    }
}

class RGBa extends RGB {
    public alpha: number 

    constructor(red: number,green: number,blue: number, alpha: number) { 
        super(red, green, blue)
        this.alpha = alpha
    }
    stringify(): rgb {
        return `rgba(${this.red},${this.green},${this.blue},${this.alpha})`
    }
}

export { RGB, RGBa, type rgb }
