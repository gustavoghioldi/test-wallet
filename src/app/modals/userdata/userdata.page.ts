import { Component, OnInit } from '@angular/core';
import {  Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
  CameraPhoto, CameraSource } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { CoreService } from 'src/app/services/core.service';
const { Camera } = Plugins;

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.page.html',
  styleUrls: ['./userdata.page.scss'],
})
export class UserdataPage implements OnInit {
  public country: string = "AR"
  public state:string 
  public city: string
  public street: string
  public cp: string
  public id_type: string = "DNI"
  public id: string
  public cel_phone: string
  public date_of_birth: string
  public gender: string
  public cbu: string

  constructor(private core: CoreService, private modalCtrl: ModalController ) { }

  ngOnInit() {
  }

  send() {
    this.core.sep0009(this.country, this.state, this.city, this.street, this.cp, this.id_type, this.id, this.cel_phone, this.cbu, this.date_of_birth, this.gender)
      .then(data => {
        console.log(data)
      })
      .catch(err=> {

      })
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }



}
