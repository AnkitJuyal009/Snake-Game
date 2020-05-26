function init() {
    canvas = document.getElementById('myCanvas');
    W = H = canvas.width = canvas.height = 500;
    pen = canvas.getContext('2d');
    cs = 25;
    gameOver = false;
    score = 5;

    food = getRandomFood();

    trophy = new Image();

    trophy.src = "Assets/trophy.png";

    snake = {
        init_len : 2,
        color : "white",
        cells : [],
        direction : "right",

        createSnake : function() {                                  
            for(var i=this.init_len; i>0; i--) {
                this.cells.push({x:i,y:0});
             
            }
        },

        drawSnake : function() {

            for(var i=0; i<this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs,cs);          //spacing element and positioning it
                
            }
        },

        updateSnake : function() {
            var headX = this.cells[0].x;                                                //storing position of head element
            var headY = this.cells[0].y;

        
            if(headX == food.x && headY == food.y) {                                    //food is eaten
                    console.log("food eaten");

                    score ++;

                    food = getRandomFood();                                             //generating food item

            } else {
                 this.cells.pop();                                                      //removing element from last
                }                                                   
            
            
            var nextX, nextY;

            if(this.direction == "right") {
                nextX = headX + 1;
                nextY = headY;
            } 
            else  if(this.direction == "left") {
                nextX = headX - 1;
                nextY = headY;
            }
            else if(this.direction == "up") {
                nextX = headX;
                nextY = headY - 1;
            }
            else {
                nextX = headX;
                nextY = headY + 1;
            }
         
            this.cells.unshift({x :nextX , y :nextY});                                    //inserting an element at the front

            var lastX = Math.round(W/cs);
            var lastY = Math.round(W/cs);
            
            if(this.cells[0].x < 0 || this.cells[0].y < 0 
                || this.cells[0].x > lastX || this.cells[0].y > lastY) {

                    gameOver = true;

                }
            
        }
     };

    snake.createSnake();

    function keyPressed(e) {

        if(e.key == "ArrowRight" || e.key == "d")
            snake.direction = "right";
        
            else if(e.key == "ArrowLeft" || e.key == "a")
                 snake.direction = "left";

                 else if(e.key == "ArrowDown" || e.key == "s")
                 snake.direction = "down";

                     else if(e.key == "ArrowUp" || e.key == "w")
                     snake.direction = "up";

    }

    document.addEventListener('keydown',keyPressed);

}

function draw() {
    pen.clearRect(0,0,W,H);                                                               //erase old frame
    snake.drawSnake();

    pen.fillStyle = food.color;
    pen.fillRect(food.x*cs,food.y*cs,cs,cs);                                              //getting a food item

    pen.drawImage(trophy,18,20,40,40);
    pen.fillStyle = "white";
    pen.font = "15px Roboto";
    pen.fillText(score,32,40);
    
}

function update() {

    snake.updateSnake();


}

function getRandomFood() {

    var foodX = Math.round(Math.random()*(W-cs)/cs);                                     //generating food item(not overlapping with border)
    var foodY = Math.round(Math.random()*(W-css)/cs);

    var food = {
            x : foodX,
            y : foodY,
            color : "red"
     }
    return food;
}

function gameloop() {
        if(gameOver == true) { 
            clearInterval(f);
            alert("Game Over");
        }

         draw();
         update();

}

init();

var f = setInterval(gameloop,100);