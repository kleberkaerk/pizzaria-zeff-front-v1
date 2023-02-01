import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class ProductTransferService {

  private behaviorSubjectProduct = new BehaviorSubject<Product | undefined>(undefined);

  public setProduct(product: Product) {

    this.behaviorSubjectProduct.next(product);
  }

  public getProduct(): Observable<Product | undefined> {

    return this.behaviorSubjectProduct.asObservable();
  }
}
