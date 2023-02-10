import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly urlBase = environment.urlBase;

  constructor(private httpClient: HttpClient) { }

  signIn(username: string, password: string) {
    
    // this.
  }
}
