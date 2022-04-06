import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(private http: HttpClient) {}

  apiAdress: string = "https://geolocation-db.com/json/"
  result: string = ''

  async getIPAddress()  {
    this.result = await this.http.get<any>('https://geolocation-db.com/json/').toPromise()
    console.log(this.result)
    return this.result
  }  

  getHostName() {
    console.log(`Host:\n${window.location.hostname}`)
  }
}
