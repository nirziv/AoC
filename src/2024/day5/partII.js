import { readFile } from "../../../util.js"
import path from 'path'

const srcFolder = 'src/2024'
const dayFolder = 'day5'
const fileName = 'partI.txt'
const filePath = path.join(process.cwd(), srcFolder, dayFolder, fileName)
export const printQueue = () => {
    const input = readFile(filePath).split('\n').filter(item => !!item.trim()).map(row => row.split('|'))
    const {rules, items} = parseInput(input)
    const invalidOrders = getAllInvalidOrders(rules, items)
    const fixedOrders = fixOrders(rules, invalidOrders)
    const total = sumMiddle(fixedOrders)
    console.log(total)
}

const fixOrders = (rules, items) => {
    const fixed = []
    for(let index =0; index < items.length;++index) {
        const item = items[index]
        let tmp = [item[0]]
        for(let itemIndex = 1; itemIndex < item.length; ++itemIndex) {
            if(!(item[itemIndex] in rules)) {
                tmp.push(item[itemIndex])
                continue
            }
            let inserted = false
            for(let tmpIndex =0; tmpIndex < tmp.length; ++tmpIndex) {
                if(rules[item[itemIndex]].includes(tmp[tmpIndex])) {
                    tmp.splice(tmpIndex, 0, item[itemIndex])
                    inserted = true
                    break;
                }
            }
            if(!inserted) {
                tmp.push(item[itemIndex])
            }
        }

        fixed.push([...tmp])
        tmp = []
    }
    return fixed
}


const sumMiddle = (validOrders) => {
    return validOrders.reduce((sum, item) => {
        const middleIndex = Math.ceil(item.length/2) -1
        return sum + Number.parseInt(item[middleIndex])
    }, 0)
}
const getAllInvalidOrders = (rules, items) => {
    return items.filter(item => {
        return !item.every((number, index) => {
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

