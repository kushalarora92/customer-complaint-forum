import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  authenticate(userCredentials) {
      return this.http.post(`${environment.apiBaseUrl}/user/authenticate`, userCredentials);
  }

  getById(id) {
      return this.http.get(`${environment.apiBaseUrl}/user/getById/` + id);
  }

  register(user) {
      return this.http.post(`${environment.apiBaseUrl}/user/register`, user);
  }
}
