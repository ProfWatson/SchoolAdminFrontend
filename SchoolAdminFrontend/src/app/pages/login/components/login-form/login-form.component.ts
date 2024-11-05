import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, NgClass],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  standalone: true,
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';
  lockIconHovered: boolean = false; // Variable to control icon hover state
  
  @Output() toggle = new EventEmitter<void>(); // Emit toggle event

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const loginCredentials = {
      username: this.username,
      password: this.password
    }
    this.authService.login(loginCredentials).subscribe(
      response => {
        // Handle successful login
        this.router.navigate(['/landing']); // Redirect to landing page
      },
      error => {
        // Handle login error
        console.error('Login failed', error);
      }
    );
  }

  switchToRegister() {
    this.toggle.emit(); // Emit toggle to switch to the register view
  }
}
