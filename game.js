var buttonColours = ["blue", "green", "red", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

var started = false;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true
    }
    
})

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    (userClickedPattern.push(userChosenColour));
    

    playSound(userChosenColour);

    $("#"+ userChosenColour).addClass("pressed");
    setTimeout(function(){
        $("#"+ userChosenColour).removeClass("pressed");
    }, 100)
    
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor((Math.random()*4));
    
    var randomChosenColor = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);        //animation

    var audio = new Audio( randomChosenColor+ ".mp3")
    audio.play();

    
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
           
            setTimeout(function(){
                nextSequence();
            }, 1000);

            
        }
    } else{
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press any key to restart");
        startOver();
    }

   
}

function playSound(sound){
    var audio = new Audio( sound+ ".mp3");
    audio.play();
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}

