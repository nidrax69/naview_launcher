const electron = require('electron')
const {app, BrowserWindow} = electron

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
var client = require('electron-connect').client;
const {ipcMain} = require('electron');

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
  // Create the browser window.
  var width_final = Math.floor(width / 1.2);
  var height_final = Math.floor(height / 1.2);

  mainWindow = new BrowserWindow(
  {
    width: width_final,
    height: height_final,
    resizable: false,
    fullscreenable: false,
    titleBarStyle: 'hidden',
    // frame: false
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');


  // Connect to server process
  client.create(mainWindow);

  // Uncomment to use Chrome developer tools
  // mainWindow.webContents.openDevTools({detach:false});

  // remove cookie if windows is closed
  function delete_cookie( name ) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    delete_cookie('id_token');
    mainWindow = null;
  });
});
