import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class HttpBasicAuthInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const username = 'gbloch';
    const password = 'dummy';
    const basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    const newRequest = req.clone({setHeaders: {Authorization: basicAuthHeaderString}});
    return next.handle(newRequest);
  }
}
