const  INITIAL_VELOCITY = 0.025 ;
const VELOCITY_INCREASE = 0.00001 ;

export default class Ball{
    constructor(ballElem){
        this.ballElem = ballElem ;
        this.reset() ;
    }
    get x(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
    }

    set x(value){
        this.ballElem.style.setProperty("--x",value);
    }
    get y(){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
    }

    set y(value){
        this.ballElem.style.setProperty("--y",value);
    }

    // Coordinates of ball element
    rect(){
        return this.ballElem.getBoundingClientRect();
    }


    // Resetting the ball
    reset(){
        this.x = 50 
        this.y = 50 
        this.direction = { x: 0 }
        
        //generating a random direction
        while(
            Math.abs(this.direction.x) <= 0.2 ||
            Math.abs(this.direction.x) >= 0.9
            ){
                // Random angle between 0 to 360 
            const theta = randomNumberBetween(0,2*Math.PI)
            this.direction = {x:Math.cos(theta) , y:Math.sin(theta)}
        }
        this.velocity = INITIAL_VELOCITY ; //Initialising velocity
    }

    // Update ball's position
    update(delta , paddleRects ){
        this.x += this.direction.x * this.velocity *delta //Changing x position
        this.y += this.direction.y * this.velocity *delta //Changing y position
        this.velocity += VELOCITY_INCREASE*delta //Increasing velocity bit by bit
        
        const rect = this.rect() ; //getting coordinates of ball
        
        //If the ball hit up & down then reflect it back
        if(rect.bottom >= window.innerHeight || rect.top <= 0 ){
            this.direction.y *= -1 ;    
        }

        //if any of the pedal hits the ball then reflect it back
        if(paddleRects.some(r => isCollision(r , rect) ) ){
            this.direction.x *= -1 ; 
        } 

    }
}
//function to generate a random number
function randomNumberBetween(min,max){
    return Math.random()*(max-min)+min ;
}

//function to check for collision between paddle and ball
function isCollision(rect1 , rect2){
    return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left && 
    rect1.top <= rect2.bottom && 
    rect1.bottom >= rect2.top 
    )
}