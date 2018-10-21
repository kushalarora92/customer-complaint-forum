import { Component } from '@angular/core';
import { AuthenticationService } from './services/http/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  onLogoutClick() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ifLoginPage() {
    return this.router.url.indexOf('/login') > -1;
  }
}
