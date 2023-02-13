import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../domain/user';

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

  public signIn(username: string, password: string): Observable<HttpResponse<void>> {

    this.headers = new HttpHeaders({
      "Authorization": "Basic " + this.encodeCredentials(username, password)
    });

    return this.httpClient.get<void>(this.urlBase + "users/auth", { observe: "response", headers: this.headers });
  }

  private getCSRFToken(cookie: string): string {

    console.log(cookie);

    return cookie.split("XSRF-TOKEN=")[1].split(";")[0];
  }

  public signUp(user: User): Observable<HttpResponse<number | void>> {

    const csrfToken = this.getCSRFToken(document.cookie);

    this.headers = new HttpHeaders({
      "Accept-Language": "pt-BR",
      "X-XSRF-TOKEN": csrfToken,
    });

    return this.httpClient.put<number | void>(this.urlBase + "users/register", user, { observe: "response", headers: this.headers, withCredentials: true });
  }
}
