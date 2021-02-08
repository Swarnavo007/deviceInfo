const { app, BrowserWindow } = require('electron');
const HID =require('node-hid');
const ipc=require('electron').ipcMain;
const dialog=require('electron').dialog;
const low=require('lowdb');
const FileSync=require('lowdb/adapters/FileSync')

let devices=HID.devices();
console.log(devices);
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ posts: [], user: {} })
  .write()

db.get('posts')
  .push({ id: 1, title: 'Node JS'})
  .write()

db.get('posts')
  .push({ id: 2, title: 'ElectronJS'})
  .write()

db.get('posts')
  .push({ id: 3, title: 'ExpressJS'})
  .write()
 
// Set a user using Lodash shorthand syntax
db.set('user.name', 'typicode')
  .write()
let win;

function createWindow(){

    win=new BrowserWindow({
        webPreferences:{
            nodeIntegration:true,
            webSecurity:false
        },
        width:600,
        height:600
    })

    win.loadFile('dist/app01/index.html');

    // win.webContents.openDevTools();

    win.on('closed',function(){
        win=null;
    })
}

const info=db.get('posts').value();

console.log(info);

ipc.on('open-display',(event)=>{
    // dialog.showErrorBox('A message',`${JSON.stringify(devices)}`);
    event.sender.send('send',`${JSON.stringify(devices)}`)
    event.sender.send('value',`${JSON.stringify(info)}`)
    // dialog.showMessageBox('Message');
})

app.on('ready',createWindow);

app.on('window-all-closed',function(){
    if(process.platform!=='darwin'){
        app.quit();
    }
})

app.on('activate',function(){
    if(win===null){
        createWindow();
    }
})