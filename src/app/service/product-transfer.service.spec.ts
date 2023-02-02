import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { ProductTransferService } from './product-transfer.service';
import { Product } from '../domain/product';
import { Type } from '../domain/type';
import { PriceRating } from '../domain/price-rating';

describe('ProductTransferService', () => {

  let service: ProductTransferService;

  let productSetProduct: Product;
  let productGetProduct: Product;

  function setProductSetProduct() {

    productSetProduct = new Product(1, "name1", "description1", 1.00, Type.DRINK, PriceRating.REGULAR_PRICE, "drink.jpg", true);
  }

  function setProductGetProduct() {

    productGetProduct = new Product(1, "name2", "description2", 2.00, Type.SWEET_PIZZA, PriceRating.REGULAR_PRICE, "sweet-pizza.jpg", true);
  }

  beforeEach(() => {

    setProductSetProduct();
    setProductGetProduct();
  })

  beforeEach(() => {

    TestBed.configureTestingModule({});

    service = TestBed.inject(ProductTransferService);
  });

  it('should be created', () => {

    expect(service)
      .toBeTruthy();
  });

  it("setProduct_callsTheNextMethodOfTheBehaviorSubjectPropertyAndPassesTheProductParameterAsAnArgumentOfTheMethod_wheneverCalled", (done) => {

    service.setProduct(productSetProduct);

    service.getProduct().subscribe(product => {

      expect(product)
        .toEqual(productSetProduct);

      done();
    });
  });

  it("getProduct_returnsTheProductObservableOfTheBehaviorSubjectProperty_wheneverCalled", (done) => {

    service.getProduct().subscribe(product => {

      expect(product)
        .toEqual(undefined);

      done();
    });
  });
});
