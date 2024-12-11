import { readFile } from "../../util.js"
import path from 'path'


export const redNosePartI = (fileName = './partI.txt') => {
    
    const filePath = path.join(process.cwd(), 'src', '2024','day2',fileName)
    const input = readFile(filePath).split('\n').filter(item => !!item.trim())
    const safeReportCount = input.reduce((sum, value) => {
        if(isSafeInput(value)) {
            sum++
        }
        return sum
    }, 0)
    console.log(safeReportCount)
}

const isSafeInput = (input) => {
    const values = input.split(' ').filter(item => !!item).map(val => Number.parseInt(val))
    return allSameDirection(values) && allCorrectDistance(values)
}
const allSameDirection = (values) => {
    let direction = values[0] < values[1]
    for(let index=2; index < values.length; ++index) {
        if(values[index-1] < values[index] !== direction) {
            return false
        }
    }
    return true
}
const allCorrectDistance = (values) => {
    let direction = (values[0] - values[1]) <= 0
    let distance = Math.abs(values[0] - values[1])
    if(!(distance > 0 && distance < 4)) {
        return false
    }
    for(let index=2; index<values.length; ++index) {
        const distance = Math.abs(values[index-1] - values[index])
        if(!(distance > 0 && distance < 4) || ((values[index-1] - values[index]) <= 0) !== direction) {
            return false
        }
    }
    return true
}

redNosePartI()