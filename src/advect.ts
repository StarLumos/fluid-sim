import { Cell } from "./FluidField"
import { degrees } from "./utilities"

function handleAngles(functions: (() => void)[], grid: Cell[][], current: Cell, r: number, c: number) {
    if (degrees(-11.25) <= current.velocity.angle && current.velocity.angle < degrees(11.25)) {
        // right cell only
        functions.push(() => {
            grid[r][c+1].velocity
                = grid[r][c+1].velocity.add(
                    current.velocity.multiply(0.5))
            current.velocity = current.velocity.multiply(0.5)
        })
    } 
    else if (degrees(11.25) <= current.velocity.angle && current.velocity.angle < degrees(33.75)) {
        // right cell and top right
        functions.push(() => {
            grid[r][c+1].velocity
                = grid[r][c+1].velocity.add(
                    current.velocity.multiply(0.25))
            grid[r-1][c+1].velocity
                = grid[r-1][c+1].velocity.add(
                    current.velocity.multiply(0.25))
            current.velocity = current.velocity.multiply(0.5)
        })
    } 
    else if (degrees(33.75) <= current.velocity.angle && current.velocity.angle < degrees(56.25)) {
        // top right only
        functions.push(() => {
            grid[r-1][c+1].velocity
                = grid[r-1][c+1].velocity.add(
                    current.velocity.multiply(0.5))
            current.velocity = current.velocity.multiply(0.5)  
        })
    } 
    else if (degrees(56.25) <= current.velocity.angle && current.velocity.angle < degrees(78.75)) {
        // top cell and top right
        functions.push(() => {
            grid[r-1][c+1].velocity
                = grid[r-1][c+1].velocity.add(
                    current.velocity.multiply(0.25))
            grid[r-1][c].velocity
                = grid[r-1][c].velocity.add(
                    current.velocity.multiply(0.25))
            current.velocity = current.velocity.multiply(0.5)  
        })
    } 
    else if (degrees(78.25) <= current.velocity.angle && current.velocity.angle < degrees(101.25)) {
        // top cell only
        functions.push(() => {
            grid[r-1][c].velocity
                = grid[r-1][c].velocity.add(
                    current.velocity.multiply(0.5))
            current.velocity = current.velocity.multiply(0.5)  
        })
    } 
    else if (degrees(101.25) <= current.velocity.angle && current.velocity.angle < degrees(123.75)) {
        // top cell and top left
        functions.push(() => {
            grid[r-1][c].velocity
                = grid[r-1][c].velocity.add(
                    current.velocity.multiply(0.25))
            grid[r-1][c-1].velocity
                = grid[r-1][c-1].velocity.add(
                    current.velocity.multiply(0.25))
            current.velocity = current.velocity.multiply(0.5)  
        })
    } 
    else if (degrees(123.75) <= current.velocity.angle && current.velocity.angle < degrees(146.25)) {
        // top left cell only
        functions.push(() => {
            grid[r-1][c-1].velocity
                = grid[r-1][c-1].velocity.add(
                    current.velocity.multiply(0.5))
            current.velocity = current.velocity.multiply(0.5)  
        })
    } 
    else if (degrees(146.25) <= current.velocity.angle && current.velocity.angle < degrees(168.75)) {
        // left cell and top left
        functions.push(() => {
            grid[r-1][c-1].velocity
                = grid[r-1][c-1].velocity.add(
                    current.velocity.multiply(0.25))
            grid[r][c-1].velocity
                = grid[r][c-1].velocity.add(
                    current.velocity.multiply(0.25))
            current.velocity = current.velocity.multiply(0.5)  
        })
    } 
    else if (degrees(168.75) <= current.velocity.angle && current.velocity.angle < degrees(191.25)) {
        // left cell only
        functions.push(() => {
            grid[r][c-1].velocity
                = grid[r][c-1].velocity.add(
                    current.velocity.multiply(0.5))
            current.velocity = current.velocity.multiply(0.5)  
        })
    } 
    else if (degrees(191.25) <= current.velocity.angle && current.velocity.angle < degrees(213.75)) {
        // left cell and bottom left
        functions.push(() => {
            grid[r][c-1].velocity
                = grid[r][c-1].velocity.add(
                    current.velocity.multiply(0.25))
            grid[r+1][c-1].velocity
                = grid[r+1][c-1].velocity.add(
                    current.velocity.multiply(0.25))
            current.velocity = current.velocity.multiply(0.5)  
        })
    } 
    else if (degrees(213.75) <= current.velocity.angle && current.velocity.angle < degrees(236.25)) {
        // bottom left only
        functions.push(() => {
            grid[r+1][c-1].velocity
                = grid[r+1][c-1].velocity.add(
                    current.velocity.multiply(0.5))
            current.velocity = current.velocity.multiply(0.5)  
        })
    } 
    else if (degrees(236.25) <= current.velocity.angle && current.velocity.angle < degrees(258.75)) {
        // bottom cell and bottom left
        functions.push(() => {
            grid[r+1][c-1].velocity
                = grid[r+1][c-1].velocity.add(
                    current.velocity.multiply(0.25))
            grid[r+1][c].velocity
                = grid[r+1][c].velocity.add(
                    current.velocity.multiply(0.25))
            current.velocity = current.velocity.multiply(0.5)  
        })
    } 
    else if (degrees(258.75) <= current.velocity.angle && current.velocity.angle < degrees(281.25)) {
        // bottom cell only
        functions.push(() => {
            grid[r+1][c].velocity
                = grid[r+1][c].velocity.add(
                    current.velocity.multiply(0.5))
            current.velocity = current.velocity.multiply(0.5)  
        })
    } 
    else if (degrees(281.25) <= current.velocity.angle && current.velocity.angle < degrees(303.75)) {
        // bottom cell and bottom right
        functions.push(() => {
            grid[r+1][c].velocity
                = grid[r+1][c].velocity.add(
                    current.velocity.multiply(0.25))
            grid[r+1][c+1].velocity
                = grid[r+1][c+1].velocity.add(
                    current.velocity.multiply(0.25))
            current.velocity = current.velocity.multiply(0.5)  
        })
    } 
    else if (degrees(303.75) <= current.velocity.angle && current.velocity.angle < degrees(326.25)) {
        // bottom right only
        functions.push(() => {
            grid[r+1][c+1].velocity
                = grid[r+1][c+1].velocity.add(
                    current.velocity.multiply(0.5))
            current.velocity = current.velocity.multiply(0.5)  
        })
    } 
    else if (degrees(326.25) <= current.velocity.angle && current.velocity.angle < degrees(348.75)) {
        // right cell and bottom right
        functions.push(() => {
            grid[r+1][c+1].velocity
                = grid[r+1][c+1].velocity.add(
                    current.velocity.multiply(0.25))
            grid[r][c+1].velocity
                = grid[r][c+1].velocity.add(
                    current.velocity.multiply(0.25))
            current.velocity = current.velocity.multiply(0.5)  
        })
    }
}

export { handleAngles }
