import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashinPageRoutingModule } from './cashin-routing.module';

import { CashinPage } from './cashin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashinPageRoutingModule
  ],
  declarations: [CashinPage]
})
export class CashinPageModule {}
