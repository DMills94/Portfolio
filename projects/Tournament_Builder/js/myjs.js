//------------------------------------------------------------------------//
//--------------JAVASCRIPT FILE FOR 1V1 TOURNAMENT BUILDER----------------//
//------------------------------------------------------------------------//


//--------Radio Btns--------//
//Event Listeners
var seededBtn = document.getElementById("seedYes").addEventListener('click', loadSeed, false);
var seededBtn = document.getElementById("seedNo").addEventListener('click', loadNoSeed, false);


//Display information functions
function loadSeed(){
    document.getElementById("inputField").style.visibility = 'visible';
    document.getElementById("seedings").style.display = 'block';
    document.getElementById("tourneyCreateBtn").style.visibility = 'visible';
}

function loadNoSeed(){
    document.getElementById("inputField").style.visibility = 'visible';
    document.getElementById("seedings").style.display = 'none';
    document.getElementById("tourneyCreateBtn").style.visibility = 'visible';
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
            document.getElementById("player1").innerHTML = listOfPlayers[0];
            document.getElementById("player2").innerHTML = listOfPlayers[15];
            document.getElementById("player3").innerHTML = listOfPlayers[7];
            document.getElementById("player4").innerHTML = listOfPlayers[8];
            document.getElementById("player5").innerHTML = listOfPlayers[5];
            document.getElementById("player6").innerHTML = listOfPlayers[10];
            document.getElementById("player7").innerHTML = listOfPlayers[3];
            document.getElementById("player8").innerHTML = listOfPlayers[12];
            document.getElementById("player9").innerHTML = listOfPlayers[2];
            document.getElementById("player10").innerHTML = listOfPlayers[13];
            document.getElementById("player11").innerHTML = listOfPlayers[4];
            document.getElementById("player12").innerHTML = listOfPlayers[11];
            document.getElementById("player13").innerHTML = listOfPlayers[6];
            document.getElementById("player14").innerHTML = listOfPlayers[9];
            document.getElementById("player15").innerHTML = listOfPlayers[1];
            document.getElementById("player16").innerHTML = listOfPlayers[14];
        }

        //IF TOURNAMENT IS NOT SEEDED (randomly assign)
        if (document.getElementById("seedNo").checked){
            //Randomly assign using second "mapped" list to save order
            mapList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
            shuffleArray(mapList);
            for (i = 0; i < listOfPlayers.length; i++){
                document.getElementById("player" + (i+1)).innerHTML = listOfPlayers[mapList[i]];
            }
        }
    }
    else {
        return;
    }

    document.getElementById("bracket").style.display = 'flex';
    document.getElementById("tourneyModifyBtn").style.display = 'inline-block';

    //Reset Colours on Bracket on Generate
    for (i = 0; i < playerBoxes.length; i++){
        var boxID = playerBoxes[i].id.toString();
        document.getElementById(boxID).style.background = 'white';
    }
}

//Modify Bracket
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

    //Use existing mapList to place new names
    for (i = 0; i < listOfPlayers.length; i++){
        document.getElementById("player" + (i+1)).innerHTML = listOfPlayers[mapList[i]];
    }

}



//Shuffle Array Function for unseeded Bracket (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

}





//Function to move the winner onto the next round
function Winner(matchID, winnersName, winnerID, loserID){
    switch(matchID){
        case 1:
            document.getElementById("qf1").innerHTML = winnersName;
            document.getElementById(winnerID).style.background = 'lightgreen';
            document.getElementById(loserID).style.background = 'white';
            break;
        case 2:
            document.getElementById("qf2").innerHTML = winnersName;
            document.getElementById(winnerID).style.background = 'lightgreen';
            document.getElementById(loserID).style.background = 'white';
            break;
        case 3:
            document.getElementById("qf3").innerHTML = winnersName;
            document.getElementById(winnerID).style.background = 'lightgreen';
            document.getElementById(loserID).style.background = 'white';
            break;
        case 4:
            document.getElementById("qf4").innerHTML = winnersName;
            document.getElementById(winnerID).style.background = 'lightgreen';
            document.getElementById(loserID).style.background = 'white';
            break;
        case 5:
            document.getElementById("qf5").innerHTML = winnersName;
            document.getElementById(winnerID).style.background = 'lightgreen';
            document.getElementById(loserID).style.background = 'white';
            break;
        case 6:
            document.getElementById("qf6").innerHTML = winnersName;
            document.getElementById(winnerID).style.background = 'lightgreen';
            document.getElementById(loserID).style.background = 'white';
            break;
        case 7:
            document.getElementById("qf7").innerHTML = winnersName;
            document.getElementById(winnerID).style.background = 'lightgreen';
            document.getElementById(loserID).style.background = 'white';
            break;
        case 8:
            document.getElementById("qf8").innerHTML = winnersName;
            document.getElementById(winnerID).style.background = 'lightgreen';
            document.getElementById(loserID).style.background = 'white';
            break;
        case 8:
            document.getElementById("qf8").innerHTML = winnersName;
            document.getElementById(winnerID).style.background = 'lightgreen';
            document.getElementById(loserID).style.background = 'white';
            break;
        case 9:
            document.getElementById("sf1").innerHTML = winnersName;
            document.getElementById(winnerID).style.background = 'lightgreen';
            document.getElementById(loserID).style.background = 'white';
            break;
        case 10:
            document.getElementById("sf2").innerHTML = winnersName;
            document.getElementById(winnerID).style.background = 'lightgreen';
            document.getElementById(loserID).style.background = 'white';
            break;
        case 11:
            document.getElementById("sf3").innerHTML = winnersName;
            document.getElementById(winnerID).style.background = 'lightgreen';
            document.getElementById(loserID).style.background = 'white';
            break;
        case 12:
            document.getElementById("sf4").innerHTML = winnersName;
            document.getElementById(winnerID).style.background = 'lightgreen';
            document.getElementById(loserID).style.background = 'white';
            break;
        case 13:
            document.getElementById("finalist1").innerHTML = winnersName;
            document.getElementById(winnerID).style.background = 'lightgreen';
            document.getElementById(loserID).style.background = 'white';
            break;
        case 14:
            document.getElementById("finalist2").innerHTML = winnersName;
            document.getElementById(winnerID).style.background = 'lightgreen';
            document.getElementById(loserID).style.background = 'white';
            break;
        case 15:
            document.getElementById(winnerID).style.background = 'lightgreen';
            document.getElementById(loserID).style.background = 'white';
            break;
    }
}