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
  public balance;
  constructor(public core: CoreService, private localData: LocalDataService, private router: Router) {   
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd && this.router.url == '/tabs/tab1') { 
       this.localData.getUserData('amount').then(data=> this.balance = data);
      }
   });
  }

  async ngOnInit(){

  }

  async cashIn() {
    console.log('CashIn...');  
  }

  async cashOut() {
    console.log('CashOut...');  
  }
  
}
