import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';


fs.readFile(path.join(os.homedir(), "projects/adventofcode/2024/inputs/day_4.txt"), function (err, data) {
    if (err) {
        return console.error(err)
    }
    var input = data.toString().replace(/\s/g, "")
    var size = Math.sqrt(input.length)
    var matchSize = 4
    var count = 0
    var match = "XMAS"

    // HORIZONTAL
    var mask = [0, 1, 2, 3]
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size - matchSize + 1; j++) {
            let indices = mask.map(index => index + i * size + j)
            let testStr = indices.map(index => input[index]).join('')
            if (testStr === match) {
                count++
            } else if (testStr.split('').reverse().join('') === match) {
                count++
            }
        }
    }

    // VERTICAL
    mask = [0, 1 * size, 2 * size, 3 * size]
    for (let i = 0; i < size - matchSize + 1; i++) {
        for (let j = 0; j < size; j++) {
            let indices = mask.map(index => index + i * size + j)
            let testStr = indices.map(index => input[index]).join('')
            if (testStr === match) {
                count++
            } else if (testStr.split('').reverse().join('') === match) {
                count++
            }
        }
    }

    // DIAGONAL
    mask = [0, 1 * size + 1, 2 * size + 2, 3 * size + 3]
    for (let i = 0; i < size - matchSize + 1; i++) {
        for (let j = 0; j < size - matchSize + 1; j++) {
            let indices = mask.map(index => index + i * size + j)
            let testStr = indices.map(index => input[index]).join('')
            if (testStr === match) {
                count++
            } else if (testStr.split('').reverse().join('') === match) {
                count++
            }
        }
    }

    // COUNTERDIAGONAL
    mask = [3, 1 * size + 2, 2 * size + 1, 3 * size]
    for (let i = 0; i < size - matchSize + 1; i++) {
        for (let j = 0; j < size - matchSize + 1; j++) {
            let indices = mask.map(index => index + i * size + j)
            let testStr = indices.map(index => input[index]).join('')
            if (testStr === match) {
                count++
            } else if (testStr.split('').reverse().join('') === match) {
                count++
            }
        }
    }
    console.log("XMAS count:", count)

    var count = 0
    var matchArray = ["MSAMS", "MMASS", "SMASM", "SSAMM"]
    var mask = [0, 2, size + 1, 2 * size, 2 * size + 2]
    var matchSize = 3
    for (let i = 0; i < size - matchSize + 1; i++) {
        for (let j = 0; j < size - matchSize + 1; j++) {
            let indices = mask.map(index => index + i * size + j)
            let testStr = indices.map(index => input[index]).join('')
            if (matchArray.includes(testStr)) {
                count++
            }
        }
    }
    console.log("X-MAS count:", count)


})
