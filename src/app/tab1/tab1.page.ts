import { Component } from '@angular/core';
import { CoreService } from '../services/core.service';
import { LocalDataService } from '../services/local-data.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  public balance_dus;
  public balance_ars;
  public price: any = {
    "sell_price": "0",
    "buy_price":"0"
  };
  constructor(public core: CoreService, private localData: LocalDataService, private router: Router) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd && this.router.url == '/tabs/tab1') {
        this.localData.getUserData('amount_dus').then((data) => { 
          this.balance_dus = data || 0
          console.log(data)
          
        });
        this.localData.getUserData('amount_ars').then((data) => { 
          this.balance_ars = data || 0;
          console.log(data)
        });

       this.localData.getUserData('duollar_price').then(data => {
         this.price = {
           sell_price : data['sell_price'] ,
           buy_price: data ['buy_price']
         }
       })

       
      }
    });
  }

  async ngOnInit() {

  }



}
