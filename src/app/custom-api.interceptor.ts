import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IpService } from './ip.service';
import { stringify } from 'querystring';

@Injectable()
export class CustomApiInterceptor implements HttpInterceptor {

  accessToken: string | undefined
  addressToken: string | undefined
  constructor(
    private router: Router, 
    private authService: AuthService, 
    public afAuth: AngularFireAuth,
    private ipService: IpService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url == this.ipService.apiAdress) {
      return next.handle(request)
    }
    this.accessToken = this.authService.getCredentials()

    if (this.accessToken == undefined) this.accessToken = 'guest'

    const cloneRequest = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + this.accessToken)
    });
    
    console.log(cloneRequest)

    return next.handle(cloneRequest).pipe(
      // tap((resp) => {
      //   console.log(resp);
      // }),
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.router.navigate(['/registration']);
        }
        console.log(error);
        return throwError(error);
      })
    );;
  }
}
