import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs'

import { ProductsMapByTypeDTO } from '../dto/product-by-type-map-dto';
import { Type } from '../domain/type';
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

  private mapperFromProductsMapByTypeDTOToProductsMapByType(productsMapByTypeDTO: ProductsMapByTypeDTO): Map<Type, Array<Product>> {

    const productsMap = new Map<Type, Array<Product>>();

    productsMap.set(Type.SALTY_PIZZA, productsMapByTypeDTO.SALTY_PIZZA.map(saltyPizza => fromProductDTOToProduct(saltyPizza)))
    productsMap.set(Type.SWEET_PIZZA, productsMapByTypeDTO.SWEET_PIZZA.map(sweetPizza => fromProductDTOToProduct(sweetPizza)))
    productsMap.set(Type.SALTY_ESFIHA, productsMapByTypeDTO.SALTY_ESFIHA.map(saltyEsfiha => fromProductDTOToProduct(saltyEsfiha)))
    productsMap.set(Type.SWEET_ESFIHA, productsMapByTypeDTO.SWEET_ESFIHA.map(sweetEsfiha => fromProductDTOToProduct(sweetEsfiha)))
    productsMap.set(Type.DRINK, productsMapByTypeDTO.DRINK.map(drink => fromProductDTOToProduct(drink)))

    return productsMap;
  }

  public findProductsInPromotion(): Observable<Map<Type, Array<Product>>> {

    return this.httpClient.get<ProductsMapByTypeDTO>(this.urlBase + "products/find-promotions")
      .pipe(map(productMapByTypeDTO => this.mapperFromProductsMapByTypeDTOToProductsMapByType(productMapByTypeDTO)))
  }

  private mapperFromProductsDTOToProducts(productsDTO: Array<ProductDTO>): Array<Product> {

    return productsDTO.map(productDTO => fromProductDTOToProduct(productDTO));
  }

  private mapperFromProductsDTOPageToProductsPage(productsDTOPage: Page<Array<ProductDTO>>): Page<Array<Product>> {

    return {
      ...productsDTOPage,
      content: this.mapperFromProductsDTOToProducts(productsDTOPage.content)
    };
  }

  public searchProducts(productName: string, quantity: number, pageNumber: number): Observable<Page<Array<Product>>> {

    return this.httpClient.get<Page<Array<ProductDTO>>>(this.urlBase + "products/search?name=" + productName + "&size=" + quantity.toString() + "&page=" + pageNumber.toString())
      .pipe(map(productsDTOPage => {

        return this.mapperFromProductsDTOPageToProductsPage(productsDTOPage);
      }));
  }

  public findMenuProducts(productType: string, pageNumber: number): Observable<Page<Array<Product>>> {

    return this.httpClient.get<Page<Array<ProductDTO>>>(this.urlBase + "products/find-by-type?type=" + productType + "&page=" + pageNumber.toString())
      .pipe(map(productsDTOPage => {

        return this.mapperFromProductsDTOPageToProductsPage(productsDTOPage);
      }));
  }
}
