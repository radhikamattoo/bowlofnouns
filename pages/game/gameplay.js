const { ipcRenderer } = require('electron');
ipcRenderer.on('start-new-game', function (event,payload) {
    console.log(payload);
});

document.addEventListener("DOMCOntentLoaded", function(evt){
    console.log("DOMContentLoaded");
});
console.log("Helloooo");