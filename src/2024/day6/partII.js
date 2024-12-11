import { readFile } from "../../../util.js"
import path from 'path'
import util from 'util'
const srcFolder = 'src/2024'
const dayFolder = 'day6'
const fileName = 'partII.txt'
const filePath = path.join(process.cwd(), srcFolder, dayFolder, fileName)
const Directions = Object.freeze({
    UP: Symbol('up'),
    DOWN: Symbol('down'),
    LEFT: Symbol('left'),
    RIGHT: Symbol('right')
})

export const guardGallivant = () => {
    const input = readFile(filePath).split('\n').map(item => item.split(''))
    const {rowIndex, columnIndex, direction} = findGuard(input)
    input[rowIndex][columnIndex] = 1
    let totalBlockedOptions = 0
    for(let row = 0; row < input.length; ++row) {
       for(let column = 0; column < input[row].length; ++column) {
           if(input[row][column] !== '.') continue
            const clone = cloneInput(input)
            clone[row][column] = '#'
            // clone[7][6] = '#'
            totalBlockedOptions += startWalking({row: rowIndex, column:columnIndex, direction, input:clone })
       }
    }
    
    console.log(totalBlockedOptions)
}
const cloneInput = (input) => {
    const clone = []
    input.forEach(item => {
        clone.push([...item])
    })
    return clone
}
const startWalking = ({row, column, direction, input}) => {
    let totalSteps = 1
    let stop = false
    
    while (!stop) { // (rowIndex >= 0 && rowIndex < input.length && columnIndex >= 0 && columnIndex < input[rowIndex].length) {
        switch(direction) {
            case Directions.UP:
                if(row -1 < 0) {
                    stop = true
                    break
                }
                if(canMoveUp({row,column, input})) {
                    row--
                    input[row][column] = isNaN(input[row][column]) ? 1 : input[row][column] + 1
                } else {
                    direction = Directions.RIGHT
                }
                break;
            case Directions.RIGHT:
                if(column + 1 >= input[row].length) {
                    stop = true
                    break
                }
                if(canMoveRight({row,column, input})) {
                    column++
                    input[row][column] = isNaN(input[row][column]) ? 1 : input[row][column] + 1
                } else {
                    direction = Directions.DOWN
                }
                break;
            case Directions.DOWN:
                if(row+1 >= input.length) {
                    stop = true
                    break
                }
                if(canMoveDown({row, column, input})) {
                    row++
                    input[row][column] = isNaN(input[row][column]) ? 1 : input[row][column] + 1
                } else {
                    direction = Directions.LEFT
                }
                break;
            case Directions.LEFT:
                if(column - 1 < 0) {
                    stop = true
                    break
                }
                if(canMoveLeft({ row, column, input})) {
                    column--
                    input[row][column] = isNaN(input[row][column]) ? 1 : input[row][column] + 1
                } else {
                    direction = Directions.UP
                }
                break;
            default:
                stop = true
        }
        if(!isNaN(input[row][column]) && input[row][column] >= input.length) {
            return 1
        }
    }
    
    
    return 0
}
const canMoveUp = ({row, column, input}) => input[row-1][column] !== '#'
const canMoveDown = ({row,column, input}) => input[row+1][column] !== '#'
const canMoveRight = ({row,column,input}) => input[row][column+1] !== '#'
const canMoveLeft = ({row,column,input}) => input[row][column-1] !== '#'
const findGuard = (input) => {
    let column
    let row
    for(row = 0; row < input.length; ++row) {
        column = input[row].indexOf('^')
        if(column > -1){
            break;
        }
    }

    return {rowIndex: row, columnIndex: column, direction:Directions.UP}
}

guardGallivant()