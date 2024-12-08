/**
 * Advent of Code Day 8
 * 12/08/2024
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';


fs.readFile(path.join(os.homedir(), "projects/advent-of-code/.main/2024/inputs/day_8.txt"), (err, data) => {
    if (err) {
        console.error(err)
    }
    let input = data.toString()
    var lines = input.split("\n")
    let gridSize = lines.length - 1
    var antennaLocations: Map<string, number[]> = new Map()
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (lines[i][j] === "." || lines[i][j] === "") {
                continue
            }
            if (antennaLocations.has(lines[i][j])) {
                antennaLocations.get(lines[i][j])!.push(i * gridSize + j)
            } else {
                antennaLocations.set(lines[i][j], [i * gridSize + j])

            }
        }
    }
    var antinodeLocations: Set<number> = new Set()
    var antinodeLocationsErrorFree: Set<number> = new Set()
    for (let [, locations] of antennaLocations) {
        for (let i = 0; i < locations.length - 1; i++) {
            for (let j = i + 1; j < locations.length; j++) {
                let [x1, y1, x2, y2] = [
                    Math.floor(locations[i] / gridSize),
                    locations[i] % gridSize,
                    Math.floor(locations[j] / gridSize),
                    locations[j] % gridSize
                ]
                let [deltaX, deltaY] = [x2 - x1, y2 - y1]
                if (x1 - deltaX >= 0 && x1 - deltaX < gridSize && y1 - deltaY >= 0 && y1 - deltaY < gridSize) {
                    antinodeLocations.add((x1 - deltaX) * gridSize + y1 - deltaY)
                }
                if (x2 + deltaX >= 0 && x2 + deltaX < gridSize && y2 + deltaY >= 0 && y2 + deltaY < gridSize) {
                    antinodeLocations.add((x2 + deltaX) * gridSize + y2 + deltaY)
                }

                var multiplier = 0
                while (true) {
                    if (x1 - deltaX * multiplier >= 0 && x1 - deltaX * multiplier < gridSize && y1 - deltaY * multiplier >= 0 && y1 - deltaY * multiplier < gridSize) {
                        antinodeLocationsErrorFree.add((x1 - deltaX * multiplier) * gridSize + y1 - deltaY * multiplier)
                        multiplier += 1
                    } else { break }
                }
                var multiplier = -1
                while (true) {
                    if (x1 - deltaX * multiplier >= 0 && x1 - deltaX * multiplier < gridSize && y1 - deltaY * multiplier >= 0 && y1 - deltaY * multiplier < gridSize) {
                        antinodeLocationsErrorFree.add((x1 - deltaX * multiplier) * gridSize + y1 - deltaY * multiplier)
                        multiplier -= 1
                    } else { break }
                }
            }
        }
    }
    console.log("Number of antinodes:", antinodeLocations.size)
    console.log("Number of error free antinodes:", antinodeLocationsErrorFree.size)
})
