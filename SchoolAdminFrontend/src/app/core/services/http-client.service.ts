import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConfigService } from "./app-config.service";


@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private readonly apiUrl: string = ''; 
    private readonly http = inject(HttpClient);

    constructor(private appConfig: AppConfigService) {
      this.apiUrl = this.appConfig.apiUrl;
    }

    // Generic GET request
    get<T>(endpoint: string): Observable<T> {
      return this.http.get<T>(`${this.apiUrl}/${endpoint}`);
    }

    // Generic POST request
    post<T>(endpoint: string, data: any): Observable<T> {
      return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data);
    }

    // Generic PUT request
    put<T>(endpoint: string, data: any): Observable<T> {
      return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data);
    }

    // Generic DELETE request
    delete<T>(endpoint: string): Observable<T> {
      return this.http.delete<T>(`${this.apiUrl}/${endpoint}`);
    }
}