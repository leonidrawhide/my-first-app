import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloneRequest = request.clone({
      headers: request.headers.set('X-Header', 'bababooey ' + request.url)
    });
    
    console.log(cloneRequest.headers)

    return next.handle(cloneRequest);
  }
}