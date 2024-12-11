import { readFile } from "../../../util.js"
import path, { posix } from 'path'
import util from 'util'
const srcFolder = 'src/2024'
const dayFolder = 'day11'
const fileName = 'partI.txt'
const filePath = path.join(process.cwd(), srcFolder, dayFolder, fileName)

export const plutonianPebbles = () => {
    let input = readFile(filePath)
    .split(' ')
    .reduce((dic, key, index) => {

        if(!(key in dic)) {
            dic[key] = 0
        }
        dic[key]+= 1
        return dic
    },{})
    let blinks = 0
    while(blinks < 75 )
    {
        let index = 0
        //let key = findNextIndex(input,index)
        let blinkDic = {}
        let counter = 0
        for(const key in input) {
             if(key === '0') {
                if(!('1'in blinkDic)) {
                    blinkDic['1'] = input['0'] || 1
                } else {
                    blinkDic['1'] += input['0']
                }
             } else if((key.length % 2) === 0) {
                const firstPart = Number.parseInt(key.substring(0, key.length/2)).toString()
                const secondPart = Number.parseInt(key.substring(key.length/2)).toString()
                if(!(firstPart in blinkDic)) {
                    blinkDic[firstPart] = input[key] || 1
                } else {
                    blinkDic[firstPart] += input[key]
                }
                if(!(secondPart in blinkDic)){
                    blinkDic[secondPart] = input[key] || 1
                }else {
                    blinkDic[secondPart] += input[key]
                }
             } else {
                const newKey = (Number.parseInt(key)*2024).toString()
                if(!(newKey in blinkDic)) {
                    blinkDic[newKey] = input[key] || 1
                }else {
                    blinkDic[newKey] += input[key]
                }
            }
            ++index
            ++counter

        } 
        input = {...blinkDic}
        ++blinks
    }
    console.log(calculateTotalItems(input))
    
}

const calculateTotalItems = (input) => {
    let total = 0
    for(const key in input) {
        total += input[key]
    }
    return total
}
const findNextIndex = (input, index) => {
    
    for(const key in input) {
        if(input[key].includes(index)) {
            return key
        }
    }
    return null
}
plutonianPebbles()