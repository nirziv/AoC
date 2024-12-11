import { readFile } from "../../../util.js"
import path from 'path'

const srcFolder = 'src/2024'
const dayFolder = 'day4'

export const ceresSearch = (fileName = './partII.txt') => {
    const filePath = path.join(process.cwd(), srcFolder, dayFolder,fileName)
    const input = readFile(filePath).split('\n').filter(item => !!item.trim()).map(row => row.split(''))
    console.log(findAllXmas(input))
}

const findAllXmas = (input) => {
    let total = 0
    for(let row = 0; row < input.length;++row) {
        const indices = findAll(input[row], 'A')
        total += indices.reduce((sum, index) => {
            return (
                sum +  isXMas(input, index, row)
            )
        }, 0)
    }
    return total
}

const mas = 'MAS'
const sam = 'SAM'
const isXMas = (input, col, row) => {
    if(outOfBoundry(col, row, input.length)) return 0
    const leftRight = input[row-1][col-1] + input[row][col] + input[row+1][col+1]
    const rightLeft = input[row-1][col+1] + input[row][col] + input[row+1][col-1]
    return ((leftRight === mas || leftRight === sam) && (rightLeft === mas || rightLeft === sam)) ? 1 : 0
}

// const findLeftUp = (input, index, row, second = true) => {
//     if(outOfBoundry(index, row, input.length)) return 0
//     const tmp = input[row][index] + input[row-1][index-1] + input[row-2][index-2]
//     if(tmp === mas) {
//         if(second) return 1
//         return findRightUp(input, index-2, row) + findLeftDown(input,index, row-2)
//     }
//     return 0
// }
// const findRightUp = (input, index, row,  second = true) => {
//     if(outOfBoundry(index, row, input.length)) return 0
//     const tmp = input[row][index] + input[row-1][index+1] + input[row-2][index+2]
//     if(tmp === mas) {
//         if(second) return 1
//         return findRightDown(input, index, row-2) + findLeftUp(input, index+2, row)
//     }
//     return 0
// }
// const findRightDown = (input, index, row,  second = true) => {
//     if(outOfBoundry(index, row, input.length) return 0
//     const tmp = input[row][index] + input[row+1][index+1] + input[row+2][index+2]
//     if(tmp === mas) {
//         if(second) return 1
//         return findRightDown(input,index, row+2) + findLeftDown(input, index+2,row)
//     }
//     return 0
// }
// const findLeftDown = (input, index, row,  second = true) => {
//     if(outOfBoundry(index, row, input.length)) return 0
//     const tmp = input[row][index] + input[row+1][index-1] + input[row+2][index-2]
//     if(tmp === mas) {
//         if(second) return 1
//         return findRightDown(input,index-2,row) + findLeftUp(input, index, row+2)
//     }
//     return 0
// }

const outOfBoundry = (index, row, length) => {
    return index - 1 < 0 || index + 1 >= length || row - 1 < 0 || row + 1 >= length
}
const findAll = (arr, key) => {
    return arr.map((char, index) => char === key ? index : -1 ).filter(ind => ind !== -1)
}

ceresSearch()