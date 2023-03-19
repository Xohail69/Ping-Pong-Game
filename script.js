// for every single time frame that passes we are gonna call a function & that 
// function is going to update positions and the logic of all the pieces of our Game
 


import Ball from './Ball.js'
import Paddle from './Paddle.js'


const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")


let lastTime ;
function update(time){
    if(lastTime != null ){
        const delta = time - lastTime ;
        // console.log(delta);

        // upate the ball position
        ball.update(delta , [playerPaddle.rect() , computerPaddle.rect()]);

        //update computer paddle
        computerPaddle.update(delta , ball.y)

        //get the hue variable 
        const hue = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--hue")
        )
        // Changing color slightly in every time frame
        document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

        if(isLose()){ //If anyone loses
            handleLose()
        }
    }
    lastTime = time ;
    //Calling update for every time frame
    window.requestAnimationFrame(update);
}

function isLose(){

    const rect = ball.rect() 
    //if the ball hit left or right wall of screen
    return rect.right >= window.innerWidth || rect.left <= 0

}
function handleLose(){
    const rect = ball.rect()
    if(rect.right >= window.innerWidth){ //ball hit the right wall -->> computer lost 
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1  //Increase player's score by 1 
    }
    else{ 
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1 

    }
    ball.reset() ; //reset the ball
    computerPaddle.reset() ; //reset computer paddle
}


//moving player paddle with our mouse
document.addEventListener("mousemove" , e=>{
    playerPaddle.position = (e.y/window.innerHeight)*100

})
document.addEventListener("ontouchmove" , e=>{
 var x = e.touches[0].clientX;
  var y = e.touches[0].clientY;
    playerPaddle.position = (y/window.innerHeight)*100

})


//Call the update function for every time frame
window.requestAnimationFrame(update);
