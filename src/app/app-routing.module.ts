import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  
  },
  {
    path: 'pays',
    loadChildren: () => import('./modals/pays/pays.module').then( m => m.PaysPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modals/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'convert',
    loadChildren: () => import('./modals/convert/convert.module').then( m => m.ConvertPageModule)
  },
  {
    path: 'cashin',
    loadChildren: () => import('./modals/cashin/cashin.module').then( m => m.CashinPageModule)
  },
  {
    path: 'cashout',
    loadChildren: () => import('./modals/cashout/cashout.module').then( m => m.CashoutPageModule)
  },
  {
    path: 'userdata',
    loadChildren: () => import('./modals/userdata/userdata.module').then( m => m.UserdataPageModule)
  },
  {
    path: 'documents',
    loadChildren: () => import('./modals/documents/documents.module').then( m => m.DocumentsPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
