import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { CoreService } from 'src/app/services/core.service';
@Component({
  selector: 'app-pays',
  templateUrl: './pays.page.html',
  styleUrls: ['./pays.page.scss'],

})
export class PaysPage implements OnInit {
  @Input() kindOf: string;
  accountIdentity: string;
  amount: number;
  balance: number;
  sellPrice: number;
  message: string;
  constructor(
    private modalCtrl: ModalController,
    public alertController: AlertController,
    public http: HttpClient,
    private core: CoreService,
    public loadingController: LoadingController
  ) {
    core.getPrice().then(data=>{
      console.log(data['price'].sell_price)
      this.sellPrice = data['price'].sell_price;
    }).catch()
  }

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
        message = "Esta seguro que quiere transferir: "+this.amount+"<br>";
        message += "a: "+this.accountIdentity
        break;
      default:
        break;
    }


    this.presentAlertPrompt(message);
  }

  async presentAlertPrompt(response) {
    this.core.createOTP('verify_transfer');
    
    const alert = await this.alertController.create({
      header: 'Chequear información',
      message: response,
      inputs: [
        {
          name: 'otp',
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
          handler: async (data) => {
            const loading = await this.presentLoading()
            loading.present()
            this.core.transfer(this.accountIdentity, this.amount, this.message, data.otp)
            .then(()=>{
              loading.dismiss()
              this.alertSuccessOrFail('SUCCESS')
            })
            .catch(()=>{
              loading.dismiss()
              this.alertSuccessOrFail('FAIL')
            })
            
          }
        }
      ]
    });
    await alert.present();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
  
    });
    return loading
  }
  async alertSuccessOrFail(message) {
    const alert = await this.alertController.create({
      message: message
    })
    alert.present()
  }


  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
