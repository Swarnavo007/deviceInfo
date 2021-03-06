import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpcService } from './providers/electron.service';
import {DataService } from './data.service';
// import { ElectronService} from './providers/electron.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // constructor(private electron:ElectronService){}
  // title = 'app01';

  // display(){
  //   this.electron.ipcRenderer.send('open-display');
  // }
  public details:any[]=[];
  public numbers=[1,2,3,4];
  public infos:any[]=[];
  public length:number=0;

  constructor(private readonly ipc: IpcService, private datas:DataService, private zone:NgZone) {
    this.ipc.on('my-event', (e: any, val: string) => {
      console.log('my-event: ' + val);
    });
  }

  ngOnInit():void{
    this.ipc.on('send',(event: any,arg: any)=>{
      this.zone.run(()=>{
        this.details=JSON.parse(arg);
      // console.log(arg)
      console.log(this.details);
      this.datas.insert(this.details);
      this.length=this.details.length;
      })
      
    })
    this.ipc.on('value',(event:any,arg:any)=>{
      this.zone.run(()=>{
        this.infos=JSON.parse(arg);
      })
      console.log(JSON.parse(arg));
    })
    this.ipc.send('open-display');
    
  }
  // display(){
  //   this.ipc.send('open-display');

  //   // this.ipc.on('send',(event: any,arg: any)=>{
  //   //   this.details=arg;
  //   //   // console.log(arg)
  //   //   console.log(this.details);
  //   // })

  // }
}
