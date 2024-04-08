class Board {
    tiles: number[][]

    constructor(tiles: number[][]) {
        this.tiles = tiles
    }

    toString(): string {
        console.log(this.tiles)
        let represent = ''
        for (const row of this.tiles) {
            for (const col of row) {
                represent += col + ' '
            }
            represent += '\n'
        }
        return represent;
    }

    dimension(): number {
        return this.tiles.length;
    }

    hamming(): number {
        let outOfPlace = -1
        for (let row = 0; row < this.dimension(); row += 1) {
            for (let col = 0; col < this.dimension(); col += 1) {
                const expectedValue = row * this.dimension() + col + 1
                const actualValue = this.tiles[row][col]
                if (expectedValue !== actualValue) {
                    outOfPlace += 1
                }
            }
        }
        return outOfPlace;
    }

    manhattan(): number {
        let totalManhattanDistance = 0
        for (let row = 0; row < this.dimension(); row += 1) {
            for (let col = 0; col < this.dimension(); col += 1) {
                const actualValue = this.tiles[row][col]

                if (actualValue !== 0) {
                    const expectedRow = Math.floor((actualValue - 1) / this.dimension())
                    const expectedCol = (actualValue - 1) % this.dimension()

                    const manhattanDistance = Math.abs(row - expectedRow) + Math.abs(col - expectedCol)

                    totalManhattanDistance += manhattanDistance
                }
            }
        }
        return totalManhattanDistance;
    }

    isGoal(): boolean {
        return this.manhattan() === 0
    }

    equals(otherBoard: Board): boolean {
        if (this.dimension() !== otherBoard.dimension()) {
            return false
        }

        for (let row = 0; row < this.dimension(); row += 1) {
            for (let col = 0; col < this.dimension(); col += 1) {
                if (this.tiles[row][col] !== otherBoard.tiles[row][col]) {
                    return false
                }
            }
        }

        return true
    }

    neighbors(): Board[] {
        const emptyPosition = () => {
            for (let row = 0; row < this.dimension(); row += 1) {
                for (let col = 0; col < this.dimension(); col += 1) {
                    if (this.tiles[row][col] === 0) {
                        return [row, col]
                    }
                }
            }
            throw new Error("Blank square not found.")
        }

        const isValidPosition = (row: number, col: number) => {
            return row >= 0 && row < this.dimension() && col >= 0 && col < this.dimension()
        }

        const neighboringBoards: Board[] = []

        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]

        const [emptyRow, emptyCol] = emptyPosition()

        for (const [x, y] of directions) {
            const newRow = emptyRow + x
            const newCol = emptyCol + y

            if (isValidPosition(newRow, newCol)) {
                const clonedTiles: number[][] = this.tiles.map(row => [...row]);

                [clonedTiles[emptyRow][emptyCol], clonedTiles[newRow][newCol]] = [clonedTiles[newRow][newCol], clonedTiles[emptyRow][emptyCol]];

                neighboringBoards.push(new Board(clonedTiles))
            }
        }

        return neighboringBoards
    }

    twin(): Board {
        const clonedTiles: number[][] = this.tiles.map(row => [...row]);

        let firstTileFound = false;
        let firstTileRow = 0;
        let firstTileCol = 0;
        for (let col = 0; col < this.dimension(); col += 1) {
            if (clonedTiles[0][col] !== 0) {
                if (!firstTileFound) {
                    firstTileRow = 0;
                    firstTileCol = col;
                    firstTileFound = true;
                } else {
                    [clonedTiles[0][firstTileCol], clonedTiles[0][col]] = [clonedTiles[0][col], clonedTiles[0][firstTileCol]];
                    break;
                }
            }
        }

        return new Board(clonedTiles);
    }
}

export default Board;
