//------------------------------------------------------------------------//
//--------------JAVASCRIPT FILE FOR 1V1 TOURNAMENT BUILDER----------------//
//------------------------------------------------------------------------//


//--------Radio Btns--------//
//Event Listeners
var seededBtn = document.getElementById("seedYes").addEventListener('click', loadSeed, false);
var seededBtn = document.getElementById("seedNo").addEventListener('click', loadNoSeed, false);


//Display information functions
function loadSeed(){
    document.getElementById("inputField").style.display = 'inline-flex';
    document.getElementById("seedings").style.display = 'block';
    document.getElementById("tourneyCreateBtn").style.visibility = 'visible';
    document.getElementById("startingImg").style.display = 'none';
}

function loadNoSeed(){
    document.getElementById("inputField").style.display = 'inline-flex';
    document.getElementById("seedings").style.display = 'none';
    document.getElementById("tourneyCreateBtn").style.visibility = 'visible';
    document.getElementById("startingImg").style.display = 'none';
}


//-----Generate Bracket-----//
//Event Listener
var generateBtn = document.getElementById("tourneyCreateBtn").addEventListener('click', buildBracket, false);
var modifyBtn = document.getElementById("tourneyModifyBtn").addEventListener('click', modifyBracket, false);

//Button Click Function
function buildBracket(){

    //Reset error message each time
    document.getElementById("errorMessage").innerHTML = "";

    //Collect list of all inputs
    var playerInputs = document.getElementsByClassName("player-input");
    var listOfPlayers = [];

    //Add inputs (if contains letters) to a list or produce an error message
    for (var i = 0; i < playerInputs.length; i++){
        playerName = playerInputs[i].value;
        if (/^[a-zA-Z0-9][- .A-Za-z0-9]*$/.test(playerName)){
            listOfPlayers.push(playerName);
        } else {
            document.getElementById("errorMessage").innerHTML += "You have either entered an invalid or empty name in row " + (i+1) + "<br>";
        }
    }

    //If statement to continue generation only if list contains 16 values
    if (listOfPlayers.length == 16){

        //Clear existing information
        var playerBoxes = document.getElementsByClassName("player-box");
        for (i = 0; i < playerBoxes.length; i++){
            var boxID = playerBoxes[i].id.toString();
            document.getElementById(boxID).innerHTML = "";
        }

        //IF TOURNAMENT IS SEEDED (set to make seed 1 and 2 meet in Grand Finals)
        if (document.getElementById("seedYes").checked){
            bracketOrder = [0,15,7,8,5,10,3,12,2,13,4,11,6,9,1,14]
            for (i = 0; i < listOfPlayers.length; i++){
                document.getElementById("player" + (i+1)).innerHTML = listOfPlayers[bracketOrder[i]];
            }
            document.getElementById("seedingText").innerHTML = "<p>You have chosen a <strong>SEEDED</strong> Bracket<br>To change to a non seeded bracket refresh your page<br><br>Here are your teams!<p>"
            document.getElementById("seedingBtns").style.display = 'none';
        }

        //IF TOURNAMENT IS NOT SEEDED (randomly assign)
        else if (document.getElementById("seedNo").checked){
            //Randomly assign using second "mapped" list to save order
            bracketOrder = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
            shuffleArray(bracketOrder);
            for (i = 0; i < listOfPlayers.length; i++){
                document.getElementById("player" + (i+1)).innerHTML = listOfPlayers[bracketOrder[i]];
            }
            document.getElementById("seedingText").innerHTML = "<p>You have chosen a <strong>NON SEEDED</strong> Bracket<br>To change to a non seeded bracket refresh your page<br><br>Here are your teams!<p>"
            document.getElementById("seedingBtns").style.display = 'none';
        }
    } else {
        return;
    }

    document.getElementById("bracket").style.display = 'flex';
    document.getElementById("tourneyModifyBtn").style.display = 'inline-block';
    document.getElementById("tourneyResetBtn").style.display = 'inline-block';
    document.getElementById("roundSelect").style.display = 'block';


    //Reset Colours on Bracket on Generate
    for (i = 0; i < playerBoxes.length; i++){
        var boxID = playerBoxes[i].id.toString();
        document.getElementById(boxID).classList = 'player-box';
    }
}


//-----Modify Bracket-----//

