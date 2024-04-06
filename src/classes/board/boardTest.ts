import Board from "./Board";
import { readFileSync } from "fs";

const fileName = process.argv[2]

const fileLines = readFileSync(`puzzles/${fileName}`, 'utf8').split('\n')
const N = parseInt(fileLines[0])

const tiles = Array(N).fill(Array(N))

fileLines.forEach((line, row) => {
  if (row === 0) return

  const nums = line.split(" ").map((s) => parseInt(s)).filter((x) => !isNaN(x))

  if (nums.length === 0) return

  tiles[row - 1] = nums
})

const callBoard = new Board(tiles)

console.log(callBoard.dimension())
console.log(callBoard.toString())
console.log(callBoard.hamming())
console.log(callBoard.manhattan())

