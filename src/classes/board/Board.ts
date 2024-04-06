class Board {
    tiles: number[][]

    constructor(tiles: number[][]) {
        this.tiles = tiles
    }

    toString(): string {
        console.log(this.tiles)
        let represent = ''
        for (const row of this.tiles) {
            for (const column of row) {
                represent += column + ' '
            }
            represent += '\n'
        }
        return represent;
    }

    // board dimension n
    dimension(): number {
        return this.tiles.length;
    }

    // number of tiles out of place
    hamming(): number {
        // PLS MODIFY
        return 0;
    }

    // sum of Manhattan distances between tiles and goal
    manhattan(): number {
        // PLS MODIFY
        return 0;
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
