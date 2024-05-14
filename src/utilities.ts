function randomrange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function degrees(degree: number) {
    return degree * Math.PI / 180
}

export { randomrange, degrees }
