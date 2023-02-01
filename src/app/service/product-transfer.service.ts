import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class ProductTransferService {

  private behaviorSubjectProduct = new BehaviorSubject<Product | undefined>(undefined);

  constructor() { }

}
