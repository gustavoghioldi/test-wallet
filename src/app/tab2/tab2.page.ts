import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ConvertPage } from '../modals/convert/convert.page';
import { PaysPage } from '../modals/pays/pays.page';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  public price = {
    "sell_price": 0,
    "buy_price":0
  };
  constructor(public modalController: ModalController, private localData: LocalDataService, private router: Router) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd && this.router.url == '/tabs/tab2') {
        this.localData.getUserData('duollar_price').then(data => {
          this.price = {
            sell_price : data['sell_price'],
            buy_price: data ['buy_price']
          }
        })
      }
    });
  }

  async modalTranfer(kindOf:string) {
    const modal = await this.modalController.create({
      component: PaysPage,
      mode: "ios",
      componentProps: {
        'kindOf': kindOf
      }
    });
    return await modal.present();
  }

  async modalConvert(kindOf:string) {

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
