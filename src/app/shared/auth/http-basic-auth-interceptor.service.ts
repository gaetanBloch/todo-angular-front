import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BasicAuthService } from './basic-auth.service';
import { User } from '../model/user.model';

@Injectable({providedIn: 'root'})
export class HttpBasicAuthInterceptorService implements HttpInterceptor {

  constructor(private authService: BasicAuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user = this.authService.getUser();
    if (!user) {
      user = new User('gbloch', 'dummy');
    }
    const basicAuthHeaderString = 'Basic ' + window.btoa(user.username + ':' + user.password);
    const newRequest = req.clone({setHeaders: {Authorization: basicAuthHeaderString}});
    return next.handle(newRequest);
  }
}
