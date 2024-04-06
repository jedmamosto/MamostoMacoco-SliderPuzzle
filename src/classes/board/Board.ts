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

    // is this board the goal board?
    isGoal(): boolean {
        // PLS MODIFY
        return true;
    }

    // does this board equal y?
    equals(y: Board): boolean {
        // PLS MODIFY
        return true;
    }

    // all neighboring boards
    neighbors(): Board[] {
        // PLS MODIFY
        return [];
    }

    // a board that is obtained by exchanging any pair of tiles
    twin(): Board {
        // PLS MODIFY
        return new Board([[]]);
    }
}

export default Board;
