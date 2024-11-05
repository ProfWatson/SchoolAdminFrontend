import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private jwtHelper = new JwtHelperService();

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem('authToken'); // Retrieve the JWT token from local storage or any other storage solution
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token); // Store the JWT token in local storage
  }

  clearToken(): void {
    localStorage.removeItem('authToken'); // Clear the JWT token on logout
  }

  hasValidToken(): Observable<boolean> {
    const token = localStorage.getItem('authToken');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return of(true);
    }
    return of(false);
  }
}
