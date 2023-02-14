import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddressDTO } from '../dto/address-dto';
import { UserSessionService } from './user-session.service';

@Injectable({
  providedIn: 'root'
})
export class AddressRequisitionService {

  private readonly urlBase = environment.urlBase;
  private headers!: HttpHeaders;

  constructor(
    private httpClient: HttpClient,
    private userSessionService: UserSessionService
  ) { }

  public findUserAddress() {

    this.headers = new HttpHeaders({
      "Authorization": "Basic " + this.userSessionService.getUserSession()
    });

    this.httpClient.get<Array<AddressDTO>>(this.urlBase + "addresses/find-by-user")
    
  }
}
