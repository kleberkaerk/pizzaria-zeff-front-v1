import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from '../domain/product';
import { ProductDTO } from '../dto/product-dto';
import { fromProductDTOToProduct } from '../util/mapper';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  public productsSubject = new Subject<Array<Product>>();

  private getProductsInSession(): Array<Product> {

    let productsJson = sessionStorage.getItem("products") as string;

    let productsDTO = JSON.parse(productsJson) as Array<ProductDTO>;

    return productsDTO.map(productDTO => fromProductDTOToProduct(productDTO));
  }

  public checkProductsInSession(): Array<Product> {

    if (sessionStorage.getItem("products")) {

      return this.getProductsInSession();
    } else {

      return new Array();
    }
  }

  private setProducts(products: Array<Product>) {

    sessionStorage.setItem("products", JSON.stringify(products));

    this.productsSubject.next(products);
  }

  public addProduct(product: Product) {

    let products;

    if (!sessionStorage.getItem("products")) {

      products = new Array<Product>();
    } else {

      products = this.getProductsInSession();
    }

    products.push(product);

    this.setProducts(products);
  }

  public removeProduct(index: number): void {

    let products = this.getProductsInSession();

    products.splice(index, 1);

    this.setProducts(products);
  }
}
