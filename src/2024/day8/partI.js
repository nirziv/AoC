import { readFile } from "../../../util.js"
import path from 'path'

const srcFolder = 'src/2024'
const dayFolder = 'day8'
const fileName = 'partI.txt'
const filePath = path.join(process.cwd(), srcFolder, dayFolder, fileName)


export const collinearity = () => {
    const input = readFile(filePath).split('\n')
    const inputDic = createDictionary(input)
    let good = []
    
        for(let i = 0; i < input.length; ++ i) {
            for(let j = 0; j < input[i].length; ++j) {
                Object.keys(inputDic).forEach(key => {
                    const list = inputDic[key]
                    
                    for(let idx1 = 0; idx1 < list.length; ++idx1) {
                        for(let idx2 = 0; idx2 < list.length; ++idx2) {
                            if(idx1 === idx2) {
                                continue
                            }
                            
                            let dv = [list[idx2][0] - list[idx1][0], list[idx2][1] - list[idx1][1]]
                            let dc = [i - list[idx1][0], j-list[idx1][1]]
                            let dcperp = [-dc[1], dc[0]]
                            if((dcperp[0] * dv[0] + dcperp[1] * dv[1]) === 0){
                                let d1 = distance([i,j], list[idx1])
                                let d2 = distance([i,j], list[idx2])
                                if(Math.abs(d1-d2*2) < 1e-8 || Math.abs(d2 - d1 * 2) < 1e-8){
                                    if(good.some((value => value[0] === i && value[1] === j))) {
                                        break
                                    }
                                    good.push([i,j])
                                    break;
                                }

                            }
                        }
                    }
                });
            }
    
        }
    
    console.log(good.length)
}
const distance = (point1, point2) => Math.sqrt((point1[0] - point2[0])**2 + (point2[1] - point2[1])**2)
const createDictionary = (input) => {
    return input.reduce((dic, row, rowIndex) => {
        for(let columnIndex = 0; columnIndex < row.length; ++columnIndex) {
            const key = row[columnIndex]
            if(key === '.') {
                continue;
            }

            if(!(key in dic)) {
                dic[key] = []
            }
            dic[key].push([rowIndex, columnIndex])
        }
        return dic
    }, {})
}
collinearity()