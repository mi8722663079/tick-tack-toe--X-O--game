export default class View {
  $ = {};
  $$ = {};
  constructor() {
    // individual nodes (elements)
    this.$.menu = this.#qs("[data-id='menu1']");
    this.$.item1 = this.#qs(".items");
    this.$.reset = this.#qs("[data-id='reset-btn']");
    this.$.newBtn = this.#qs("[data-id='newround-btn']");
    this.$.currentPlayer1 = this.#qs(".current");
    this.$.turns = this.#qs(".player-turn");
    this.$.PlayerIcon = this.#qs(".Picon");
    this.$.modal = this.#qs(".winner-sc");
    this.$.win = this.#qs(".win1");
    this.$.again = this.#qs(".again-btn");
    this.$.action = this.#qs("[data-id='Actions']");
    this.$.p1Stats = this.#qs("[data-id='p1-stats']");
    this.$.tieStats = this.#qs("[data-id='tie-stats']");
    this.$.p2Stats = this.#qs("[data-id='p2-stats']");
    // node lists
    this.$$.box = this.#qs(".game-box");

    // UI only listeners

    this.$.menu.addEventListener("click", (event) => {
      this.#menuToggle();
    });
  }
  bindResetRound(handler) {
    this.$.reset.addEventListener("click", handler);
    this.$.again.addEventListener("click", handler);
  }

  bindNewRound(handler) {
    this.$.newBtn.addEventListener("click", handler);
  }
  bindPlayerMoves(handler) {
    this.$$.box.forEach((square) => {
      square.addEventListener("click", () => handler(square));
    });
  }

  // UI modifing methods (DOM helper methods)
  winner(wins) {
    const p1Wins = wins.filter((id) => id === 1);
    const p2Wins = wins.filter((id) => id === 2);
    const ties = wins.filter((id) => id === undefined);

    this.$.p1Stats.textContent = `${p1Wins.length} wins`;
    this.$.p2Stats.textContent = `${p2Wins.length} wins`;
    this.$.tieStats.textContent = `${ties.length} ties`;
  }
  clearMoves() {
    this.$$.box.forEach((square) => square.replaceChildren());
  }
  openModal(winner) {
    if (winner.id === 1) {
      this.$.modal.classList.toggle("hidden");
      this.$.win.textContent = "Player 1 wins!";
    } else if (winner.id === 2) {
      this.$.modal.classList.toggle("hidden");
      this.$.win.textContent = "Player 2 wins!";
    } else if (winner == 0) {
      this.$.modal.classList.toggle("hidden");
      this.$.win.textContent = "Thats a tie!";
    }
  }
  closeModal() {
    this.$.modal.classList.add("hidden");
  }
  #menuToggle() {
    const chevcon = this.$.action.querySelector("i");
    this.$.item1.classList.toggle("hidden");
    this.$.menu.classList.toggle("border");
    chevcon.classList.toggle("fa-chevron-up");
    chevcon.classList.toggle("fa-chevron-down");
  }

  squareIcons(squareEl, currentPlayer) {
    const icon = document.createElement("i");
    icon.classList.add(
      "fa-solid",
      currentPlayer.iconClass,
      currentPlayer.color
    );
    squareEl.replaceChildren(icon);
  }

  turnIndicator(currentPlayer) {
    const playerIcon = document.createElement("i");
    const playerText = document.createElement("p");
    playerIcon.classList.add(
      "fa-solid",
      currentPlayer.iconClass,
      currentPlayer.color
    );
    playerText.classList.add(currentPlayer.color);
    playerText.textContent = `${currentPlayer.name},  you are up!`;
    this.$.turns.replaceChildren(playerIcon, playerText);
  }

  #qs(element) {
    const el = document.querySelector(element);
    const els = document.querySelectorAll(element);
    if (!el) throw new Error("you didn't select any element");
    if (document.querySelectorAll(element).length === 1) {
      return el;
    } else if (document.querySelectorAll(element).length > 1) {
      return els;
    }
  }
}
