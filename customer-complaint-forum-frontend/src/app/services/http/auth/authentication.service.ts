import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { StorageService } from '../../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
      private http: HttpClient,
      private storage: StorageService) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiBaseUrl}/user/authenticate`, { email, password })
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              this.storage.setItem('currentUser', user);
          }

          return user;
      }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }
}
