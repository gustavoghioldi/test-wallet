import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalDataService } from './local-data.service';
import { core } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class CoreService {
  private url = 'http://127.0.0.1:8000/api/';

  constructor(public http: HttpClient, private localData: LocalDataService) { }

  async createJwt(username: string, password: string) {
    let payload = {
      "username": username,
      "password": password
    }
    return await this.http.post(this.url + "users/jwt", payload).toPromise();
  }

  async getAmount() {
    let auth = await this.localData.getJwt()
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: "Bearer " + auth
      })
    };
    return await this.http.get(this.url + 'amount', httpOptions).toPromise();
  }

  async getPrice() {
    let auth = await this.localData.getJwt()
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: "Bearer " + auth
      })
    };
    return await this.http.get(this.url + 'price', httpOptions).toPromise();
  }



  async transfer(username: string, amount: number) {
    let auth = await this.localData.getJwt()
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: "Bearer " + auth
      })
    };
    let data = {
      "toUsername": username,
      "transferAmount": amount
    }
    return await this.http.post(this.url + 'transfer/?type=G2G', data, httpOptions).toPromise();
  }

  async chashOut() { }

  async chashIn() { }


}
