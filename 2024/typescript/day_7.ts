/**
 * Advent of Code day 7
 * 12/07/2024
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';


fs.readFile(path.join(os.homedir(), "projects/advent-of-code/.main/2024/inputs/day_7.txt"), (err, data) => {
    if (err) {
        console.error(err)
    }

    let input = data.toString().split("\n")
    var sum = 0
    for (let line of input) {
        if (line === "") {
            continue
        }
        let [target, numStr] = line.split(": ")
        let numList = numStr.split(" ")
        var wew: number[] = [+numList[0]]
        for (let i = 1; i < numList.length; i++) {
            var new_: number[] = []
            for (let num of wew) {
                let partialSum = num + (+numList[i])
                let partialProduct = num * (+numList[i])
                let partialConcat = +(num.toString() + numList[i])
                if (partialSum <= +target) {
                    new_.push(partialSum)
                }
                if (partialProduct <= +target) {
                    new_.push(partialProduct)
                }

                // Comment out the block below to get the answer for part 1
                if (partialConcat <= +target) {
                    new_.push(partialConcat)
                }
            }
            wew = new_
        }
        if (wew.includes(+target)) {
            sum += +target
        }
    }
    console.log("Calibration result:", sum)

})
