
import { readFile } from "../../../util.js"
import path from 'path'
import util from 'util'
const srcFolder = 'src/2024'
const dayFolder = 'day9'
const fileName = 'partI.txt'
const filePath = path.join(process.cwd(), srcFolder, dayFolder, fileName)


export const diskFragmenter = () => {
    const input = readFile(filePath).split('')
    const newInput = buildWithSpaces(input)
    const str = shiftLeft(newInput)
    console.log(checkSum(str))
}
const checkSum = (str) => {
    return str.reduce((sum, item,index) => {
        if(item !== '.') {
            return sum + index*Number.parseInt(item)
        }
        return sum
    },0)
}
const shiftLeft = (input) => {
    let dotIndex = input.indexOf('.')
    let lastIndex = input.length -1
    let arrInput = input
    //console.table(input)
    while(lastIndex > dotIndex) {
        if(input[lastIndex] === '.'){
            lastIndex--
            continue
        }
        arrInput[dotIndex] = arrInput[lastIndex]
        arrInput[lastIndex] = '.'
        --lastIndex
        dotIndex = arrInput.indexOf('.')
    }
    return arrInput
}

const buildWithSpaces = (input) => {
    let fileId = 0
    return input.reduce((accum, character, index) => {
        if( character === '0') return accum
        if(index % 2 === 0) {
            accum.push(...createRepeatedString(fileId++, Number.parseInt(character)))
        } else {
            accum.push(...createRepeatedString('.', Number.parseInt(character)))
        }
        return accum
    }, [])
}

const createRepeatedString = (char,length) => Array.from({length}, () => char)

diskFragmenter()