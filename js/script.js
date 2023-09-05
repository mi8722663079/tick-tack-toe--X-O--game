import State from "./store.js";
import View from "./view.js";

const PLayers = [
  { id: 1, name: "player 1", color: "turquoise", iconClass: "fa-x" },
  { id: 2, name: "player 2", color: "yellow", iconClass: "fa-o" },
];

function init() {
  const view = new View();
  const state = new State("local-storage-key", PLayers);

  view.bindNewRound((event) => {
    view.winner([]);
    state.newRound();
    view.turnIndicator(state.game.currentPlayer);
  });

  view.bindResetRound((event) => {
    view.closeModal();
    state.reset();
    view.clearMoves();
    view.turnIndicator(state.game.currentPlayer);
  });

  view.bindPlayerMoves((square) => {
    const existingMove = state.game.moves.find(
      (move) => move.squareId === +square.id
    );
    if (existingMove) {
      return;
    }

    view.squareIcons(square, state.game.currentPlayer);
    state.nextMove(+square.id);
    if (state.game.status.isComplete) {
      view.openModal(state.game.status.winner);
      state.winsPusher();
      view.winner(state.wins());
      return;
    }
    view.turnIndicator(state.game.currentPlayer);
  });
}
window.addEventListener("load", init());
