import { Component, OnInit } from '@angular/core';
import {  Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
  CameraPhoto, CameraSource } from '@capacitor/core';
const { Camera } = Plugins;

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})

export class DocumentsPage implements OnInit {

  public selfie: string
  public id_front: string
  public id_back: string


  constructor() { }

  ngOnInit() {
  }
  
  async takePhoto(kingOf: string) {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64, 
      source: CameraSource.Camera, 
      quality: 100
    });

    console.log(photo);
    
  }
}
