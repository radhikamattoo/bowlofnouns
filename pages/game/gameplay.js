const { ipcRenderer } = require('electron');

let game = null;
document.addEventListener("DOMContentLoaded", main);

function main(){
    ipcRenderer.on('start-new-game', function (event, gamePayload) {
        if (gamePayload){
            game = Object.assign({}, gamePayload);
            players = game.players;
            const hostPlayer = game.host_player;

            // Create DOM elements for game setup
            addPlayerToTeamDOMList(hostPlayer, 1);
            const teamOneAddPlayerBtn = document.getElementById("teamOneAddPlayerBtn");
            teamOneAddPlayerBtn.addEventListener('click', addTeamOnePlayerEvtListener, false);
            const teamTwoAddPlayerBtn = document.getElementById("teamTwoAddPlayerBtn");
            teamTwoAddPlayerBtn.addEventListener('click', addTeamTwoPlayerEvtListener, false);
        }else{
            console.error("No init game found");
        }
        
    }); 
    
}

/**
 * Event listener for button that adds player to team 1
 */
function addTeamOnePlayerEvtListener(evt){
    const element = document.getElementById("teamOneAddPlayerInput");
    const name = element.value;
    element.value = "";
    const player = {
        name
    };
    addPlayerToTeamDOMList(player, 1);
}

/**
 * Event listener for button that adds player to team 2
 */
function addTeamTwoPlayerEvtListener(evt){
    const element = document.getElementById("teamTwoAddPlayerInput");
    const name = element.value;
    element.value = "";
    const player = {
        name
    };
    addPlayerToTeamDOMList(player, 2);
}

/**
 * Adds player name in DOM to respective team list
 */
function addPlayerToTeamDOMList(player, teamNumber){
    let playersNode;
    console.log("addPlayerToTeamDOMList", player, teamNumber);
    if(teamNumber == 1){
        playersNode = document.getElementById("teamOnePlayers");
    }else{
        playersNode = document.getElementById("teamTwoPlayers");
    }
    const playerListItemElement = document.createElement("li");
    playerListItemElement.setAttribute('class', 'list-group-item');

    const nameNode = document.createTextNode(player.name);
    playerListItemElement.appendChild(nameNode);
    
    playersNode.appendChild(playerListItemElement);


}


function startGame(){

}

function addPlayer(){

}