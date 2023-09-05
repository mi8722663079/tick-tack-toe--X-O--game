const initialValue = { moves: [], win1: [] };

export default class State {
  #state = initialValue;
  constructor(key, players) {
    this.key = key;
    this.players = players;
  }

  get game() {
    const state = this.#getstate();
    const currentPlayer = this.players[state.moves.length % 2];

    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winner = 0;

    for (const player of this.players) {
      const selectedSquares = state.moves
        .filter((move) => move.playerId.id === player.id)
        .map((move) => +move.squareId);
      for (const pattern of winningPatterns) {
        if (pattern.every((v) => selectedSquares.includes(v))) {
          winner = player;
        }
      }
    }

    return {
      moves: state.moves,
      currentPlayer,
      status: {
        isComplete: winner != 0 || state.moves.length === 9,
        winner,
      },
    };
  }

  winsPusher() {
    const state = this.#getstate();
    state.win1.push(this.game.status.winner.id);
  }
  wins() {
    const state = this.#getstate();
    return state.win1;
  }

  nextMove(squareId) {
    const state = this.#getstate();
    const stateClone = structuredClone(state);

    stateClone.moves.push({
      squareId,
      playerId: this.game.currentPlayer,
    });
    this.#saveState(stateClone);
  }
  reset() {
    this.#state.moves = [];
  }
  newRound() {
    this.#saveState(initialValue);
  }
  #getstate() {
    return this.#state;
  }
  #saveState(stateorfn) {
    let prevState = this.#getstate();

    let newState;

    switch (typeof stateorfn) {
      case "function":
        newState = stateorfn(prevState);
        break;
      case "object":
        newState = stateorfn;
        break;
      default:
        throw new Error("you didnt pass anything or passed invaild argument");
    }
    this.#state = newState;
  }
}
