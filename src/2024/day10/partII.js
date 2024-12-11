import { readFile } from "../../../util.js"
import path, { posix } from 'path'
import util from 'util'
const srcFolder = 'src/2024'
const dayFolder = 'day10'
const fileName = 'partI.txt'
const filePath = path.join(process.cwd(), srcFolder, dayFolder, fileName)


export const hoof = () => {
    const input = readFile(filePath)
    .split('\n')
    .map(item => item.split('').map(element => !Number.isNaN(Number.parseInt(element)) ? Number.parseInt(element) : element))
    console.log(calculateTailHead(input))
}

const calculateTailHead = (input) => {
    const stack = input.flatMap(
        (item, row) => {
            return item.map((element, column) => element === 0 ? {elevation:element, position: {row, column}}: null).filter(item => item !== null)
        }
    ).filter(item => item.length !== 0)
    let total = 0
    const savedInput = copyInput(input)
    
    while(stack.length > 0) {
       
        const {elevation, position:{row, column}} = stack.pop()
        
        if(elevation === 9) {
            total++
        }
        if(shouldInclude(row-1, column, input, elevation)) { // check up
            stack.push({elevation: input[row-1][column], position:{row: row-1, column}})
        }
        if(shouldInclude(row+1, column, input, elevation)) { // check down
            stack.push({elevation: input[row+1][column], position:{row: row+1, column}})
        }
        if(shouldInclude(row, column-1, input, elevation)) { // check left
            stack.push({elevation: input[row][column-1], position:{row, column: column-1}})
        }
        if(shouldInclude(row, column+1, input, elevation)) { // check right
            stack.push({elevation: input[row][column+1], position:{row, column: column+1}})
        }
    }
    return total
}


const shouldInclude = (row, column, input, elevation) => {

    if(row < 0 || column < 0 || row >= input.length || column >= input[row].length) return false
    return input[row][column] === (elevation +1)
}

hoof()