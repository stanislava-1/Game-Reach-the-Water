// If value of sounds is true, the sounds are on, else the souns are off.
var sounds = true;

// ================================ ENEMIES ===================================

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.xloc = x;
    this.yloc = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

var enemyCollisionSound = new Audio("sounds/collision-enemy.mp3");
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers. (but I don't use it yet)
    
    // There are 6 enemy objects defined in the game. To make an illusion
    // that there are much more enemies and they little by little come 
    // to the road, every enemy comes again to the canvas area after it leaves it:
    if (this.xloc > 600) {
        this.xloc = -100;
    // This happens if the enemy collides with the player:
    } else if (enemyCollision()) {
        // Collision sound if sounds are not turned off:
        if (sounds) {
            enemyCollisionSound.play();
        }      
        // The keyboard keys are disabled during the collision, so that player 
        // cannot be moved until he doesn't return to the starting position:
        $("body").keydown(function(event) { 
            return false;
        });
        // The player looses 10 seconds of left time:
        var minusTime = setTimeout('timeSanction()', 30);
        // To make the collision visible - wait a while before returning 
        // player to the starting position:
        var playerBack = setTimeout(function() {
            Back(player);
            afterCollision();
        }, 500);

    // Enemies way of movement if nothing special happens:    
    } else {
        this.xloc += this.speed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xloc, this.yloc);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(0,62,0.5);
var enemy2 = new Enemy(0,145,2.5);
var enemy3 = new Enemy(0,228,2);
var enemy4 = new Enemy(-300,62,1.5);
var enemy5 = new Enemy(-250,145,1.1);
var enemy6 = new Enemy(-200,228,0.8);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

// ================================ PLAYER ===================================

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.xloc = x;
    this.yloc = y;
    this.sprite = 'images/char-boy.png'; 
};

Player.prototype.update = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers. (but I don't use it yet)

    // In fact, I even don't use this function :-/ 
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xloc, this.yloc);
};


var Score = 0;

Player.prototype.handleInput = function(direction) {
    var playerMoveSound = new Audio("sounds/player-move.mp3");
    var waterReachedSound = new Audio("sounds/reached-water.mp3");

    if (direction && Time>0) {
        // If nothing special happens, every player movement is 
        // acompanied by this sound if sounds are not turned off:
        if (sounds) {
        playerMoveSound.play();
        }
    }
    // The way of player movement after pressing different arrow keys:
    if (direction === 'left' && this.xloc > 0) {
        this.xloc -= 101;     
    } else if (direction === 'right' && this.xloc < 404) {
        this.xloc += 101;
    } else if (direction === 'up' && this.yloc > 68) {
        this.yloc -= 83;
    } else if (direction === 'down' && this.yloc < 400) {
        this.yloc += 83;
    // This happens if the player reaches the water:
    } else if (direction === 'up' && this.yloc === 68) {
        if (sounds) {
            waterReachedSound.play(); // different sound is played
        }
        Back(this); // the player returns to the starting position
        increaseScore(); // score is increased by 1 point
    } 
};

// Place the player object in a variable called player
var player = new Player(202, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// ================================ BLUE GEMS ===================================

var BlueGem = function(x, y) {
    this.xloc = x;
    this.yloc = y;
    this.sprite = 'images/Gem Blue2.png'
}

var gemCollisionSound = new Audio('sounds/collision-gem.mp3')
BlueGem.prototype.update = function() {
    if (this.xloc > 1000) {
        this.xloc = -100;
    // This happens if player catches a blue gem:
    } else if (gemCollision(allBlueGems, BlueGem)) {
        // Collision sound if sounds are not turned off:
        if (sounds) {
            gemCollisionSound.play();
        }               
        // The player gains 10 additional seconds to Time Left:
        var plusTime = setTimeout('timeBonus()', 30);
        // To make the collision visible - wait a while before returning 
        // player to the starting position:
        var playerBack = setTimeout('afterCollision()', 500);
    } else {
        this.xloc++;
    }
};

BlueGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xloc, this.yloc);
};

// Blue Gem objects:
var blueGem1 = new BlueGem(-200, 95);
var blueGem2 = new BlueGem(-600, 261);
var blueGem3 = new BlueGem(-1000, 178);
// Blue Gem objects array:
var allBlueGems = [blueGem1, blueGem2, blueGem3];


// ================================ ORANGE GEMS ===================================

var OrangeGem = function(x, y) {
    this.xloc = x;
    this.yloc = y;
    this.sprite = 'images/Gem Orange2.png'
}

