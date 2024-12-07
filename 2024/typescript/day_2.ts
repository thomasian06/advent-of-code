import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

function checkLevels(levelList: string[]): boolean {
    var sign = +levelList[1] > +levelList[0]
    var safe = true
    for (let i = 1; i < levelList.length; i++) {
        if (sign === +levelList[i] < +levelList[i - 1]) {
            safe = false
            break
        }
        let diff = Math.abs(+levelList[i] - +levelList[i - 1])
        if (diff < 1 || diff > 3) {
            safe = false
            break
        }
    }
    return safe
}


fs.readFile(path.join(os.homedir(), "projects/advent-of-code/.main/2024/inputs/day_2.txt"), function (err, data) {
    if (err) {
        return console.error(err)
    }
    var levelStrings = data.toString().split("\n")
    var numSafeLevels = 0
    var numSafeLevelsAfterDampener = 0
    for (let levelString of levelStrings) {
        if (levelString.length === 0) {
            continue
        }
        let levelList = levelString.split(/[\s]+/)
        if (checkLevels(levelList)) {
            numSafeLevels += 1
            numSafeLevelsAfterDampener += 1
            continue
        }
        for (let i = 0; i < levelList.length; i++) {
            if (checkLevels([...levelList.slice(0, i), ...levelList.slice(i + 1)])) {
                numSafeLevelsAfterDampener += 1
                break
            }
        }

    }
    console.log(numSafeLevels)
    console.log(numSafeLevelsAfterDampener)
})
