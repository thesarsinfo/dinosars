
//Configuration of global variables
let score = 0;
document.querySelector(".background").style.animation = "none";
let gameOverActivated = false;

// Function to start the game
const start = () => {
    //Position of the player and definy variable to jump
    let position = 0;
    let isJumping = false; 

    //Load the elements of the game
    document.querySelector(".background").style.animation = "slideright 600s infinite linear";
    document.getElementById("game").style.display = "none";
    const dino = document.querySelector(".dino");
    const background = document.querySelector(".background");

    //function to create cactus and run recursive and verify the game over is activated 
    const createCactus = () => {
        
        if (gameOverActivated === false){

            //Load the elements of the game e definy the position
            const cactus = document.createElement('div');
            let cactusPosition = 900;
            //definy a time to load cactus
            let randomTime = Math.random() * 2000 + 300;

            cactus.classList.add('cactus');
            cactus.style.left = cactusPosition + 'px';
            background.appendChild(cactus);

            let leftInterval = setInterval(() => {              
                // verify the position of cactus and destroy element       
                cactusPosition -= 10;
                cactus.style.left = cactusPosition + 'px'
                if(cactusPosition <= 10) {
                    clearInterval(leftInterval);
                    
                    background.removeChild(cactus);
                // verify collision
                } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
                    
                    background.removeChild(cactus);
                    gameOverActivated = true
                    document.body.innerHTML = "<div><div class='game-over'><h3>Fim de jogo</h3> <p>Pontuação Total: " + score + "</p> <button onClick='window.location.reload()'> Tentar novamente</button></div></div>";
                     return clearInterval(leftInterval)
                  //Condition to move cactus  
                } else {
                    cactusPosition -= 10;
                    cactus.style.left = cactusPosition + 'px'
                }
            }, 20);
           // call itself every time the cactus destroy
           setTimeout(createCactus, randomTime);
        }
    }
    //Function to detect the key of keyboard is pressed
    const handleKeyDown = (event) => {
       
        if (event.keyCode === 32) {
            score += 10 
            if (isJumping === false) {
                jump();
            }            
        }
    }
    // set the position of jump to the max height and minimum height
    const jump = () => {   
            
        isJumping = true;
        let upInterval = setInterval(() => {
            if (position >= 150) {
                clearInterval(upInterval);
                //down
                let downInterval = setInterval(() => {
                    if (position <= 0) {
                        isJumping = false;
                        clearInterval(downInterval);
                    } else
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }, 20)
            } else {
                //up
            position += 20; 
            dino.style.bottom = position + 'px'            
            }
        }, 20 )
    }
    //Call function one time    
    createCactus(); 
    //Verifify condition to not jump and acumulation score
    if (gameOverActivated === false){
    document.addEventListener('keydown', handleKeyDown,);
    }
}