OrangeGem.prototype.update = function() {
    if (this.xloc > 1000) {
        this.xloc = -200;
    
    // This happens if player catches an orange gem:
    } else if (gemCollision(allOrangeGems, OrangeGem)) {
        // Collision sound if sounds are not turned off:
        if (sounds) {
            gemCollisionSound.play();
        }     
        // The player gains 10 additional points of Score:
        var plusScore = setTimeout('scoreBonus()', 30);
        // To make the collision visible - wait a while before returning 
        // player to the starting position:
        var playerBack = setTimeout('afterCollision()', 500);
    } else {
        this.xloc++;
    }

    // If an orange gem and a blue gem overlap, the orange gem is replaced two blocks 
    // behind the gem:
    if (gemsOverlap(allOrangeGems, allBlueGems)) {
        this.xloc -= 202;
    }
    // // Prevent an Orange Gem from covering a Blue Gem completely:
    // for (gem in allBlueGems) {
    //     if (allBlueGems[gem].xloc === this.xloc && allBlueGems[gem].yloc === this.yloc) {
    //         // Move the Orange Gem one field further:
    //         this.xloc += 101;
    //     }
    // }
};

OrangeGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xloc, this.yloc);
};

// Orange Gem objects:
var orangeGem1 = new OrangeGem(-800, 178);
// Orange Gem objects array:
var allOrangeGems = [orangeGem1];


// ================================ ROCKS ======================================

// Player has to avoid also rocks, becaouse meeteng a rock will deduct some 
// points from score.
var Rock = function(x, y) {
    this.xloc = x;
    this.yloc = y;
    this.sprite = 'images/Rock2.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks


Rock.prototype.update = function(dt) {
    if (this.xloc > 600) {
        this.xloc = -300;
        // Change the rock track:
        if (this.yloc === 77) {
            this.yloc = 243;
        } else {
            this.yloc = 77;
        }
        
    // This happens if the rock collides with the player:
    } else if (rockCollision()) {
        // Collision sound if sounds are not turnet off:
        if (sounds) {
            enemyCollisionSound.play();
        }
        // The keyboard keys are disabled during the collision, so that player 
        // cannot be moved until he doesn't return to the starting position:
        $("body").keydown(function(event) { 
            return false;
        });
        // The player looses 10 points of Score if he has some:
        var minusScore = setTimeout('scoreSanction()', 30);
        // To make the collision visible - wait a while before returning 
        // player to the starting position:
        var playerBack = setTimeout(function() {
            Back(player);
            afterCollision();
        }, 500);

    // Enemies way of movement if nothing special happens:    
    } else {
        this.xloc ++;
    }

    // If a rock and a blue gem overlaps, the rock is replaced two blocks behind the gem:
    if (gemAndRockOverlap(allRocks, allBlueGems)) {
        this.xloc -= 202;
    }
};

// Draw the rock/rocks on the screen:
Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xloc, this.yloc);
};

// Rock objects:
var rock1 = new Rock(202,77);
var allRocks = [rock1];

// ============================== FUNCTIONS ====================================

// Sizes of the objects images are bigger than the characters on them.
// To make the collisions look like the objects really met, I set the
// edges of the objects this way:

function playerEdges() {    
    playerLeftEdgeX = player.xloc + 16;
    playerRightEdgeX = playerLeftEdgeX + 68;
    playerDownEdgeY = player.yloc - 30;
    playerUpEdgeY = playerDownEdgeY - 68;
}

function enemyEdges(enemy) {
    enemyLeftEdgeX = allEnemies[enemy].xloc + 3;
    enemyRightEdgeX = enemyLeftEdgeX + 93;
    enemyDownEdgeY = allEnemies[enemy].yloc - 30;
    enemyUpEdgeY = enemyDownEdgeY - 68;      
}

function gemEdges(gemArray, gem) {
    gemLeftEdgeX = gemArray[gem].xloc + 3;
    gemRightEdgeX = gemLeftEdgeX + 65;
    gemDownEdgeY = gemArray[gem].yloc - 50;
    gemUpEdgeY = gemDownEdgeY - 71;
    return [gemLeftEdgeX, gemRightEdgeX, gemDownEdgeY, gemUpEdgeY];
}

function rockEdges(rock) {
    rockLeftEdgeX = allRocks[rock].xloc + 10;
    rockRightEdgeX = rockLeftEdgeX + 65;
    rockDownEdgeY = allRocks[rock].yloc - 30;
    rockUpEdgeY = rockDownEdgeY - 68;
    return [rockLeftEdgeX, rockRightEdgeX, rockDownEdgeY, rockUpEdgeY];     
}

// COLLISIONS and OVERLAPINGS:

