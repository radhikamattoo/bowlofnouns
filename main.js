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
  width: 800,
  height: 600,
  minWidth: 800,
  minHeight: 600,
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
ipcMain.handle('create-new-game', (event, req_payload) =>{
  const name = req_payload.name;
  const online = req_payload.online;
  console.log(`Creating new game in ipcMain handler: ${JSON.stringify(req_payload)}`);

  const player = Object.assign({}, schema.player, {
    name,
    uuid: v4()
  });
  const game = Object.assign({}, schema.game);
  
  // initialize game
  game.uuid = v4();
  game.game_leader = player;
  game.players.push(player);

  // Initialize session
  const session = Object.assign({}, schema.session);
  session.uuid = v4();
  session.code = v4().substring(0, 5);
  session.online = online;
  session.players.push(player);

  // Open window and send game data to window
  const gameWindowConfig = Object.assign({}, defaultWindowConfig, { show: false });
  gameWindow = new BrowserWindow(gameWindowConfig);
  gameWindow.loadFile('pages/game/local_game.html');

  gameWindow.webContents.on('did-finish-load', () => {
    gameWindow.show();
    homeWindow.hide();

    const res_payload = {
      session,
      host_player: player
    };
    gameWindow.webContents.send('start-new-game', res_payload);
  });
});

ipcMain.handle('join-existing-online-game', (event, payload) =>{
  console.log("ipcMain handling join-existing-game action");
});




