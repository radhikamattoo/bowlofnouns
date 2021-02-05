const { ipcRenderer } = require('electron');

document.addEventListener("DOMContentLoaded", function(event) {
    const nameNode = document.getElementById("name");
    const onlineGameNode = document.getElementById("onlineGameRadio");
    const joinExistingOnlineGameCodeNode = document.getElementById("joinExistingOnlineGameCode");
    
    document.getElementById("joinExistingOnlineGameBtn").addEventListener('click', () => {
        const name = nameNode.value;
        const code = joinExistingOnlineGameCodeNode.value;
        console.log(`Joining existing onlinegame with code ${code} for player ${name}!`);
        const payload = {
            name,
            code
        };
        ipcRenderer.invoke('join-existing-online-game', payload);
    });

    // TODO: Handle error if session code does not exist

    document.getElementById("createNewGameBtn").addEventListener('click', () => {
        const name = nameNode.value;
        const online = onlineGameNode.checked ? true : false;
        console.log(`Creating new game for player ${name} ${online ? "online": "locally"}`);
        const payload = {
            name,
            online
        };
        ipcRenderer.invoke('create-new-game', payload);
    });

    
})

