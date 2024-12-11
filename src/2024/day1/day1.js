import { readFile } from "../../../util.js"
import path from 'path'


export const historianHysteriaPartI = (fileName = './day1InputPartI.txt') => {
    const filePath = path.join(process.cwd(), 'src','2024', 'day1',fileName)
    const input = readFile(filePath).split('\n').filter(item => !!item.trim())
    const arrLeft = []
    const arrRight = []
    input.forEach(item => {
        const columns = item.split(' ').filter(item => !!item.trim()).map(val => Number.parseInt(val))
        arrLeft.push(columns[0])
        arrRight.push(columns[1])
    })
    arrLeft.sort()
    arrRight.sort()
    const total = arrLeft.reduce((sum, value, index) => {
        return sum + Math.abs(value - arrRight[index])
        
    }, 0)
    console.log(total)
}

export const historianHysteriaPartII = (fileName = 'day1InputPartII.txt') => {
    
    const filePath = path.join(process.cwd(), 'src','2024', 'day1',fileName)
    const input = readFile(filePath).split('\n').filter(item => !!item.trim())
    const arrLeft = {}
    const arrRight = {}
    input.forEach(item => {
        const columns = item.split(' ').filter(item => !!item.trim()).map(val => Number.parseInt(val))
        if(!(columns[0] in arrLeft)) {
            arrLeft[columns[0]] = 0
        }
        arrLeft[columns[0]] = arrLeft[columns[0]] + 1
        
        if(!(columns[1] in arrRight)) {
            arrRight[columns[1]] = 0
        }
        arrRight[columns[1]] = arrRight[columns[1]] + 1
    })
    let sum = 0
    Object.keys(arrLeft).forEach(key => {
        if(key in arrRight)  {
            sum += key * arrLeft[key]*arrRight[key]
        }
    })
    console.log(sum)
}

historianHysteriaPartII();