class Game {
  limitMapX: number = 51;
  limitMapY: number = 33;
  allPeaces: Array<peace> = [];
  numberPlayers: number;
  constructor(numberPlayers: number) {
    this.numberPlayers = numberPlayers;
  }

  onInit() {
    this.createBoard();
    enum Cores {
      "blue" = 1,
      "black" = 2,
      "purple" = 3,
      "red" = 4,
      "pink" = 5,
      "yellow" = 6,
      "green" = 7,
      "orange" = 8,
    }
    for (let i = 1; i <= 8; i++) {
      this.createPeace(
        0,
        `${Cores[i]}`,
        `<img src="../img/peao/peao${i}.png">`,
        `id-${i}-10`,
        "",
        ""
      );
    }
  }

  createBoard() {
    for (let i = 0; i < this.limitMapX; i++) {
      let ul = document.createElement("ul") as HTMLElement;

      for (let j = 0; j < this.limitMapY; j++) {
        let li = document.createElement("li");
        li.setAttribute("id", `id-${i}-${j}`);
        li.innerHTML = `<img src="../img/azulejo.png">`;

        ul.appendChild(li);
        const openUl = document.querySelector("#board") as HTMLElement;
        openUl.appendChild(ul);
      }
    }
  }

  createPeace(
    id: number,
    color: string,
    image: string,
    initialPosition: string,
    turnPlay: string,
    beforePosition: string
  ) {
    let peace: peace = {
      id: id++,
      color: color,
      image: image,
      initialPosition: initialPosition,
      turnPlay: turnPlay,
      beforePosition: beforePosition,
    };

    if (id <= this.numberPlayers) {
      this.allPeaces.push(peace);
      console.log(peace);
    }
  }
  setUpPosition() {
    for (let i = 0; i < 8; i++) {
      this.movePeace(i, this.allPeaces[i].initialPosition);
    }
  }

  movePeace(id: number, coordenada: string) {
    let move = document.querySelector(`#${coordenada}`) as HTMLElement;

    let beforePosition = this.allPeaces[id].beforePosition;

    if (beforePosition !== "") {
      let moveBefore = document.querySelector(
        `#${beforePosition}`
      ) as HTMLElement;
      moveBefore.innerHTML = `<img src="../img/azulejo.png">`;
    }

    if (move.innerHTML == `<img src="../img/azulejo.png">`) {
      move.innerHTML = this.allPeaces[id].image;
      console.log("foi");
      this.allPeaces[id].beforePosition = coordenada;
    } else {
      let moveBefore = document.querySelector(
        `#${beforePosition}`
      ) as HTMLElement;
      moveBefore.innerHTML = this.allPeaces[id].image;
      console.log("tem gente");
    }
  }

  rollDice() {
    let min: number = Math.ceil(7);
    let max: number = Math.floor(1);
    let dice: number = Math.floor(Math.random() * (max - min) + min);
    return dice;
  }

  peaceJump(idPeace: number) {
    let id = idPeace - 1;

    let arrayStrings = this.allPeaces[id].beforePosition.split("-");
    console.log(arrayStrings);
    let x = Number(arrayStrings[1]);
    let y = Number(arrayStrings[2]);
    let range = 1000;
    console.log(range);

    document.addEventListener("keyup", function (e) {
      if (range > 0) {
        if (e.key === "ArrowDown") {
          if (y < game.limitMapY - 1) {
            y += 1;
          }
        } else if (e.key === "ArrowUp") {
          if (y > 0) {
            y -= 1;
          }
        } else if (e.key === "ArrowLeft") {
          if (x > 0) {
            x -= 1;
          }
        } else if (e.key === "ArrowRight") {
          if (x < game.limitMapX - 1) {
            x += 1;
          }
        }
        game.walkPeace(id, x, y);
      }
    });
  }

  walkPeace(id: number, pX: number, pY: number) {
    let coordenada = "id" + "-" + pX + "-" + pY;
    console.log(coordenada);
    if (coordenada == this.allPeaces[id].beforePosition) {
      console.log("msm posicao");
    } else if (pX < this.limitMapX && pY < this.limitMapY) {
      this.movePeace(id, coordenada);
    } else {
      this.movePeace(id, this.allPeaces[id].beforePosition);
    }
  }
}
addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);

const game = new Game(8);
game.onInit();
game.setUpPosition();
game.peaceJump(1);

interface peace {
  id: number;
  color: string;
  image: string;
  initialPosition: string;
  turnPlay: string;
  beforePosition: string;
}
