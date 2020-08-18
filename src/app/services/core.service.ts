import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalDataService } from './local-data.service';

@Injectable({
  providedIn: 'root'
})

export class CoreService {
  private url = 'http://127.0.0.1:8000/api/';

  constructor(public http:HttpClient, private localData: LocalDataService) {}

  async createJwt(username: string, password:string) {
    let payload = {
      "username": username,
      "password":password
    }
    return await this.http.post(this.url+"users/jwt", payload).toPromise();
  }
  
  async getAmount() {
    let auth = await this.localData.getJwt()
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: "Bearer "+auth
      })
    };
    return await this.http.get(this.url+'amount', httpOptions).toPromise();
  }
  
  async transfer(kindOf) {}

  async chashOut() {}

  async chashIn() {}


}
