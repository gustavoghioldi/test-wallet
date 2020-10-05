import { Component, OnInit } from '@angular/core';
import {  Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
  CameraPhoto, CameraSource } from '@capacitor/core';
const { Camera } = Plugins;

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.page.html',
  styleUrls: ['./userdata.page.scss'],
})
export class UserdataPage implements OnInit {
  public country: string = "ARGENTINA"
  public state:string 
  public city: string
  public street: string
  public cp: string
  public id_type: string
  public id: string
  public cel_phone: string
  public date_of_birth: Date
  public gender: string

  constructor() { }

  ngOnInit() {
  }



}
