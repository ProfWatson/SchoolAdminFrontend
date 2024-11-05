import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../models/login-response.model';
import { RoleService } from './role.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);

  constructor(private roleService: RoleService, private tokenService: TokenService) {}

  isAuthenticated(): Observable<boolean> {
    return this.tokenService.hasValidToken();
  }

  login(credentials: { username: string, password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/login', credentials).pipe(
      tap(response => {
        this.tokenService.setToken(response.token); // Assuming the token is in the response
        this.roleService.setRole(response.token); // Set roles from the decoded token
      })
    );
  }

  logout() {
    this.roleService.clearRole();
    this.tokenService.clearToken();
  }

  //TODO 
  register(arg0: { username: string; password: string; }): Observable<any> {
    throw new Error('Method not implemented.');
  }
}