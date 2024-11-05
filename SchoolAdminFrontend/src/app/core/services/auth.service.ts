import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../../shared/models/login-response.model';
import { RoleService } from './role.service';
import { TokenService } from './token.service';
import { HttpService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private roleService: RoleService, private tokenService: TokenService, private httpService: HttpService) {}

  isAuthenticated(): Observable<boolean> {
    return this.tokenService.hasValidToken();
  }

  login(credentials: { username: string, password: string }): Observable<LoginResponse> {
    return this.httpService.post<LoginResponse>('Auth/login', credentials).pipe(
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