import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginStatus: boolean = false

  constructor(private router: Router,
    private http: HttpClient
  ) { }

  checkLogin(login: string, password: string): void {
    this.http.get<any>(`http://localhost:4200/api/users.json`).subscribe(users => {
      users.map((user: any) => {
        if (user.name == login && user.password == password) {
          this.loginStatus = true
        }
      })
      if (this.loginStatus == false || login == '' || password == '') this.router.navigate(['/registration']);
    })
  }
}
