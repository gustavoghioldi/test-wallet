import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-pays',
  templateUrl: './pays.page.html',
  styleUrls: ['./pays.page.scss'],

})
export class PaysPage implements OnInit {
  @Input() kindOf: string;
  accountIdentity: string;
  amount: number;
  constructor(
    private modalCtrl: ModalController,
    public alertController: AlertController,
    public http: HttpClient,
  ) { }

  ngOnInit(): void {

  }
  async check(kindOf) {
    this.accountIdentity;
    let message = null;
    switch (kindOf) {
      case 'CBU':
        message = "Esta seguro que quiere transferir al CBU: "+this.accountIdentity;
        break;
      case 'G2G':
        message = await this.http.get('https://en097zv9y98qmg.x.pipedream.net').toPromise();
        break;
      default:
        break;
    }


    this.presentAlertPrompt(message);
  }

  async presentAlertPrompt(response) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Chequear información',
      message: response,
      inputs: [
        {
          name: 'transfer_token',
          type: 'password',
          placeholder: 'password de seguridad',
          attributes: {
            maxlength: 8,
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel Transfer');
          }
        }, {
          text: 'Ok',
          handler: data => {
            console.log(data.transfer_token);
          }
        }
      ]
    });
    await alert.present();
  }

  confirm_cbu() {

  }

  confirm_g2g() {

  }


  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
