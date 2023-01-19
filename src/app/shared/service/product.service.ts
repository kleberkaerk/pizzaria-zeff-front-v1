import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs'

import { Page } from '../util/page';
import { ProductDTO } from '../dto/product-dto';
import { Product } from '../domain/product';
import { fromProductDTOToProduct } from '../util/mapper';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly urlBase = environment.urlBase;

  constructor(private httpClient: HttpClient) { }

  private mapperFromProductsDTOToProducts(productsDTO: Array<ProductDTO>): Array<Product> {

    return productsDTO.map(productDTO => fromProductDTOToProduct(productDTO));
  }

  public searchProducts(productName: string, quantity: number, pageNumber: number): Observable<Page<Array<Product>>> {

    return this.httpClient.get<Page<Array<ProductDTO>>>(this.urlBase + "products/search?name=" + productName + "&size=" + quantity.toString() + "&page=" + pageNumber.toString())
      .pipe(map(productsDTOPage => {

        return {
          ...productsDTOPage,
          content: this.mapperFromProductsDTOToProducts(productsDTOPage.content)
        };
      }));
  }
}
