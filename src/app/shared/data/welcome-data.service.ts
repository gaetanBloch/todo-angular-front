import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HardcodedAuthService } from '../auth/hardcoded-auth.service';

@Injectable({providedIn: 'root'})
export class WelcomeDataService {

  constructor(private http: HttpClient) {
  }

  getHelloWorldWithParam(param: string): Observable<{ message: string }> {
    const headers = HardcodedAuthService.createBasicAuthenticationHttpHeader();
    return this.http.get<{ message: string }>(`/api/hello-world/${param}`, {headers}
    );
  }
}
