
import { readFile } from "../../../util.js"
import path from 'path'
import util from 'util'
const srcFolder = 'src/2024'
const dayFolder = 'day9'
const fileName = 'partII.txt'
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
    let lastIndex = input.length -1
    let arrInput = input
    let originalInput = [...input]
    while(lastIndex > 0) {
        if(originalInput[lastIndex] === '.'){
            lastIndex--
            continue
        }
        let fileId = originalInput[lastIndex]
        let fileLength = lastIndex - originalInput.indexOf(fileId) + 1
        
        let dotChunkIndex = findFirstAvailable(fileLength, input)
        if(dotChunkIndex  === -1 || dotChunkIndex > lastIndex) {
            lastIndex -= fileLength
            continue
        }
        let counter = 0
        
        while(counter < fileLength) {
            input[dotChunkIndex+counter] = fileId
            ++counter
        }
        counter = 0
        while(counter < fileLength){
            input[lastIndex - counter] = '.'
            ++counter
        }
        lastIndex -= fileLength
    }
    return arrInput
}
const findFirstAvailable = (fileLength, input) => {
    let pos = input.indexOf('.')
    let holdPosition = pos
    let count = 0
    let found = false
    while(pos < input.length) {
        if(input[pos] === '.') {
            ++count
            if(count === fileLength) {
                found = true
                break
            }
        } else {
            count = 0
            holdPosition = pos+1
        }
        pos++
    }

    return found ? holdPosition : -1
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