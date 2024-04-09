import Board from "../board/Board";
import SearchNode from "../aStarAlgo/SearchNode";
import { MinHeap } from "min-heap-typed";

class Solver {
  private solutionSteps: Board[] = [];

  constructor(initial: Board) {
    if (!this.isSolvable(initial)) {
      return;
    }

    this.initializePriorityQueues(initial);
    this.solvePuzzle(initial);
  }

  // adjusted isSolvable to accommodate detection of unsolvable boards
  isSolvable(initial: Board): boolean {
    let pq = new MinHeap<SearchNode>([], { comparator: (a: SearchNode, b: SearchNode) => a.priority() - b.priority() });
    let twinPQ = new MinHeap<SearchNode>([], { comparator: (a: SearchNode, b: SearchNode) => a.priority() - b.priority() });

    pq.add(new SearchNode(initial, 0, null));
    twinPQ.add(new SearchNode(initial.twin(), 0, null));

    while (true) {
      const initialNode = pq.poll();
      if (initialNode && initialNode.board.isGoal()) {
        return true;
      }

      const twinNode = twinPQ.poll();
      if (twinNode && twinNode.board.isGoal()) {
        return false;
      }

      this.enqueueNeighbors(pq, initialNode || null);
      this.enqueueNeighbors(twinPQ, twinNode || null);
    }
  }

  moves(): number {
    return this.solutionSteps.length - 1;
  }

  solution(): Board[] {
    return this.solutionSteps;
  }

  private initializePriorityQueues(initial: Board) {
    const pq = new MinHeap<SearchNode>([], { comparator: (a: SearchNode, b: SearchNode) => a.priority() - b.priority() });
    const twinPQ = new MinHeap<SearchNode>([], { comparator: (a: SearchNode, b: SearchNode) => a.priority() - b.priority() });

    const initialNode = new SearchNode(initial, 0, null);
    const twinNode = new SearchNode(initial.twin(), 0, null);

    pq.add(initialNode);
    twinPQ.add(twinNode);

    return { pq, twinPQ }
  }

  private solvePuzzle(initial: Board) {
    let pq, twinPQ;
    ({ pq, twinPQ } = this.initializePriorityQueues(initial));

    while (true) {
      const node = pq.poll();
      const twinNode = twinPQ.poll();

      if (!node || !twinNode) break;

      if (this.processNode(node, pq) || this.processNode(twinNode, twinPQ)) break;
    }
  }

  private processNode(node: SearchNode, pq: MinHeap<SearchNode>): boolean {
    if (node.board.isGoal()) {
      this.solutionSteps = this.reconstructSolution(node);
      return true;
    }

    for (const neighbor of node.board.neighbors()) {
      // Optimized (Critical Optimization part)
      if (node.previousSearchNode === null || !neighbor.equals(node.previousSearchNode.board)) {
        pq.add(new SearchNode(neighbor, node.moves + 1, node));
      }
    }

    return false;
  }

  private reconstructSolution(node: SearchNode): Board[] {
    const solution: Board[] = [];
    let current = node;
    while (current !== null) {
      solution.unshift(current.board);
      current = current.previousSearchNode as SearchNode;
    }
    return solution;
  }

  private enqueueNeighbors(pq: MinHeap<SearchNode>, node: SearchNode | null) {
    if (node) {
      for (const neighbor of node.board.neighbors()) {
        if (node.previousSearchNode === null || !neighbor.equals(node.previousSearchNode.board)) {
          pq.add(new SearchNode(neighbor, node.moves + 1, node));
        }
      }
    }
  }
}

export default Solver;
