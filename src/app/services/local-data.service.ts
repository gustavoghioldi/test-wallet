import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  constructor(private storage: Storage) {}

  public getUserData(property: string) {
    return this.storage.get(property);
  }

  public setUserData(property: string, value:string) {
    return this.storage.set(property, value);
  }

  public setJwt(jwt: string) {
    console.log(jwt)
    this.storage.set('jwt', jwt)
  }

  public getJwt() {
    return this.storage.get('jwt');
  }
  
}
