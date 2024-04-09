import { MinHeap } from "min-heap-typed";
import Board from "./board/Board";
import SearchNode from './SearchNode'

class Solver {
    private initialBoard: Board;
    private solutionFound: boolean;
    private solutionMoves: number;
    private solutionBoards: Board[];

    constructor(initial: Board) {
        if (initial.dimension() < 2 || initial.dimension() >= 128) {
            throw new Error("Invalid board dimension");
        }
        this.initialBoard = initial;
        this.solutionFound = false;
        this.solutionMoves = -1;
        this.solutionBoards = [];

        const priorityQueue = new MinHeap<Board>();

        priorityQueue.add(initial);
        priorityQueue.add(initial.twin());

        while (!priorityQueue.isEmpty()) {
            const currentBoard = priorityQueue.poll();

            if (currentBoard && currentBoard.isGoal()) {
                this.solutionFound = true;
                this.solutionMoves = currentBoard.manhattan();
                this.buildSolution(currentBoard);
                break;
            }

            if (currentBoard) {
                const neighbors = currentBoard.neighbors();
                for (const neighbor of neighbors) {
                    if (!neighbor.equals(currentBoard)) {
                        priorityQueue.add(neighbor);
                    }
                }
            }
        }
    }

    private buildSolution(board: Board) {
        this.solutionBoards = [];
        let currentBoard: Board = board;
        const visited: Board[] = [];

        while (!currentBoard.isGoal()) {
            this.solutionBoards.unshift(currentBoard);
            visited.push(currentBoard);

            const neighbors = currentBoard.neighbors();
            const unvisitedNeighbors = neighbors.filter((neighbor) => !visited.includes(neighbor));
            currentBoard = unvisitedNeighbors.reduce((minBoard, neighbor) => {
                return neighbor.manhattan() < minBoard.manhattan() ? neighbor : minBoard;
            }, currentBoard);
        }

        this.solutionBoards.unshift(currentBoard);
    }

    isSolvable(): boolean {
        return this.solutionFound;
    }

    moves(): number {
        return this.solutionMoves;
    }

    solution(): Board[] {
        return this.solutionBoards;
    }
}

export default Solver;
