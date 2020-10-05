import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.page.html',
  styleUrls: ['./convert.page.scss'],
})
export class ConvertPage implements OnInit {
  public convertion: string;
  public convertAmount: number = 0;
  constructor(private core: CoreService, private modalCtrl: ModalController ) { }
  async selectConvert(arg){
    this.convertion = arg
  }
  async convert() {
    const from =  this.convertion.substring(0, 4);
    const to =  this.convertion.substring(5, 9);
    this.core.convert(from, to, this.convertAmount).then(data=>console.log(data))
    this.dismiss()
  }
  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