function modifyBracket() {
    //Collect list of all inputs
    var playerInputs = document.getElementsByClassName("player-input");
    var listOfPlayers = [];

    //Add inputs (if contains letters) to a list or produce an error message
    for (var i = 0; i < playerInputs.length; i++){
        playerName = playerInputs[i].value;
        if (/^[a-zA-Z0-9][- .A-Za-z0-9]*$/.test(playerName)){
            listOfPlayers.push(playerName);
        } else {
            document.getElementById("errorMessage").innerHTML += "You have either entered an invalid or empty name in row " + (i+1) + "<br>";
        }
    }

    //Use existing bracketOrder to place new names
    for (i = 0; i < listOfPlayers.length; i++){
        document.getElementById("player" + (i+1)).innerHTML = listOfPlayers[bracketOrder[i]];
    }

    //If player-box is a winner, update further round information
    var modifiedPlayers = document.getElementsByClassName("player-box");
    for (i = 0; i < modifiedPlayers.length; i++){
        if(modifiedPlayers[i].className.includes("winner") === true){
            Winner(modifiedPlayers[i], modifiedPlayers[i].innerHTML);
        }
    }


}

//Shuffle Array Function for unseeded Bracket (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//RESET BUTTON
document.getElementById("tourneyResetBtn").addEventListener('click', function(){location.reload()}, false);

//-----Mobile Design Round Select Buttons-----//

//Event Listeners
var roundBtns = document.getElementsByClassName("round-select-btn");
for (i = 0; i < roundBtns.length; i++){
    roundBtns[i].addEventListener('click', changeRound, false);
}

//Change Round Function

function changeRound() {
    //Get list of all rounds
    var rounds = document.getElementsByClassName("tourney-round");
    //Get ID for the round you want to show from button
    var whatRoundID = this.id.slice(0, -3);
    //Hide all rounds by default
    for (i = 0; i < roundBtns.length; i++){
        rounds[i].style.display = 'none';
    }
    //Display round of button clicked
    document.getElementById(whatRoundID).style.display = 'block';

    //Alter round buttons to show which is active
    for (i = 0; i < roundBtns.length; i++){
        roundBtns[i].style.background = 'black';
        roundBtns[i].style.color = 'white';
    }
    this.style.background = 'white';
    this.style.color = 'black';
}




//USER RESPONSIVE UPDATING
//Event Listeners for all player boxes
var playerBoxList = document.getElementsByClassName("player-box");
for (i = 0; i < playerBoxList.length; i++){
    playerBoxList[i].addEventListener('click', markAsWinner, false);
}

//Function to move the winner onto the next round
function Winner(matchwinner, winnername){

    //Define player-box clicked as the "winner"
    matchwinner.classList = "player-box winner"

    //Get Opponent Name to set as "loser"
    var roundName = matchwinner.name
    var roundPosition = parseInt(roundName.substring(4));
    otherNumber = (roundPosition % 2) ? roundPosition+1 : roundPosition-1 //check if last character is odd or even integer
    opponentName = matchwinner.name.substr(0,4) + otherNumber; //Create full opponent name
    document.getElementsByName(opponentName)[0].classList = "player-box loser"; //Set loser classname

    //Move Winner on
    var roundNumber = parseInt(roundName[2]);
    //Move winner unless match is in round 4 (Finals)
    if (roundNumber != 4) {
        roundNumber += 1 //Move onto the next round
        var newRndPosition = Math.floor(((roundPosition - 1) / 2) + 1); //Generate the new round number
        var newRndName = "rd" + roundNumber + "_" + newRndPosition; //Generate the full round + position name

        //Fill in next round player-box
        document.getElementsByName(newRndName)[0].innerHTML = winnername;
        if ((document.getElementsByName(newRndName)[0].className).includes('winner') === true){
            Winner(document.getElementsByName(newRndName)[0], document.getElementsByName(roundName)[0].innerHTML);
        }
    }
    else {
        document.getElementById("winnersMessage").style.display = 'block';
        document.getElementById("winnersMessage").innerHTML = "CONGRATULATIONS " + winnername + "!<br>They have won the tournament!";
    }
}

function markAsWinner(){
    //Prevent execution if player-box has no content
    if (this.innerHTML == ""){
        return;
    }

    //Ensure opponent exists
    var roundName = this.name
    var roundPosition = parseInt(roundName.substring(4));
    otherNumber = (roundPosition % 2) ? roundPosition+1 : roundPosition-1 //check if last character is odd or even integer
    opponentName = this.name.substr(0,4) + otherNumber; //Create full opponent name

    if(document.getElementsByName(opponentName)[0].innerHTML == "") {
        return;
    }
    Winner(this, this.innerHTML);
}