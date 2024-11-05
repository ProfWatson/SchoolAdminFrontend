import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  userName: string = '';

  constructor(private router: Router, private authService: AuthService) {
    // Assuming you store the username in local storage or retrieve it from a service
    this.userName = localStorage.getItem('username') || 'Guest'; // Replace 'username' with the actual key if different
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    // Clear session or user data
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
