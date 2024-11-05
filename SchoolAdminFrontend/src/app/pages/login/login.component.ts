import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  showRegister = false;

  toggleView() {
    this.showRegister = !this.showRegister;
  }
}