// Define the situation when a collision between the player and an enemy occures.
function enemyCollision() {
    playerEdges();
    // Collision:
    for (enemy in allEnemies) {            
        enemyEdges(enemy);
        if ((enemyRightEdgeX > playerLeftEdgeX && enemyLeftEdgeX < playerRightEdgeX) 
            && (enemyUpEdgeY < playerDownEdgeY && enemyDownEdgeY > playerUpEdgeY)) {
            allEnemies[enemy].xloc += 5;
            return true;
        }
    }
}

// Define the situation when a collision between the player and a blue gem occures.
function gemCollision(gemArray, GemType) {
    playerEdges();     
    // Collision:
    for (gem in gemArray) {
        gemEdges(gemArray, gem);
        if ((gemRightEdgeX > playerLeftEdgeX && gemLeftEdgeX < playerRightEdgeX) 
            && (gemUpEdgeY < playerDownEdgeY && gemDownEdgeY > playerUpEdgeY)) {
            var newGem = new GemType(-500, gemArray[gem].yloc);
            gemArray.splice(gem, 1);
            var addGem = setTimeout(function() {
                gemArray.push(newGem);
            }, 5000);
            return true;
        }
    }    
}

// Define the situation when a collision between the player and a rock occures.
function rockCollision() {
    playerEdges();
    // Collision:
    for (rock in allRocks) {       
        rockEdges(rock);
        if ((rockRightEdgeX > playerLeftEdgeX && rockLeftEdgeX < playerRightEdgeX) 
            && (rockUpEdgeY < playerDownEdgeY && rockDownEdgeY > playerUpEdgeY)) {
            // Prevention from multiple score sanction per one collision:
            allRocks[rock].xloc += 5;
            return true;
        }
    }
}

// Define the situation when a Blue Gem and an Orange Gem overlap
function gemsOverlap(gemArray1, gemArray2) {
    for (gem1 in gemArray1) {
        var edgesGem1 = gemEdges(gemArray1, gem1);
        var leftEdgeGem1 = edgesGem1[0];
        var rightEdgeGem1 = edgesGem1[1];
        for (gem2 in gemArray2) {
            gemEdges(gemArray2, gem2);
            if ((gemRightEdgeX > leftEdgeGem1 && gemLeftEdgeX < rightEdgeGem1) 
                && (gem2.yloc === gem1.yloc)) {
                return true;
            }
        }    
    }  
}

// Define the situation when a Gem and a Rock overlap
function gemAndRockOverlap(rockArray, gemArray) {
    for (rock in rockArray) {
        var edgesRock = rockEdges(rock);
        var leftEdgeRock = edgesRock[0];
        var rightEdgeRock = edgesRock[1];
        var downEdgeRock = edgesRock[2];
        var upEdgeRock = edgesRock[3]
        for (gem in gemArray) {
            gemEdges(gemArray, gem);
            if ((gemRightEdgeX > leftEdgeRock && gemLeftEdgeX < rightEdgeRock) 
                && (gemUpEdgeY < downEdgeRock && gemDownEdgeY > upEdgeRock)) {
                return true;
            }    
        }  
    }    
}

// RESSET SOME OF THE SETTINGS, SO THAT THE GAME CAN CONTINUE AFTER COLLISION:

// This function returnes the player to the starting position and is used 
// when player reaches the water:
function Back(object) {
    object.xloc = 202;
    object.yloc = 400;    
}
// This function returnes the player to the starting position and is used
// in the case of collision with enemy:
function afterCollision() {
    // The keys are enabled again
    $("body").unbind();
    // The '-10s' text is hidden behind the game background:
    ctx.globalCompositeOperation="source-over";
}

// INCREASE/DECREASE SCORE:

// This function increases the score by 5 points (used when the player reaches the water):
function increaseScore() {
    Score = parseInt($("#actualscore").text());
    Score += 5;
    $("#actualscore").html(Score);
}

// This function incrases the score by 10 points (used in case of cllision with an orange gem)
function scoreBonus() {
    $("#actualscore").html(Score + 10);
    if (Time>0) {
        scoreBonusText();
    }
}

// This function draws the text '+10 pts' (used in case of collision with an orange gem)
function scoreBonusText() {
    ctx.lineWidth = 2;
    ctx.textAlign = "center";
    
    ctx.font="bold 65px Verdana";
    ctx.fillStyle="#98FB98";
    ctx.fillText("+10 pts", 252, 260);
    ctx.strokeStyle="black";
    ctx.strokeText("+10 pts", 252, 260);

    // Without this line the text would not be visible,
    // because the game background would be drawn on top of it.
    ctx.globalCompositeOperation="destination-over";   
}

