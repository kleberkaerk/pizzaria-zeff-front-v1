import { TestBed } from '@angular/core/testing';
import { PriceRating } from '../domain/price-rating';
import { Product } from '../domain/product';
import { Type } from '../domain/type';

import { ShoppingCartService } from './shopping-cart.service';

describe('ShoppingCartService', () => {

  let service: ShoppingCartService;

  let products: Array<Product>;
  let product: Product;
  let productsToComparisonInAddProduct: Array<Product>;

  function setProducts() {

    products = [
      new Product(1, "name1", "description1", 1.99, Type.DRINK, PriceRating.PROMOTION, "drink.jpg", true),
      new Product(2, "name2", "description2", 2.99, Type.DRINK, PriceRating.PROMOTION, "drink.jpg", true),
      new Product(3, "name3", "description3", 3.99, Type.DRINK, PriceRating.PROMOTION, "drink.jpg", true)
    ];
  }

  function setProduct() {

    product = new Product(1, "name1", "description1", 1.00, Type.SALTY_PIZZA, PriceRating.REGULAR_PRICE, "salty-pizza.jpg", true);
  }

  function setProductsToComparisonInAddProduct() {

    productsToComparisonInAddProduct = [product];
  }

  beforeEach(() => {

    setProducts();
    setProduct();
    setProductsToComparisonInAddProduct();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartService);
  });

  afterEach(() => {

    sessionStorage.removeItem("products");
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("checkProductsInSession_returnsProductsSavedInSessionStorage_whenThereAreProductsSavedInSessionStorage", () => {

    sessionStorage.setItem("products", JSON.stringify(products));

    expect(service.checkProductsInSession())
      .toEqual(products);
  });

  it("checkProductsInSession_returnsAnEmptyArray_whenThereAreNoProductsSavedInSessionStorage", () => {

    expect(service.checkProductsInSession())
      .toEqual(new Array());
  });

  it("addProduct_createsAnArrayWithAProductAndSavesItInASessionStorage_whenThereAreNoProductsSavedInSessionStorage", () => {

    service.productsSubject.subscribe(products => {

      expect(products)
        .toEqual(productsToComparisonInAddProduct);
    });

    service.addProduct(product);
  });

  it("addProduct_addsOneMoreElementToTheArrayOfProductsStoredInSessionStorage_whenThereAreProductsSavedInSessionStorage", () => {

    sessionStorage.setItem("products", JSON.stringify(products));

    let sessionProducts = products;

    sessionProducts.push(product);

    service.productsSubject.subscribe(products => {

      expect(products)
        .toEqual(sessionProducts);
    });

    service.addProduct(product);
  });

  it("removeProduct_removesAProductFromTheArrayOfProductsStoredInSessionStorage_wheneverCalled", () => {

    sessionStorage.setItem("products", JSON.stringify(products));

    let newProducts = products;

    newProducts.splice(0, 1);

    service.productsSubject.subscribe(products => {

      expect(products)
        .toEqual(newProducts);
    });

    service.removeProduct(0);
  });
});
