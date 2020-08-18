import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { ModalController, ToastController } from '@ionic/angular';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public username: string;
  public password : string;
  constructor(public toastController: ToastController, private localData: LocalDataService, private core:CoreService, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  login() {
    this.core.createJwt(this.username, this.password)
      .then((res)=>{
        console.log(res);
        this.localData.setJwt(res['payload'])
        this.dismiss();
      })
      .catch((err)=>{
        this.errorToast()
        console.log(err);
      })
  }
  async errorToast () {
    const toast = await this.toastController.create({
      message: 'usuario y/o contraseña incorrectos',
      duration: 3000
    });
    toast.present();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
