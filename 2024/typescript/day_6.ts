/**
 * 06/12/2024
 * Day 6 of advent of code
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

/**
 * Simulate a guard running through the grid
 * @param directions ordered list of index deltas to step in a direction
 * @param currentPosition current position in the map
 * @param gridSize size of the map (sidelength, assumes square map)
 * @param obstacles a set of the index locations of the obstacles
 *
 * @returns a map of unique positions and the directions they've been stepped on, along with a boolean
 *          that says whether or not the guard was able to exit the map
 */
function simulate(
    gridSize: number,
    currentPosition: number,
    directions: number[],
    obstacles: Set<number>,
): [Map<number, Set<number>>, boolean] {

    const numDirections = directions.length
    var uniquePositions: Map<number, Set<number>> = new Map()
    var directionIndex = 0
    uniquePositions.set(currentPosition, new Set([directionIndex]))

    while (true) {
        var nextPosition = currentPosition + directions[directionIndex]

        if (directionIndex % 2 === 0) {
            if (nextPosition < 0 || nextPosition >= gridSize * gridSize) {
                break
            }
        } else {
            if (Math.floor(currentPosition / gridSize) !== Math.floor(nextPosition / gridSize)) {
                break
            }
        }

        if (obstacles.has(nextPosition)) {
            directionIndex = (directionIndex + 1) % numDirections
            continue
        }

        if (uniquePositions.has(nextPosition) && uniquePositions.get(nextPosition)!.has(directionIndex)) {
            return [uniquePositions, false]
        }

        currentPosition = nextPosition
        if (uniquePositions.has(currentPosition)) {
            uniquePositions.get(currentPosition)!.add(directionIndex)
        } else {
            uniquePositions.set(currentPosition, new Set([directionIndex]))
        }

    }
    return [uniquePositions, true]
}

fs.readFile(path.join(os.homedir(), "projects/advent-of-code/.main/2024/inputs/day_6.txt"), (err, data) => {
    if (err) {
        return console.error(err)
    }

    let inputList = data.toString().split("\n")
    let gridSize = inputList.length - 1
    let obstacles: Set<number> = new Set()
    var currentPosition = 0
    for (let i = 0; i < gridSize * gridSize; i++) {
        let rowIndex = Math.floor(i / gridSize)
        let colIndex = i % gridSize
        let char = inputList[rowIndex][colIndex]
        if (char === '#') {
            obstacles.add(i)
        } else if (char === '^') {
            currentPosition = i
        }
    }

    let directions = [-gridSize, 1, gridSize, -1]

    var validObstacleLocations: number = 0

    let [uniquePositions,] = simulate(gridSize, currentPosition, directions, obstacles)
    for (let obstacleLocation of uniquePositions.keys()) {
        if (obstacleLocation === currentPosition) {
            continue
        }
        obstacles.add(obstacleLocation)
        let [, obstacleExited] = simulate(gridSize, currentPosition, directions, obstacles)
        obstacles.delete(obstacleLocation)
        if (!obstacleExited) {
            validObstacleLocations++
        }
    }

    console.log("Unique positions:", uniquePositions.size)
    console.log("Valid obstacle positions:", validObstacleLocations)

})
