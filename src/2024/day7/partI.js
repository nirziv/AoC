import { readFile } from "../../../util.js"
import path from 'path'
import util from 'util'
const srcFolder = 'src/2024'
const dayFolder = 'day7'
const fileName = 'partI.txt'
const filePath = path.join(process.cwd(), srcFolder, dayFolder, fileName)


export const bridgeRepair = () => {
    const input = readFile(filePath).split('\n')
    const validItems = input.filter(item => isValidRow(item) )
    const firstNumbers = validItems.map(item => item.split(':')[0]).map(item => Number.parseInt(item))
    console.log(firstNumbers.reduce((sum, value) => sum+value, 0))
}
const isValidRow = (row) => {
    const [total, ...numbers] = row.match(/\d+/g).map(item => Number.parseInt(item))
    return isValidRowHelper(total, numbers[0], numbers.slice(1))
}

const isValidRowHelper = (total, sum, numbers) => {
    if(numbers.length === 0) {
        return sum
    }
    let tmpSum = isValidRowHelper(total, sum + numbers[0], numbers.slice(1))
    if(tmpSum === true) {
        return tmpSum
    }
    if(tmpSum === total) {
        return true
    }
    sum = isValidRowHelper(total, sum * numbers[0], numbers.slice(1))
    if(sum === true) {
        return sum
    }
    return sum === total

}
bridgeRepair()