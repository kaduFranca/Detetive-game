"use strict";
class Game {
    constructor(numberPlayers) {
        this.limitMapX = 51;
        this.limitMapY = 33;
        this.allPeaces = [];
        this.numberPlayers = numberPlayers;
    }
    onInit() {
        this.createBoard();
        let Cores;
        (function (Cores) {
            Cores[Cores["blue"] = 1] = "blue";
            Cores[Cores["black"] = 2] = "black";
            Cores[Cores["purple"] = 3] = "purple";
            Cores[Cores["red"] = 4] = "red";
            Cores[Cores["pink"] = 5] = "pink";
            Cores[Cores["yellow"] = 6] = "yellow";
            Cores[Cores["green"] = 7] = "green";
            Cores[Cores["orange"] = 8] = "orange";
        })(Cores || (Cores = {}));
        for (let i = 1; i <= 8; i++) {
            this.createPeace(0, `${Cores[i]}`, `<img src="../img/peao/peao${i}.png">`, `id-${i}-10`, "", "");
        }
    }
    createBoard() {
        for (let i = 0; i < this.limitMapX; i++) {
            let ul = document.createElement("ul");
            for (let j = 0; j < this.limitMapY; j++) {
                let li = document.createElement("li");
                li.setAttribute("id", `id-${i}-${j}`);
                li.innerHTML = `<img src="../img/azulejo.png">`;
                ul.appendChild(li);
                const openUl = document.querySelector("#board");
                openUl.appendChild(ul);
            }
        }
    }
    createPeace(id, color, image, initialPosition, turnPlay, beforePosition) {
        let peace = {
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
    movePeace(id, coordenada) {
        let move = document.querySelector(`#${coordenada}`);
        let beforePosition = this.allPeaces[id].beforePosition;
        if (beforePosition !== "") {
            let moveBefore = document.querySelector(`#${beforePosition}`);
            moveBefore.innerHTML = `<img src="../img/azulejo.png">`;
        }
        if (move.innerHTML == `<img src="../img/azulejo.png">`) {
            move.innerHTML = this.allPeaces[id].image;
            console.log("foi");
            this.allPeaces[id].beforePosition = coordenada;
        }
        else {
            let moveBefore = document.querySelector(`#${beforePosition}`);
            moveBefore.innerHTML = this.allPeaces[id].image;
            console.log("tem gente");
        }
    }
    rollDice() {
        let min = Math.ceil(7);
        let max = Math.floor(1);
        let dice = Math.floor(Math.random() * (max - min) + min);
        return dice;
    }
    peaceJump(idPeace) {
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
                }
                else if (e.key === "ArrowUp") {
                    if (y > 0) {
                        y -= 1;
                    }
                }
                else if (e.key === "ArrowLeft") {
                    if (x > 0) {
                        x -= 1;
                    }
                }
                else if (e.key === "ArrowRight") {
                    if (x < game.limitMapX - 1) {
                        x += 1;
                    }
                }
                game.walkPeace(id, x, y);
            }
        });
    }
    walkPeace(id, pX, pY) {
        let coordenada = "id" + "-" + pX + "-" + pY;
        console.log(coordenada);
        if (coordenada == this.allPeaces[id].beforePosition) {
            console.log("msm posicao");
        }
        else if (pX < this.limitMapX && pY < this.limitMapY) {
            this.movePeace(id, coordenada);
        }
        else {
            this.movePeace(id, this.allPeaces[id].beforePosition);
        }
    }
}
addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
const game = new Game(8);
game.onInit();
game.setUpPosition();
game.peaceJump(1);
