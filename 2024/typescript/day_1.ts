import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

function insert_sorted(array: number[], value: number) {
    if (array.length === 0) {
        array.push(value)
        return
    }
    if (value <= array[0]) {
        array.splice(0, 0, value)
        array.join()
        return
    }
    if (value >= array[array.length - 1]) {
        array.push(value)
        return
    }

    var left = 0
    var right = array.length
    while (true) {
        let guess = Math.floor((left + right) / 2)
        if (value >= array[guess] && value <= array[guess + 1]) {
            array.splice(guess + 1, 0, value)
            array.join()
            return
        } else if (value > array[guess]) {
            left = guess
        } else {
            right = guess
        }
    }
}


fs.readFile(path.join(os.homedir(), "projects/advent-of-code/.main/2024/inputs/day_1.txt"), function (err, data) {
    if (err) {
        return console.error(err)
    }
    var textByLine = data.toString().split("\n")
    var left: number[] = []
    var right: number[] = []
    var prev_len = 0
    var right_counts: Map<number, number> = new Map();
    for (let i = 0; i < textByLine.length - 1; i++) {
        var line = textByLine[i].split(/[\s]+/)
        prev_len = left.length
        insert_sorted(left, +line[0])
        insert_sorted(right, +line[1])
        if (right_counts.has(+line[1])) {
            // @ts-expect-error - get will never be undefined because we check has in condition
            right_counts.set(+line[1], right_counts.get(+line[1]) + 1)
        } else {
            right_counts.set(+line[1], 1)
        }
    }
    var difference = 0
    var similarity = 0
    for (let i = 0; i < left.length; i++) {
        difference += Math.abs(left[i] - right[i])
        similarity += right_counts.has(left[i]) ? (left[i] * right_counts.get(left[i])!) : 0
    }
    console.log("Difference: ", difference)
    console.log("Similarity: ", similarity)
})

