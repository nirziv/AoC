import { readFile } from "../../../util.js"
import path from 'path'

const srcFolder = 'src/2024'
const dayFolder = 'day4'

export const ceresSearch = (fileName = './partI.txt') => {
    const filePath = path.join(process.cwd(), srcFolder, dayFolder,fileName)
    const input = readFile(filePath).split('\n').filter(item => !!item.trim()).map(row => row.split(''))
    console.log(findAllXmas(input))
}

const findAllXmas = (input) => {
    let total = 0
    for(let row = 0; row < input.length;++row) {
        const indices = findAll(input[row], 'X')
        total += indices.reduce((sum, index) => {
            return (
                sum + 
                findLeft(input, index, row) + 
                findRight(input, index, row) + 
                findUp(input, index, row) + 
                findDown(input, index, row) + 
                findLeftUp(input, index, row) + 
                findRightUp(input, index, row) + 
                findRightDown(input, index, row) + 
                findLeftDown(input, index, row)
            )
        }, 0)
    }
    return total
}
const reverseXmas = 'SAMX'
const xmas = 'XMAS'

const findLeft = (input, index, row) => {
    if(index - 3 < 0) return 0
    const tmp = input[row].join('').substring(index-3, index+1)
    return tmp === reverseXmas ? 1 : 0
}
const findRight = (input, index, row) => {
    if(index+3 >= input[row].length) return 0
    const tmp = input[row].join('').substring(index, index+4)
    return tmp === xmas ? 1 : 0
}
const findUp = (input, index, row) => {
    if(row - 3 < 0) return 0
    const tmp = input[row][index] + input[row-1][index] + input[row-2][index] + input[row-3][index]
    return tmp === xmas ? 1 : 0
}
const findDown = (input, index, row) => {
    if(row + 3 >= input.length) return 0
    const tmp = input[row][index] + input[row+1][index] + input[row+2][index] + input[row+3][index]
    return tmp === xmas ? 1 : 0
}
const findLeftUp = (input, index, row) => {
    if(row - 3 <0 || index - 3 < 0) return 0
    const tmp = input[row][index] + input[row-1][index-1] + input[row-2][index-2] + input[row-3][index-3]
    return tmp === xmas ? 1: 0
}
const findRightUp = (input, index, row) => {
    if(row - 3 <0 || index + 3 >= input[row].length) return 0
    const tmp = input[row][index] + input[row-1][index+1] + input[row-2][index+2] + input[row-3][index+3]
    return tmp === xmas ? 1: 0
}
const findRightDown = (input, index, row) => {
    if(row + 3 >=input.length || index + 3 >= input[row].length) return 0
    const tmp = input[row][index] + input[row+1][index+1] + input[row+2][index+2] + input[row+3][index+3]
    return tmp === xmas ? 1: 0
}
const findLeftDown = (input, index, row) => {
    if(row + 3 >=input.length || index - 3 < 0) return 0
    const tmp = input[row][index] + input[row+1][index-1] + input[row+2][index-2] + input[row+3][index-3]
    return tmp === xmas ? 1: 0
}

const findAll = (arr, key) => {
    return arr.map((char, index) => char === key ? index : -1 ).filter(ind => ind !== -1)
}

ceresSearch()