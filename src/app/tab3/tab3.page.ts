import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CoreService } from '../services/core.service';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public transactionsDuos;
  public transactionsArgs;
  public accountType: string = "ARGS"
  constructor(public core: CoreService,private localData: LocalDataService,  private router: Router) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd && this.router.url == '/tabs/tab3') { 
        core.getTransactions().then((data)=>{
          console.log(data);
          data["payload"].filter(data => {
            if (data["product_code"] == "DUOS") {
              this.transactionsDuos = data['transactions']
            } 
            if (data["product_code"] == "ARGS") {
              this.transactionsArgs = data['transactions']
            } 
              
          })
          
        }).catch(err=>console.log(err))
      }
   });
    
  }

  async ngOnInit(){
    
  }

}
