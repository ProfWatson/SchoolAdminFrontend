import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register-form',
  imports: [FormsModule, NgClass],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  standalone: true,
})
export class RegisterFormComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = '';
  isIconHovered: boolean = false; // Variable to control icon hover state

  @Output() toggle = new EventEmitter<void>(); // Emit toggle event

  constructor(private authService: AuthService) {}
  
  register() {
    this.authService.register({ username: this.username, password: this.password}).subscribe(
      () => {
        this.switchToLogin();
      },
      error => {
        // Handle login error
        console.error('Login failed', error);
      }
    );
  }

  switchToLogin() {
    this.toggle.emit(); // Emit toggle to switch to the login view
  }
}
