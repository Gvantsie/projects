const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX=5, snakeY=20;
let snakeBody = [];
let velocityX=0; velocityY=0;
let setIntervalId;
let score = 0;

//umaglesi qulis dafikriseba erti chatvirtvisas
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;
const changeFoodPosition = () => {
    //rendom mnishvnelobis minicheba sachmlisatvis
    foodX = Math.floor(Math.random() * 25) + 1;
    foodY = Math.floor(Math.random() * 25) + 1;
}

const handleGameOver = () => {
    //taimeris gasuftaveba da gverdis tavidan chatvirtva game overis dros
    clearInterval(setIntervalId);
    alert( "Game Over! Press OK to replay...");
    location.reload();
}

const changeDirection = (g) => {
    //mimartulebis cvlileba gilakebze dacherisas
    if(g.key === "ArrowUp" && velocityY !=1 ) {
        velocityX = 0;
        velocityY = -1;
    } else if (g.key === "ArrowDown" && velocityY !=-1 ) {
        velocityX = 0;
        velocityY = 1;
    } else if (g.key === "ArrowLeft" && velocityX !=1 ) {
        velocityX = -1;
         velocityY = 0;
    }else if (g.key === "ArrowRight" && velocityX !=-1 ) {
        velocityX = 1;
        velocityY = 0;
    }
}

controls.forEach(key => {
    key.addEventListener("click", () => changeDirection({key: key.dataset.key}));
});


const initGame = () => {
    if(gameOver) return handleGameOver();

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div> `;
    
    //vamowmebt tu snakema miagwia foods
    if(snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]); //snakema gadakvetos foodis pozicia
        score++; // vzrdit qulas ertit

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    for (let i= snakeBody.length - 1; i > 0; i--) {
        //snakeis zomashi gazrda 1 elementit
        snakeBody[i] = snakeBody[i-1];
    }
    
    snakeBody[0] = [snakeX, snakeY] // pirveli elementi rom darches tavdapirvel adgilze

    //snakeis poziciis cvlileba mimartulebis mixedvit
    snakeX += velocityX;
    snakeY += velocityY;


    //vamowmebs snakema xoar gadakveta kedlis sazgvari da tu ki mashin tamashi morches
    if (snakeX <= 0 || snakeX > 25 || snakeY <= 0 || snakeY > 25 ) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        //vamatebt divs snake bodys titoeuli nawilisatvis
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div> `;
        
        //vamowmebt tu snake daejaxeba tavis tavs rom tu ejaxeba game over gamovitanot
        if(i != 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
        gameOver=true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);
