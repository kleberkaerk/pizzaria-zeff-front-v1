import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { ProductService } from './product.service';
import { Product } from '../domain/product';
import { Page } from '../util/page';
import { ProductDTO } from '../dto/product-dto';
import { Type } from '../domain/type';
import { PriceRating } from '../domain/price-rating';


describe('ProductService', () => {

  let service: ProductService;
  let urlBase = environment.urlBase;
  let httpTestingController: HttpTestingController;

  let productDTOPageSearchProducts: Page<Array<ProductDTO>>;
  let productToComparisonInSearchProducts: Product;

  function setProductDTOPageSearchProducts() {

    let product = new ProductDTO(1, "name1", "description1", 1.00, Type.DRINK, PriceRating.REGULAR_PRICE, "drink.jpg", true);

    let state = {
      empty: true,
      sorted: true,
      unsorted: true
    }

    let pageable = {
      sort: state,
      offset: 1,
      pageSize: 1,
      pageNumber: 1,
      unpaged: 1,
      paged: true
    }

    productDTOPageSearchProducts = new Page([product], pageable, 1, 1, true, 1, 1, state, true, 1, true);
  }

  function setProductToComparisonInSearchProducts() {

    productToComparisonInSearchProducts = new Product(1, "name1", "description1", 1.00, Type.DRINK, PriceRating.REGULAR_PRICE, "drink.jpg", true);
  }

  beforeEach(() => {

    setProductDTOPageSearchProducts();
    setProductToComparisonInSearchProducts();
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

  it("searchProducts_makesARequestToTheWebServicePassingTheValueOfItsParametersAsQueryParamAndReturnsAnArrayOfProducts_wheneverCalled", (done) => {

    const productName = "name";
    const quantity = 10;
    const pageNumber = 0;

    service.searchProducts(productName, quantity, pageNumber).subscribe(productsPage => {

      let ProductsPageToComparison = {
        ...productDTOPageSearchProducts,
        content: [productToComparisonInSearchProducts]
      }

      expect(productsPage)
        .toEqual(ProductsPageToComparison);

      expect(productsPage.content[0])
        .toEqual(productToComparisonInSearchProducts);

      done();
    });

    const request = httpTestingController.expectOne(urlBase + "products/search?name=" + productName + "&size=" + quantity.toString() + "&page=" + pageNumber.toString());

    request.flush(productDTOPageSearchProducts);
  });
});
