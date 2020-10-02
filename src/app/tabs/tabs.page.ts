import { Component } from '@angular/core';
import { CoreService } from '../services/core.service';
import { LocalDataService } from '../services/local-data.service';
import { Router, NavigationEnd } from '@angular/router';
import { LoginPage } from '../modals/login/login.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public amount;
  constructor(public core: CoreService, 
    public modalController: ModalController, 
    private localData: LocalDataService, 
    private router: Router) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd && this.router.url == '/tabs/tab1') {
        this.core.getAmount()
          .then((core_balance) => {
            console.log(core_balance)
            localData.setUserData('amount_dus', core_balance['payload']['accounts'].filter(x=>x.product ==1?x:false)[0].balance)
            localData.setUserData('amount_ars', core_balance['payload']['accounts'].filter(x=>x.product ==2?x:false)[0].balance)
          })
          .catch((err) => {
            this.loginModal()
          });
      }
    });
  }

  async loginModal() {
    const modal = await this.modalController.create({
      component: LoginPage,
      mode: "ios",
    });
    return await modal.present();
  }

}
