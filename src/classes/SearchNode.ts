import Board from "./board/Board";

class SearchNode {
  board: Board;
  moves: number;
  previousSearchNode: SearchNode | null;

  constructor(board: Board, moves: number, previousSearchNode: SearchNode | null = null) {
    this.board = board;
    this.moves = moves;
    this.previousSearchNode = previousSearchNode;
  }

  priority(): number {
    return this.moves + this.board.hamming()
  }
}