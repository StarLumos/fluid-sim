import { describe, it, test, expect } from 'vitest'
import { degrees, radians } from '../src/utilities'

describe('angles and radians', () => {
    describe('degrees', () => {
        test('positive degree to radian conversion', () => {
            expect(degrees(90)).toBeCloseTo(1.5707)
        })
    })
})
