import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

function mulInString(str: string): number {
    const re = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g
    var sum = 0
    for (let match of str.matchAll(re)) {
        sum += (+match[1]) * (+match[2])
    }
    return sum
}

fs.readFile(path.join(os.homedir(), "projects/adventofcode/2024/inputs/day_3.txt"), function (err, data) {
    if (err) {
        return console.error(err)
    }
    const value = data.toString()
    var sum = mulInString(value)
    console.log("Sum:", sum)

    const doRe = /don't\(\)(.|\n)*?do\(\)/g
    for (let match of value.match(doRe)!) {
        sum -= mulInString(match)
    }
    console.log("Corrected sum:", sum)
})
