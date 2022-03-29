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

@Injectable()
export class CustomApiInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloneRequest = request.clone({
      headers: request.headers.set('X-Header', 'Bababooey')
    });
    
    console.log(cloneRequest)

    return next.handle(cloneRequest).pipe(
      tap((resp) => {
        console.log(resp);
      }),
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
