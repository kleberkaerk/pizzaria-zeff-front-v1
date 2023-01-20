import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { ProductService } from './product.service';
import { ProductsMapByTypeDTO } from 'src/app/shared/dto/product-by-type-map-dto';
import { ProductDTO } from 'src/app/shared/dto/product-dto';
import { Type } from 'src/app/shared/domain/type';
import { PriceRating } from 'src/app/shared/domain/price-rating';
import { Product } from 'src/app/shared/domain/product';
import { fromProductDTOToProduct } from '../../shared/util/mapper'

describe('ProductServiceService', () => {

  let service: ProductService;
  let httpTestingController: HttpTestingController;

  let saltyPizzas: Array<ProductDTO>;
  let sweetPizzas: Array<ProductDTO>;
  let saltyEsfihas: Array<ProductDTO>;
  let sweetEsfihas: Array<ProductDTO>;
  let drinks: Array<ProductDTO>;
  let productsMapByTypeDTOFindProductsInPromotion: ProductsMapByTypeDTO;
  let productsMapByTypeToComparisonInFindProductsInPromotion: Map<Type, Array<Product>>;

  function setSaltyPizzas() {

    saltyPizzas = [new ProductDTO(1, "name1", "description1", 10.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "image1", true), new ProductDTO(3, "name3", "description3", 30.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "image3", true), new ProductDTO(4, "name4", "description4", 40.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "image4", true)];
  }

  function setSweetPizzas() {

    sweetPizzas = [new ProductDTO(2, "name2", "description2", 20.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "image2", true), new ProductDTO(5, "name5", "description5", 50.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "image5", true)];
  }

  function setSaltyEsfihas() {

    saltyEsfihas = [
      new ProductDTO(6, "name6", "description6", 6.00, Type.SALTY_ESFIHA, PriceRating.PROMOTION, "salty-esfiha.jpg", true)
    ];
  }

  function setSweetEsfihas() {

    sweetEsfihas = [
      new ProductDTO(8, "name8", "description8", 8.00, Type.SALTY_ESFIHA, PriceRating.PROMOTION, "salty-esfiha.jpg", true)
    ];
  }

  function setDrinks() {

    drinks = [
      new ProductDTO(7, "name7", "description7", 7.00, Type.SALTY_ESFIHA, PriceRating.PROMOTION, "salty-esfiha.jpg", true)
    ];
  }

  function setProductsMapByTypeDTOFindProductsInPromotion() {

    productsMapByTypeDTOFindProductsInPromotion = new ProductsMapByTypeDTO(saltyPizzas, sweetPizzas, saltyEsfihas, sweetEsfihas, drinks);
  }

  function setProductsMapByTypeToComparisonInFindProductsInPromotion() {

    productsMapByTypeToComparisonInFindProductsInPromotion = new Map();

    productsMapByTypeToComparisonInFindProductsInPromotion.set(Type.SALTY_PIZZA, productsMapByTypeDTOFindProductsInPromotion.SALTY_PIZZA.map(saltyPizza => fromProductDTOToProduct(saltyPizza)));

    productsMapByTypeToComparisonInFindProductsInPromotion.set(Type.SWEET_PIZZA, productsMapByTypeDTOFindProductsInPromotion.SWEET_PIZZA.map(sweetPizza => fromProductDTOToProduct(sweetPizza)));

    productsMapByTypeToComparisonInFindProductsInPromotion.set(Type.SALTY_ESFIHA, productsMapByTypeDTOFindProductsInPromotion.SALTY_ESFIHA.map(saltyEsfiha => fromProductDTOToProduct(saltyEsfiha)));

    productsMapByTypeToComparisonInFindProductsInPromotion.set(Type.SWEET_ESFIHA, productsMapByTypeDTOFindProductsInPromotion.SWEET_ESFIHA.map(sweetEsfiha => fromProductDTOToProduct(sweetEsfiha)));

    productsMapByTypeToComparisonInFindProductsInPromotion.set(Type.DRINK, productsMapByTypeDTOFindProductsInPromotion.DRINK.map(drink => fromProductDTOToProduct(drink)));
  }

  beforeEach(() => {

    setSaltyPizzas();
    setSweetPizzas();
    setSaltyEsfihas();
    setSweetEsfihas();
    setDrinks();
    setProductsMapByTypeDTOFindProductsInPromotion();
    setProductsMapByTypeToComparisonInFindProductsInPromotion();
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

      expect(productsMap.get(Type.SALTY_PIZZA))
        .not.toBeNull();
      expect(productsMap.get(Type.SWEET_PIZZA))
        .not.toBeNull();
      expect(productsMap.get(Type.SALTY_ESFIHA))
        .not.toBeNull();
      expect(productsMap.get(Type.SWEET_ESFIHA))
        .not.toBeNull();
      expect(productsMap.get(Type.DRINK))
        .not.toBeNull();

      expect(productsMap.get(Type.SALTY_PIZZA))
        .toEqual(productsMapByTypeToComparisonInFindProductsInPromotion.get(Type.SALTY_PIZZA));
      expect(productsMap.get(Type.SWEET_PIZZA))
        .toEqual(productsMapByTypeToComparisonInFindProductsInPromotion.get(Type.SWEET_PIZZA));
      expect(productsMap.get(Type.SALTY_ESFIHA))
        .toEqual(productsMapByTypeToComparisonInFindProductsInPromotion.get(Type.SALTY_ESFIHA));
      expect(productsMap.get(Type.SWEET_ESFIHA))
        .toEqual(productsMapByTypeToComparisonInFindProductsInPromotion.get(Type.SWEET_ESFIHA));
      expect(productsMap.get(Type.DRINK))
        .toEqual(productsMapByTypeToComparisonInFindProductsInPromotion.get(Type.DRINK));

      expect(productsMap.get(Type.SALTY_PIZZA)?.length)
        .toEqual(productsMapByTypeToComparisonInFindProductsInPromotion.get(Type.SALTY_PIZZA)?.length);
      expect(productsMap.get(Type.SWEET_PIZZA)?.length)
        .toEqual(productsMapByTypeToComparisonInFindProductsInPromotion.get(Type.SWEET_PIZZA)?.length);
      expect(productsMap.get(Type.SALTY_ESFIHA)?.length)
        .toEqual(productsMapByTypeToComparisonInFindProductsInPromotion.get(Type.SALTY_ESFIHA)?.length);
      expect(productsMap.get(Type.SWEET_ESFIHA)?.length)
        .toEqual(productsMapByTypeToComparisonInFindProductsInPromotion.get(Type.SWEET_ESFIHA)?.length);
      expect(productsMap.get(Type.DRINK)?.length)
        .toEqual(productsMapByTypeToComparisonInFindProductsInPromotion.get(Type.DRINK)?.length);

      done();
    });

    const testRequest = httpTestingController.expectOne("http://localhost:8080/products/find-promotions");

    testRequest.flush(productsMapByTypeDTOFindProductsInPromotion);
  });
});
