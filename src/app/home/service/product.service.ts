import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ProductsMapByTypeDTO } from 'src/app/shared/dto/product-by-type-map-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urlBase = environment.urlBase;

  constructor(private httpClient: HttpClient) { }

  findProductsInPromotion(): Observable<ProductsMapByTypeDTO> {

    return this.httpClient.get<ProductsMapByTypeDTO>(this.urlBase + "products/find-promotions");
  }
}
