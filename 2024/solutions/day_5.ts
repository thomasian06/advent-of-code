import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';


fs.readFile(path.join(os.homedir(), "projects/adventofcode/2024/inputs/day_5.txt"), function (err, data) {
    if (err) {
        return console.error(err)
    }
    var input = data.toString()
    let split = input.split("\n\n")
    var outgoingEdges: Map<string, Set<string>> = new Map()
    for (let edge of split[0].split("\n")) {
        let splitty = edge.split("|")
        if (splitty[0] === splitty[1]) {
            console.log("poop")
        }
        if (outgoingEdges.has(splitty[0])) {
            outgoingEdges.get(splitty[0])!.add(splitty[1])
        } else {
            outgoingEdges.set(splitty[0], new Set([splitty[1]]))
        }

        if (!outgoingEdges.has(splitty[1])) {
            outgoingEdges.set(splitty[1], new Set())
        }
    }

    var validSum = 0
    var invalidSum = 0
    for (let listStr of split[1].split("\n")) {
        if (listStr === '') {
            continue
        }
        var visited: Set<string> = new Set()
        var valid = true
        let nodes = listStr.split(",")
        for (let node of nodes) {
            if (!valid) {
                break
            }
            visited.add(node)

            // Run BFS on tree
            var searchVisited: Set<string> = new Set()
            var nextList: string[] = []
            for (let outgoingNode of outgoingEdges.get(node)!) {
                if (!searchVisited.has(outgoingNode) && nodes.includes(outgoingNode)) {
                    nextList.push(outgoingNode)
                }
            }

            while (nextList.length > 0) {
                let nextNode = nextList.pop()!
                searchVisited.add(nextNode)
                if (visited.has(nextNode)) {
                    valid = false
                    break
                }
                for (let outgoingNode of outgoingEdges.get(nextNode)!) {
                    if (!searchVisited.has(outgoingNode) && nodes.includes(outgoingNode)) {
                        nextList.push(outgoingNode)
                    }
                }
            }
        }
        if (!valid) {
            var sortedNodes: string[] = []

            var oGraph: Map<string, Set<string>> = new Map()
            var iGraph: Map<string, Set<string>> = new Map()
            for (let [node, edges] of outgoingEdges.entries()) {
                for (let edge of edges) {
                    if (nodes.includes(node) && nodes.includes(edge)) {
                        if (oGraph.has(node)) {
                            oGraph.get(node)!.add(edge)
                        } else {
                            oGraph.set(node, new Set([edge]))
                        }
                        if (iGraph.has(edge)) {
                            iGraph.get(edge)!.add(node)
                        } else {
                            iGraph.set(edge, new Set([node]))
                        }
                    }
                }
            }

            var nextList: string[] = []
            while (oGraph.size > 0) {
                if (nextList.length == 0) {
                    for (const key of oGraph.keys()) {
                        nextList.push(key)
                        break
                    }
                }
                let node = nextList[nextList.length - 1]
                let nextNodes: Set<string> = oGraph.has(node) ? oGraph.get(node)! : new Set()
                if (nextNodes.size === 0) {
                    sortedNodes.push(node)
                    let incomingNodes: Set<string> = iGraph.has(node) ? iGraph.get(node)! : new Set()
                    for (let incomingNode of incomingNodes) {
                        oGraph.get(incomingNode)!.delete(node)
                    }
                    oGraph.delete(node)
                    nextList.pop()
                    continue
                }
                for (const nextNode of nextNodes) {
                    iGraph.has(nextNode) ? iGraph.get(nextNode)!.delete(node) : null
                    nextNodes.delete(nextNode)
                    nextList.push(nextNode)
                    break
                }
            }
            invalidSum += +sortedNodes[Math.floor(sortedNodes.length / 2)]
            continue

        }
        validSum += +nodes[Math.floor(nodes.length / 2)]

    }
    console.log("Valid sum", validSum)
    console.log("Invalid sum", invalidSum)
})
