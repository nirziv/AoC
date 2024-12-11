import fs from 'fs'

export const readFile = (fileName, encode = 'utf-8') => {
    return fs.readFileSync(fileName, encode)
} 
