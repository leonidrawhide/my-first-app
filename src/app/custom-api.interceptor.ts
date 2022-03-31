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

@Injectable()
export class CustomApiInterceptor implements HttpInterceptor {

  accessToken: string | undefined

  constructor(
    private router: Router, 
    private authService: AuthService, 
    public afAuth: AngularFireAuth) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(this.afAuth.currentUser.getIdToken(true))
    this.accessToken = this.authService.getCredentials()
    // console.log('rly??')
    // console.log(this.accessToken)
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
