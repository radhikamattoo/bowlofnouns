const { ipcRenderer } = require('electron');

document.addEventListener("DOMContentLoaded", function(event) {
    let nameNode = document.getElementById("name");
    let joinExistingGameCodeNode = document.getElementById("joinExistingGameCode");
    
    document.getElementById("joinExistingGameBtn").addEventListener('click', () => {
        const name = nameNode.value;
        const code = joinExistingGameCodeNode.value;
        console.log(`Joining existing game with code ${code} for player ${name}!`);
        const payload = {
            name,
            code
        };
        ipcRenderer.invoke('join-existing-game', payload);
    });

    document.getElementById("createNewGameBtn").addEventListener('click', () => {
        const name = nameNode.value;
        console.log(`Creating new game for player ${name}`);
        const payload = {
            name
        };
        ipcRenderer.invoke('create-new-game', payload);
    });
})

