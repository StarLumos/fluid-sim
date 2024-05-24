function randomrange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

type radians = number
type degrees = number

function radians(radians: number): degrees {
    const result = radians * (180/Math.PI)
    if (result >= 0)
        return result
    else
        return result + 360
}

function degrees(degrees: number): radians {
    return degrees * (Math.PI/180)
}

export { randomrange, radians, degrees }
