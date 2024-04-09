import Board from "../board/Board";

class SearchNode {
  board: Board;
  moves: number;
  previousSearchNode: SearchNode | null;
  manhattanPriority: number; // caching

  constructor(board: Board, moves: number, previousSearchNode: SearchNode | null = null) {
    this.board = board;
    this.moves = moves;
    this.previousSearchNode = previousSearchNode;
    this.manhattanPriority = board.manhattan();
  }

  priority(): number {
    return this.moves + this.manhattanPriority
  }
}

export default SearchNode