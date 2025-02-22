document.addEventListener("DOMContentLoaded",()=>{
    let table = document.getElementById("ping-pong-table");
    let ball = document.getElementById("ball");
    let paddle = document.getElementById("paddle");
    let ballX = 50;
    let ballY = 50;

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
    let dx = 2;
    let dy = 2;

    setInterval(function exec(){
        ballX += dx;
        ballY+= dy;

        ball.style.left =  `${ballX}px`;
        ball.style.top = `${ballY}px`;

        if(ballX < paddle.offsetLeft + paddle.offsetWidth && ballY> paddle.offsetTop && ballY+ ball.offsetHeight < paddle.offsetTop + paddle.offsetHeight){
            dx*=-1;
        }
        if(ballX> table.offsetWidth - ball.offsetWidth || ballX<=0 ){
            dx*=-1;
        }
        if(ballY > table.offsetHeight - ball.offsetHeight || ballY<=0){
            dy*=-1;
        }



    },1);

    let paddleY=0;
    let dpy =10;

    document.addEventListener("keydown", (event) => {
        event.preventDefault();
        if (event.keyCode == 38 && paddleY>0) { // Up Arrow
            paddleY+=(-1)*dpy;
            console.log("Up"+ paddleY);
           
        } else if (event.keyCode == 40 && paddleY<table.offsetHeight-paddle.offsetHeight) { 
            paddleY+= dpy// Down Arrow
            console.log("Down" + paddleY);
            
        }
        paddle.style.top = `${paddleY}px`
    });
})