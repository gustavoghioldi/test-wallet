import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalDataService } from './local-data.service';

@Injectable({
  providedIn: 'root'
})

export class CoreService {
  private url = 'http://zippy-hold-291419.uc.r.appspot.com/api/';

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
    return await this.http.get(this.url + 'accounts/', httpOptions).toPromise();
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
      "transferAmount": amount,
      "type": "DUOS"
    }
    return await this.http.post(this.url + 'transfer/', data, httpOptions).toPromise();
  }

  async convert(from: string, to: string, amount: number) {
    let auth = await this.localData.getJwt()
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: "Bearer " + auth
      })
    };
    let data = {
      "from": from,
      "to": to,
      "amount": amount
    }
    return await this.http.post(`${this.url}convert/`, data, httpOptions).toPromise();
  }

  async getTransactions() {
    let auth = await this.localData.getJwt()
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: "Bearer " + auth
      })
    };
    return await this.http.get(this.url + 'transfers/', httpOptions).toPromise();
  }

  async getUserData() {
    let auth = await this.localData.getJwt()
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: "Bearer " + auth
      })
    };
    return await this.http.get(this.url + 'user/', httpOptions).toPromise();
  }
  async signin(username: string, first_name: string, last_name: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let data = {
      "username": username,
      "first_name": first_name,
      "last_name": last_name,
      "password": password
    }
    return await this.http.post(this.url + 'signin/', data, httpOptions).toPromise();
  }
  async chashOut() { }

  async chashIn() { }


}
