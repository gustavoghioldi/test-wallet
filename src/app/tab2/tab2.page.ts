import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConvertPage } from '../modals/convert/convert.page';
import { PaysPage } from '../modals/pays/pays.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public modalController: ModalController) {}

  async modalTranfer(kindOf) {

    const modal = await this.modalController.create({
      component: PaysPage,
      mode: "ios",
      componentProps: {
        'kindOf': kindOf
      }
    });
    return await modal.present();
  }

  async modalConvert(kindOf) {

    const modal = await this.modalController.create({
      component: ConvertPage,
      mode: "ios",
      componentProps: {
        'kindOf': kindOf
      }
    });
    return await modal.present();
  }
  async cashIn() {
    alert("Depositar en la cuenta : bla  bla bla ")
    console.log('CashIn...');  
  }

  async cashOut() {
    alert("Enviar a la cuenta: bla  bla bla ")
    console.log('CashOut...');  
  }
  

}
