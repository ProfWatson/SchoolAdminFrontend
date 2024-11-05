import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: any;
  private http = inject(HttpClient);

  constructor() {}

  loadConfig() {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then(config => this.config = config);
  }

  get apiUrl(): string {
    return this.config?.apiUrl;
  }
}