// This function decreases the Score by 10 points (used in case of collision with a rock)
function scoreSanction() {
    if (Score<10) {
        $("#actualscore").html(0);
    } else {
        $("#actualscore").html(Score - 10);        
    }
    if (Time>0) {
        scoreSanctionText();
    }
}

// This function draws the text '-10 pts' (used in case of collision with a rock)
function scoreSanctionText() {
    ctx.lineWidth = 2;
    ctx.textAlign = "center";
    
    ctx.font="bold 65px Verdana";
    ctx.fillStyle="#FA8072";
    ctx.fillText("-10 pts", 252, 260);
    ctx.strokeStyle="black";
    ctx.strokeText("-10 pts", 252, 260);

    // Without this line the text would not be visible,
    // because the game background would be drawn on top of it.
    ctx.globalCompositeOperation="destination-over";   
}

// initial Best Score:
var bestScore = 0;

// INCREASE/DECREASE LEFT TIME:

// Initial time for game in seconds:
var Time = 60;
// Time countdown:
function minusOneSecond() {
    // the actual time status has to be always detected first, because it could have been decreased
    // by a collision:
    Time = $("#actualtime").text();
    if (Time>0) {
        Time -= 1;
        $("#actualtime").html(Time);
    } else {
        // if left time is 0 seconds, the countdown stops and the game is over:
        Back(player);
        gameOver();
    }
}

// This function decreases the left time by 10s (used in case of collision with an enemy)
function timeSanction() {
    if (Time<10) {
        $("#actualtime").html(0);
    } else {
        timeSanctionText();
        $("#actualtime").html(Time - 10);
    }
}

// This function draws the text '-10s' (used in case of collision with an enemy)
function timeSanctionText() {
    ctx.lineWidth = 2;
    ctx.textAlign = "center";
    
    ctx.font="bold 65px Verdana";
    ctx.fillStyle="#FA8072";
    ctx.fillText("-10s", 252, 260);
    ctx.strokeStyle="black";
    ctx.strokeText("-10s", 252, 260);

    // Without this line the text would not be visible,
    // because the game background would be drawn on top of it.
    ctx.globalCompositeOperation="destination-over";   
}

// This function increases the Time Left by 10s (used in case of collision with a blue gem)
function timeBonus() {
    timeBonusText();
    $("#actualtime").html(Time + 10);
}

// This function draws the text '+10s' (used in case of collision with a blue gem)
function timeBonusText() {
    ctx.lineWidth = 2;
    ctx.textAlign = "center";
    
    ctx.font="bold 65px Verdana";
    ctx.fillStyle="#98FB98";
    ctx.fillText("+10s", 252, 260);
    ctx.strokeStyle="black";
    ctx.strokeText("+10s", 252, 260);

    // Without this line the text would not be visible,
    // because the game background would be drawn on top of it.
    ctx.globalCompositeOperation="destination-over";   
}

// GAME OVER:

var globalID;
// This function stops the game, draws the Game Over text with game results
// and displays the Play Again button:
function gameOver() {
    // Ensure the displayed score is actual:
    Score = parseInt($("#actualscore").text());
    
    // Stop game:
    cancelAnimationFrame(globalID);
    // Display the Game Over status and the game result:
    ctx.lineWidth = 2;
    ctx.textAlign = "center";
    
    ctx.font="bold 65px Verdana";
    ctx.fillStyle="red";
    ctx.fillText("GAME OVER!", 252, 260);
    ctx.strokeStyle="black";
    ctx.strokeText("GAME OVER!", 252, 260);
    
    ctx.font="bold 40px Verdana";
    ctx.fillStyle="white";
    ctx.fillText("Your Score: " + Score, 252, 420);
    ctx.strokeStyle="black";
    ctx.strokeText("Your Score: " + Score, 252, 420);

    // Update best score:
    if (Score > bestScore) {
        bestScore = Score;
        ctx.font="bold 30px Verdana";
        ctx.fillStyle="red";
        ctx.fillText("New Best!", 252, 550);
        ctx.strokeStyle="black";
        ctx.strokeText("New Best!", 252, 550);
    }

    ctx.font="bold 40px Verdana";
    ctx.fillStyle="yellow";
    ctx.fillText("Best Score: " + bestScore, 252, 490);
    ctx.strokeStyle="black";
    ctx.strokeText("Best Score: " + bestScore, 252, 490);
    
    // Hide the pause and sound buttons:          
    $(".fa").css("display", "none");
    // Display the Play Again button:
    $(".again").css("display", "inline-block");

}
