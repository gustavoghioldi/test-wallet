import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalDataService } from './local-data.service';

@Injectable({
  providedIn: 'root'
})

export class CoreService {
  private url = 'https://zippy-hold-291419.uc.r.appspot.com//api/';

  constructor(public http: HttpClient, private localData: LocalDataService) { }

  async createJwt(username: string, password: string) {
    let payload = {
      "username": username,
      "password": password
    }
    console.log(payload)
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

  async transfer(username: string, amount: number, message: string, otp: string) {
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
      "type": "DUOS",
      "message": message,
      "otp": otp
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

  async sep0009(
    country: string,
    state: string,
    city: string,
    street: string,
    cp: string,
    id_type: string,
    id: string,
    cel_phone: string,
    cbu: string,
    date_of_birth: string,
    gender: string
  ) {
    let auth = await this.localData.getJwt()
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: "Bearer " + auth
      })
    };
    let data = {
      "country": "AR",
      "state": state,
      "city": city,
      "street": street,
      "cp": cp,
      "id_type": id_type,
      "id": id,
      "cel_phone": cel_phone,
      "cbu":cbu,
      "date_of_birth": date_of_birth.split("T")[0],
      "gender": gender
    }
    return await this.http.patch(this.url + 'user/', data, httpOptions).toPromise();
  }

  async sep0009Documents(
    photo_id_front: string,
    photo_id_back: string,
    photo_proof_residence: string) {
    let auth = await this.localData.getJwt()
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: "Bearer " + auth
      })
    };
    let data = {
      "photo_id_front": photo_id_front,
      "photo_id_back": photo_id_back,
      "photo_proof_residence": photo_proof_residence
    }
    return await this.http.put(this.url + 'user/', data, httpOptions).toPromise();
  }

  async createOTP(type: string) {
    let auth = await this.localData.getJwt()
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: "Bearer " + auth
      })
    };
    const data = {
      "transaction_type": type
    }

    return await this.http.post(this.url + 'otp/', data, httpOptions).toPromise();
  }

  async chashOut(amount) {

  }

  async chashIn() { }
  async parseJwt () {
    const auth = await this.localData.getJwt()
    try {
      return JSON.parse(atob(auth.split('.')[1]));
    } catch (e) {
      return null;
    }
};

}
