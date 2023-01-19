import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ProductsMapByTypeDTO } from 'src/app/shared/dto/product-by-type-map-dto';
import { Type } from '../../shared/domain/type'
import { Product } from '../../shared/domain/product'
import { fromProductDTOToProduct } from 'src/app/shared/util/mapper';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly urlBase = environment.urlBase;

  constructor(private httpClient: HttpClient) { }

  mapperFromProductsMapByTypeDTOToProductsMapByType(productsMapByTypeDTO: ProductsMapByTypeDTO): Map<Type, Array<Product>> {

    const productsMap = new Map<Type, Array<Product>>();

    productsMap.set(Type.SALTY_PIZZA, productsMapByTypeDTO.SALTY_PIZZA.map(saltyPizza => fromProductDTOToProduct(saltyPizza)))
    productsMap.set(Type.SWEET_PIZZA, productsMapByTypeDTO.SWEET_PIZZA.map(sweetPizza => fromProductDTOToProduct(sweetPizza)))
    productsMap.set(Type.SALTY_ESFIHA, productsMapByTypeDTO.SALTY_ESFIHA.map(saltyEsfiha => fromProductDTOToProduct(saltyEsfiha)))
    productsMap.set(Type.SWEET_ESFIHA, productsMapByTypeDTO.SWEET_ESFIHA.map(sweetEsfiha => fromProductDTOToProduct(sweetEsfiha)))
    productsMap.set(Type.DRINK, productsMapByTypeDTO.DRINK.map(drink => fromProductDTOToProduct(drink)))

    return productsMap;
  }

  findProductsInPromotion(): Observable<Map<Type, Array<Product>>> {

    return this.httpClient.get<ProductsMapByTypeDTO>(this.urlBase + "products/find-promotions")
      .pipe(map(productMapByTypeDTO => this.mapperFromProductsMapByTypeDTOToProductsMapByType(productMapByTypeDTO)))
  }
}
