// Radhika Mattoo, radhika095@gmail.com
const redis = require("redis");
const REDIS_HOST_ = process.env.REDIS_HOST_ || '127.0.0.1';
const REDIS_PORT_= process.env.REDIS_PORT_ || 6379;
const client = redis.createClient(REDIS_PORT_, REDIS_HOST_);
const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const { v4 } = require('uuid');

// db schema: game, player, and session
const schema = require('./schema.json');

const defaultWindowConfig = {
  width: 900,
  height: 700,
  minWidth: 900,
  minHeight: 700,
  webPreferences: {
    nodeIntegration: true
  }
};

// Home Window
let homeWindow;
let gameWindow;
function createHomeWindow () {
  homeWindow = new BrowserWindow(defaultWindowConfig);

  homeWindow.loadFile('pages/index/index.html')
}

app.whenReady().then(createHomeWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createHomeWindow()
  }
})

// IPC for home window
ipcMain.handle('create-new-game', (event, payload) =>{
  const name = payload.name;
  const online = payload.online;
  console.log(`Creating new game in ipcMain handler: ${JSON.stringify(payload)}`);

  const player = Object.assign({}, schema.player, {
    name,
    uuid: v4()
  });
  const game = Object.assign({}, schema.game);
  
  // initialize game
  game.uuid = v4();
  game.players.push(player);
  game.team_1.players.push(player);
  game.code = v4().substring(0, 5);
  game.host_player = player;
  game.online = online;

  // Open window and send game data to window
  const gameWindowConfig = Object.assign({}, defaultWindowConfig, { show: false });
  gameWindow = new BrowserWindow(gameWindowConfig);
  gameWindow.loadFile('pages/game/local_game.html');

  gameWindow.webContents.on('did-finish-load', () => {
    gameWindow.show();
    homeWindow.hide();
    gameWindow.webContents.send('start-new-game', game);
  });
});

ipcMain.handle('join-existing-online-game', (event, payload) =>{
  console.log("ipcMain handling join-existing-game action");
});




