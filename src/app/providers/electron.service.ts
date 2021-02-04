// import { Injectable } from '@angular/core';
// import { ipcRenderer,BrowserWindow,remote,webFrame } from 'electron';
// import * as childProcess from 'child_process';
// import * as fs from 'fs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ElectronService {

//   ipcRenderer:any= typeof ipcRenderer;
//   webFrame:any= typeof webFrame;
//   remote:any= typeof remote;
//   window:any= BrowserWindow;
//   // childProcess:any=typeof childProcess;
//   // fs:any=typeof fs;

//   constructor() {

//     if(this.isElectron()){
//       this.ipcRenderer=window.require('electron').ipcRenderer;
//       this.webFrame = window.require('electron').webFrame;
//       this.remote=window.require('electron').remote;
//       this.window=window.require('electron').remote.getCurrentWindow();
//       // this.childProcess=window.require('child_process');
//       // this.fs=window.require('fs');
//     }

//   }

//   isElectron = ()=>{
//     return window && window.process && window.process.type;
//   }

  
// }

import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class IpcService {
  private ipc: IpcRenderer | undefined = void 0;

  constructor() {
    if ((window as any).require) {
      try {
        this.ipc = (window as any).require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron IPC was not loaded');
    }
  }

  public on(channel: string, listener: any): void {
    if (!this.ipc) {
      return;
    }

    this.ipc.on(channel, listener);
  }

  public send(channel: string, ...args: any[]): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.send(channel, ...args);
  }
}