import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { CoreService } from '../services/core.service';
import { LocalDataService } from '../services/local-data.service';
import { ModalController } from '@ionic/angular';
import { UserdataPage } from '../modals/userdata/userdata.page';
import { DocumentsPage } from '../modals/documents/documents.page';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  public userData : object = {};
  constructor(public modalController: ModalController, public core: CoreService,private localData: LocalDataService,  private router: Router) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd && this.router.url == '/tabs/tab4') { 
        core.getUserData().then(data=>{
          console.log(data);
          this.userData = data['payload']
        })
      }
   });
  }


  async modalUserData() {

    const modal = await this.modalController.create({
      component: UserdataPage,
      mode: "ios"
    });
    return await modal.present();
  }

  async modalDocuments() {

    const modal = await this.modalController.create({
      component: DocumentsPage,
      mode: "ios"
    });
    return await modal.present();
  }

  async info() {
    await Browser.open({ url: 'http://argenpepper.com/' });
  }
  

}
