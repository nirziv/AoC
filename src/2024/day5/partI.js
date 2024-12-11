import { readFile } from "../../../util.js"
import path from 'path'

const srcFolder = 'src/2024'
const dayFolder = 'day5'
const fileName = 'partI.txt'
const filePath = path.join(process.cwd(), srcFolder, dayFolder, fileName)
export const printQueue = () => {
    const input = readFile(filePath).split('\n').filter(item => !!item.trim()).map(row => row.split('|'))
    const {rules, items} = parseInput(input)
    const validOrders = getAllValidOrders(rules, items)
    const total = sumMiddle(validOrders)
    console.log(total)
}

const sumMiddle = (validOrders) => {
    return validOrders.reduce((sum, item) => {
        const middleIndex = Math.ceil(item.length/2) -1
        return sum + Number.parseInt(item[middleIndex])
    }, 0)
}
const getAllValidOrders = (rules, items) => {
    return items.filter(item => {
        return item.every((number, index) => {
            if(!(number in rules)) {
                return true
            }
            while(--index >=0) {
                const previousNumber = item[index]
                if(rules[number].includes(previousNumber)) {
                    return false
                }
            }
            return true
        })
    })
}

const parseInput = (input) => {
    const rules = {}
    const items = []
    let index
    for(index = 0; input[index].length == 2 && index < input.length; ++index) {
        const [first,second] = input[index]
        if(!(first in rules)) {
            rules[first] = []
        }
        rules[first].push(second)
    }
    --index
    while(++index < input.length) {
        items.push(input[index][0].split(','))
    }
    return {rules, items}
}

printQueue()

