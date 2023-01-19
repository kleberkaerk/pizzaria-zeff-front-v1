import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { ProductService } from './product.service';
import { ProductsMapByTypeDTO } from 'src/app/shared/dto/product-by-type-map-dto';
import { ProductDTO } from 'src/app/shared/dto/product-dto';
import { Type } from 'src/app/shared/domain/type';
import { PriceRating } from 'src/app/shared/domain/price-rating';

describe('ProductServiceService', () => {

  let service: ProductService;
  let httpTestingController: HttpTestingController;

  let saltyPizzas: Array<ProductDTO>;
  let sweetPizzas: Array<ProductDTO>;
  let productsMapByTypeDTOFindProductsInPromotion: ProductsMapByTypeDTO;

  function setSaltyPizzas() {

    saltyPizzas = [new ProductDTO(1, "name1", "description1", 10.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "image1", true), new ProductDTO(3, "name3", "description3", 30.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "image3", true), new ProductDTO(4, "name4", "description4", 40.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "image4", true)];
  }

  function setSweetPizzas() {

    sweetPizzas = [new ProductDTO(2, "name2", "description2", 20.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "image2", true), new ProductDTO(5, "name5", "description5", 50.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "image5", true)];
  }
  function setProductsMapByTypeDTOFindProductsInPromotion() {

    productsMapByTypeDTOFindProductsInPromotion = new ProductsMapByTypeDTO(saltyPizzas, sweetPizzas, [], [], []);
  }

  beforeEach(() => {

    setSaltyPizzas();
    setSweetPizzas();
    setProductsMapByTypeDTOFindProductsInPromotion();
  });

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {

    httpTestingController.verify();
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

  it("findProductsInPromotion_makesARequestToTheWebServiceAndReturnsAnObjectOfTypeProductsMapByTypeDTOWithAllProductsOnPromotion_wheneverCalled", (done) => {

    service.findProductsInPromotion().subscribe(productsMap => {

      expect(productsMap.SALTY_PIZZA.length)
        .not.toBeNull();

      expect(productsMap.SALTY_PIZZA)
        .toEqual(saltyPizzas);

      expect(productsMap.SALTY_PIZZA.length)
        .toEqual(saltyPizzas.length);

      done();
    });

    const testRequest = httpTestingController.expectOne("http://localhost:8080/products/find-promotions");

    testRequest.flush(productsMapByTypeDTOFindProductsInPromotion);
  });
});


