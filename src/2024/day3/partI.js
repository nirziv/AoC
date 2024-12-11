import { readFile } from "../../../util.js"
import path from 'path'


export const mullItOver = (fileName = './partI.txt') => {
    const filePath = path.join(process.cwd(), 'src','2024', 'day3',fileName)
    const input = readFile(filePath).split('\n').filter(item => !!item.trim())
    const total = input.reduce((sum,item) => {
        const result = getValue(item)
        return sum + result
    }, 0)
    console.log(total)
}

const getValue = (item) => {
    const expression = /mul\(\d{1,3},\d{1,3}\)/g
    
    const matches = item.match(expression)
    
    return matches.reduce((sum, mult) => {
        const numbersTemplate = mult.replace('mul','').replace('(','').replace(')','')
        const numbers = numbersTemplate.split(',').map(num => Number.parseInt(num))

        return sum + numbers[0]*numbers[1]
    }, 0)
}

mullItOver()