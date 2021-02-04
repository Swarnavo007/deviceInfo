import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public info:any=[];

  insert(items:any){
    this.info.push(items);
  }
}
