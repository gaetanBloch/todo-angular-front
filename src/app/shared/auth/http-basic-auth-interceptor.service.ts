import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtAuthService } from './jwt-auth.service';

@Injectable({providedIn: 'root'})
export class HttpBasicAuthInterceptorService implements HttpInterceptor {

  constructor(private authService: JwtAuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.authService.getUser();
    if (user) {
      const newRequest = req.clone({setHeaders: {Authorization: user.authenticationToken}});
      return next.handle(newRequest);
    }
    return next.handle(req);
  }
}
