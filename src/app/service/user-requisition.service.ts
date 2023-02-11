import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRequisitionService {

  private readonly urlBase = environment.urlBase;

  private headers!: HttpHeaders;

  constructor(private httpClient: HttpClient) { }

  private encodeCredentials(username: string, password: string): string {

    return window.btoa(username + ":" + password);
  }

  signIn(username: string, password: string) {

    this.headers = new HttpHeaders({
      "Authorization": "Basic " + this.encodeCredentials(username, password)
    });

    return this.httpClient.get<void>(this.urlBase + "users/auth", { observe: "response", headers: this.headers });
  }
}
