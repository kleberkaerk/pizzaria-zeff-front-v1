import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { ProductRequisitionService } from './product-requisition.service';

import { ProductDTO } from '../dto/product-dto';
import { ProductsMapByTypeDTO } from '../dto/product-by-type-map-dto';
import { Product } from '../domain/product';
import { Type } from '../domain/type';
import { PriceRating } from '../domain/price-rating';
import { Page } from '../util/page';
import { fromProductDTOToProduct } from '../util/mapper';

describe('ProductRequisitionService', () => {

  let service: ProductRequisitionService;
  let urlBase = environment.urlBase;
  let httpTestingController: HttpTestingController;

  let productsMapByTypeDTOFindProductsInPromotion: ProductsMapByTypeDTO;
  let productsMapByTypeToComparisonInFindProductsInPromotion: Map<Type, Array<Product>>;

  let productsDTOPageSearchProducts: Page<Array<ProductDTO>>;
  let productsPageToComparisonInSearchProducts: Page<Array<Product>>;

  let productsDTOPageFindMenuProducts: Page<Array<ProductDTO>>;
  let productsPageToComparisonInFindMenuProducts: Page<Array<Product>>;

  function setProductsMapByTypeDTOFindProductsInPromotion() {

    let saltyPizzas = [
      new ProductDTO(1, "name1", "description1", 10.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "image1", true),
      new ProductDTO(3, "name3", "description3", 30.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "image3", true),
      new ProductDTO(4, "name4", "description4", 40.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "image4", true)
    ];

    let sweetPizzas = [
      new ProductDTO(2, "name2", "description2", 20.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "image2", true),
      new ProductDTO(5, "name5", "description5", 50.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "image5", true)
    ];

    let saltyEsfihas = [
      new ProductDTO(6, "name6", "description6", 6.00, Type.SALTY_ESFIHA, PriceRating.PROMOTION, "salty-esfiha.jpg", true)
    ];

    let sweetEsfihas = [
      new ProductDTO(8, "name8", "description8", 8.00, Type.SALTY_ESFIHA, PriceRating.PROMOTION, "salty-esfiha.jpg", true)
    ];

    let drinks = [
      new ProductDTO(7, "name7", "description7", 7.00, Type.SALTY_ESFIHA, PriceRating.PROMOTION, "salty-esfiha.jpg", true)
    ];

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

  function setProductsDTOPageSearchProducts() {

    productsDTOPageSearchProducts = new Page(
      [new ProductDTO(1, "name1", "description1", 1.00, Type.DRINK, PriceRating.REGULAR_PRICE, "drink.jpg", true)],
      { sort: { empty: true, sorted: true, unsorted: true }, offset: 1, pageSize: 1, pageNumber: 1, unpaged: 1, paged: true },
      1,
      1,
      true,
      1,
      1,
      { empty: true, sorted: true, unsorted: true },
      true,
      1,
      true);
  }

  function setProductsPageToComparisonInSearchProducts() {

    productsPageToComparisonInSearchProducts = {
      ...productsDTOPageSearchProducts,
      content: [new Product(1, "name1", "description1", 1.00, Type.DRINK, PriceRating.REGULAR_PRICE, "drink.jpg", true)]
    };
  }

  function setProductsDTOPageFindMenuProducts() {

    productsDTOPageFindMenuProducts = new Page(
      [new ProductDTO(2, "name2", "description2", 2.00, Type.SWEET_PIZZA, PriceRating.REGULAR_PRICE, "sweet-pizza.jpg", true)],
      { sort: { empty: true, sorted: true, unsorted: true }, offset: 2, pageSize: 2, pageNumber: 2, unpaged: 2, paged: true },
      2,
      2,
      true,
      2,
      2,
      { empty: true, sorted: true, unsorted: true },
      true,
      2,
      true);
  }

  function setProductsPageToComparisonInFindMenuProducts() {

    productsPageToComparisonInFindMenuProducts = {
      ...productsDTOPageFindMenuProducts,
      content: [new Product(2, "name2", "description2", 2.00, Type.SWEET_PIZZA, PriceRating.REGULAR_PRICE, "sweet-pizza.jpg", true)]
    }
  }

  beforeEach(() => {

    setProductsMapByTypeDTOFindProductsInPromotion();
    setProductsMapByTypeToComparisonInFindProductsInPromotion();
    setProductsDTOPageSearchProducts();
    setProductsPageToComparisonInSearchProducts();
    setProductsDTOPageFindMenuProducts();
    setProductsPageToComparisonInFindMenuProducts();
  });

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.inject(ProductRequisitionService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {

    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("findProductsInPromotion_makesARequestToTheWebServiceAndReturnsAMapOfProductsGroupedByTypeWithAllProductsOnPromotion_wheneverCalled", (done) => {

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

  it("searchProducts_makesARequestToTheWebServicePassingTheValueOfItsParametersAsQueryParamAndReturnsAProductArrayPage_wheneverCalled", (done) => {

    const productName = "name";
    const quantity = 10;
    const pageNumber = 0;

    service.searchProducts(productName, quantity, pageNumber).subscribe(productsPage => {

      expect(productsPage)
        .not.toBeNull();

      expect(productsPage)
        .toEqual(productsPageToComparisonInSearchProducts);

      expect(productsPage.content[0])
        .toEqual(productsPageToComparisonInSearchProducts.content[0]);

      done();
    });

    const request = httpTestingController.expectOne(urlBase + "products/search?name=" + productName + "&size=" + quantity.toString() + "&page=" + pageNumber.toString());

    request.flush(productsDTOPageSearchProducts);
  });

  it("findMenuProducts_makesARequestToTheWebServicePassingTheValueOfItsParametersAsQueryParamAndReturnsAProductArrayPage_wheneverCalled", (done) => {

    const productType = "SWEET_PIZZA";
    const pageNumber = 0;

    service.findMenuProducts(productType, pageNumber).subscribe(productsPage => {

      expect(productsPage)
        .not.toBeNull();

      expect(productsPage)
        .toEqual(productsPageToComparisonInFindMenuProducts);

      expect(productsPage.content.length)
        .toEqual(productsPageToComparisonInFindMenuProducts.content.length);

      expect(productsPage.content[0])
        .toEqual(productsPageToComparisonInFindMenuProducts.content[0]);

      done();
    });

    const request = httpTestingController.expectOne(urlBase + "products/find-by-type?type=" + productType + "&page=" + pageNumber.toString());

    request.flush(productsDTOPageFindMenuProducts);
  });
});
