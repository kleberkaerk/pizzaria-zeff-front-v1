import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressRequisitionService {

  private readonly urlBase = environment.urlBase;

  constructor(
    private httpClient: HttpClient
  ) { }

  public findUserAddress() {

    this.httpClient.get(this.urlBase + "addresses/find-by-user")
  }
}
