import { readFile } from "../../../util.js"
import path from 'path'


export const mullItOver = (fileName = './partII.txt') => {
    const filePath = path.join(process.cwd(), 'src','2024', 'day3',fileName)
    const input = readFile(filePath)//.split('\n').filter(item => !!item.trim())

    const total = getValue(input)
    console.log(total)
}

const getValue = (input) => {
    const senitizedInput = cleanInput(input)
    const expression = /mul\(\d{1,3},\d{1,3}\)/g
    const matches = senitizedInput.match(expression)
    
    return matches.reduce((sum, mult) => {
        const numbersTemplate = mult.replace('mul','').replace('(','').replace(')','')
        const numbers = numbersTemplate.split(',').map(num => Number.parseInt(num))
        return sum + numbers[0]*numbers[1]
    }, 0)
}

const cleanInput = (input) => {
    let senitizedInput = input.replace(/'/g,'')
    
    let index = 0
    let valid = true
    while(valid) {
        ++index
        const doNotIndex = senitizedInput.search(/dont\(\)/g)
        if(doNotIndex < 0) {
            valid = false
        }
        const doIndex = senitizedInput.search(/do\(\)/g)
        if(doIndex < doNotIndex && doIndex > -1) {
            senitizedInput = senitizedInput.substring(0, doIndex) + senitizedInput.substring(doIndex + 'do()'.length)
            continue;
        }
        if(doIndex < 0) {
            
            senitizedInput = senitizedInput.substring(0,doNotIndex)
            valid = false
        } else {
            senitizedInput = senitizedInput.substring(0,doNotIndex) + senitizedInput.substring(doIndex + 'do()'.length)
        }
    }
    return senitizedInput
}

mullItOver()