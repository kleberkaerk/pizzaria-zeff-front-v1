// import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { map, Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { Address } from '../domain/address';
// import { AddressDTO } from '../dto/address-dto';
// import { fromAddressDTOToAddress } from '../util/mapper';
// import { UserSessionService } from './user-session.service';

@Injectable({
  providedIn: 'root'
})
export class AddressRequisitionService {

  // private readonly urlBase = environment.urlBase;
  // private headers!: HttpHeaders;

  // constructor(
  //   private httpClient: HttpClient,
  //   private userSessionService: UserSessionService
  // ) { }

  // public findUserAddress(): Observable<Array<Address>> {

  //   this.headers = new HttpHeaders({
  //     "Authorization": "Basic " + this.userSessionService.getUserSession()
  //   });

  //   return this.httpClient.get<Array<AddressDTO>>(this.urlBase + "addresses/find-by-user", { headers: this.headers })
  //     .pipe(map(addressesDTO => {

  //       return addressesDTO.map(address => fromAddressDTOToAddress(address));
  //     }))
  // }

  // private getCSRFToken(cookie: string): string {

  //   return cookie.split("XSRF-TOKEN=")[1].split(";")[0];
  // }

  // public deleteAddress(addressId: number): Observable<HttpResponse<void>> {

  //   const csrfToken = this.getCSRFToken(document.cookie);

  //   this.headers = new HttpHeaders({
  //     "Authorization": "Basic " + this.userSessionService.getUserSession(),
  //     "X-XSRF-TOKEN": csrfToken
  //   });

  //   document.cookie = "XSRF-TOKEN=" + csrfToken;

  //   return this.httpClient.delete<void>(this.urlBase + "addresses/" + addressId.toString(), { observe: "response", headers: this.headers, withCredentials: true });
  // }
}
