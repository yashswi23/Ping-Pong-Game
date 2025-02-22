// document.addEventListener("DOMContentLoaded",()=>{
//     let table = document.getElementById("ping-pong-table");
//     let ball = document.getElementById("ball");
//     let paddle = document.getElementById("paddle");
//     let ballX = 50;
//     let ballY = 50;

//     ball.style.left = `${ballX}px`;
//     ball.style.top = `${ballY}px`;
//     let dx = 2;
//     let dy = 2;

//     setInterval(function exec(){
//         ballX += dx;
//         ballY+= dy;

//         ball.style.left =  `${ballX}px`;
//         ball.style.top = `${ballY}px`;

//         if(ballX < paddle.offsetLeft + paddle.offsetWidth && ballY> paddle.offsetTop && ballY+ ball.offsetHeight < paddle.offsetTop + paddle.offsetHeight){
//             dx*=-1;
//         }
//         if(ballX> table.offsetWidth - ball.offsetWidth || ballX<=0 ){
//             dx*=-1;
//         }
//         if(ballY > table.offsetHeight - ball.offsetHeight || ballY<=0){
//             dy*=-1;
//         }



//     },1);

//     let paddleY=0;
//     let dpy =10;

//     document.addEventListener("keydown", (event) => {
//         event.preventDefault();
//         if (event.keyCode == 38 && paddleY>0) { // Up Arrow
//             paddleY+=(-1)*dpy;
//             console.log("Up"+ paddleY);
           
//         } else if (event.keyCode == 40 && paddleY<table.offsetHeight-paddle.offsetHeight) { 
//             paddleY+= dpy// Down Arrow
//             console.log("Down" + paddleY);
            
//         }
//         paddle.style.top = `${paddleY}px`
//     });

//     document.addEventListener("mousemove",(event)=>{
//         let mousedistancefromtop = event.clientY;
//         let distancefromtop = table.offsetTop;
//         let mousecontrol = mousedistancefromtop - distancefromtop -paddle.offsetHeight/2;

//         paddleY = mousecontrol;
//         if(paddleY<=0 || paddleY > table.offsetHeight-paddle.offsetHeight){
//             return ;
//         }

//         paddle.style.top = `${mousecontrol}px`;
//     })
// })

document.addEventListener("DOMContentLoaded", () => {
    let table = document.getElementById("ping-pong-table");
    let ball = document.getElementById("ball");
    let paddle = document.getElementById("paddle");
    let scoreDisplay = document.createElement("div");
    let livesDisplay = document.createElement("div");

    // Initialize Game Variables
    let ballX = 50, ballY = 50;
    let dx = 3, dy = 3;
    let paddleY = table.offsetHeight / 2 - paddle.offsetHeight / 2;
    let dpy = 10;
    let score = 0;
    let lives = 3;
    let maxScore = localStorage.getItem("maxScore") || 0;

    // Score Display
    scoreDisplay.id = "score";
    scoreDisplay.innerHTML = `Score: 0 | Max Score: ${maxScore}`;
    document.body.insertBefore(scoreDisplay, table);

    // Lives Display
    livesDisplay.id = "lives";
    livesDisplay.innerHTML = `Lives: ${lives}`;
    document.body.insertBefore(livesDisplay, table);

    // Ball Movement
    let gameInterval = setInterval(function () {
        ballX += dx;
        ballY += dy;

        // Move Ball
        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;

        // Wall Collision
        if (ballX >= table.offsetWidth - ball.offsetWidth || ballX <= 0) dx *= -1;
        if (ballY >= table.offsetHeight - ball.offsetHeight || ballY <= 0) dy *= -1;

        // Paddle Collision
        if (ballX <= paddle.offsetLeft + paddle.offsetWidth &&
            ballY + ball.offsetHeight > paddle.offsetTop &&
            ballY < paddle.offsetTop + paddle.offsetHeight) {
            dx *= -1; // Reverse X direction
            score++; // Increase score
            scoreDisplay.innerHTML = `Score: ${score} | Max Score: ${maxScore}`;

            if (score > maxScore) {
                maxScore = score;
                localStorage.setItem("maxScore", maxScore);
            }
        }

        // If Ball Misses Paddle
        if (ballX <= 0) {
            lives--;
            livesDisplay.innerHTML = `Lives: ${lives}`;

            if (lives === 0) {
                alert("Game Over! Restarting...");
                resetGame();
            } else {
                resetBall();
            }
        }
    }, 10);

    // Paddle Movement (Keyboard)
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp" && paddleY > 0) paddleY -= dpy;
        if (event.key === "ArrowDown" && paddleY < table.offsetHeight - paddle.offsetHeight) paddleY += dpy;
        paddle.style.top = `${paddleY}px`;
    });

    // Paddle Movement (Mouse)
    document.addEventListener("mousemove", (event) => {
        let mouseY = event.clientY - table.offsetTop - paddle.offsetHeight / 2;
        if (mouseY > 0 && mouseY < table.offsetHeight - paddle.offsetHeight) {
            paddleY = mouseY;
            paddle.style.top = `${paddleY}px`;
        }
    });

    // Reset Ball After Miss
    function resetBall() {
        ballX = table.offsetWidth / 2;
        ballY = table.offsetHeight / 2;
        dx = 3;
        dy = 3;
    }

    // Reset Game
    function resetGame() {
        score = 0;
        lives = 3;
        scoreDisplay.innerHTML = `Score: 0 | Max Score: ${maxScore}`;
        livesDisplay.innerHTML = `Lives: ${lives}`;
        resetBall();
    }
});
