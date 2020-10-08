import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  public username: string
  public password: string
  public verifyPassword: string
  public first_name: string;
  public last_name: string;
  constructor(private modalCtrl: ModalController, private core: CoreService, public toastController: ToastController) { }

  send() {
    if (!this.validateEmail(this.username)) {
      this.viewToast("el nombre de usuario debe ser un email")
    } 
    else if (this.password != this.verifyPassword || this.password.length < 8){
      this.viewToast("verifique que el password sea identico y de mas de 8 caracteres")
    }
    else {
      this.core.signin(this.username, this.first_name, this.last_name, this.password)
      .then(data => {
        console.log(data)
        if (data['status']) {
          this.viewToast("Recibira un mail para confirmar la dirección\nNo olvides revisar correo spam")
          this.dismiss()
        }
      })
      .catch(err => { 
        console.log(err) 
        this.viewToast(err.error.message)
      })
    }
    

  }
  
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async viewToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });
    toast.present();
    this.dismiss()
  }

  ngOnInit() {
  }

}
