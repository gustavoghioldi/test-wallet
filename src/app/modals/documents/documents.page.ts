import { core } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {  Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { CoreService } from 'src/app/services/core.service';
const { Camera } = Plugins;

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})

export class DocumentsPage implements OnInit {

  public proof_residence : string
  public id_front: string
  public id_back: string


  constructor(private core:CoreService, private modalCtrl: ModalController ) { }

  ngOnInit() {
  }
  
  async takePhoto(kingOf: string) {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64, 
      source: CameraSource.Camera, 
      quality: 100
    });

    if (kingOf == 'proof_residence') {
      this.proof_residence = photo.base64String;
    }
    if (kingOf == 'id_front') {
      this.id_front = photo.base64String;
    }
    if (kingOf == 'id_back') {
      this.id_back = photo.base64String;
    }
    
  }

  send() {
    this.core.sep0009Documents(this.id_front, this.id_back, this.proof_residence)
      .then(data=>console.log(data))
      .catch(err=>console.log(err))
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
