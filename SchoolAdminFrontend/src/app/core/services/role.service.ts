import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private userRole = new BehaviorSubject<string | null>(null);
  private jwtHelper = new JwtHelperService();

  constructor() { }

  setRole(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    const roles = decodedToken.roles || []; // Extract roles from the decoded token
    this.userRole.next(roles); // Set the roles in the BehaviorSubject
    localStorage.setItem('roles', JSON.stringify(roles)); // Store roles in localStorage
  }

  getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : []; // Parse the JSON string or return an empty array if not found
  }

  hasRole(expectedRole: string): boolean {
    const roles: string[] = JSON.parse(localStorage.getItem('roles') || '[]'); // Get roles from localStorage
    return roles.includes(expectedRole); // Check if the expected role is in the array of roles
  }

  clearRole() {
    localStorage.removeItem('roles'); // Remove the roles from localStorage
  }
}
