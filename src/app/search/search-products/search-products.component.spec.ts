import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PriceRating } from 'src/app/domain/price-rating';

import { Product } from 'src/app/domain/product';
import { Type } from 'src/app/domain/type';
import { ProductService } from 'src/app/service/product.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Page } from 'src/app/util/page';

import { SearchProductsComponent } from './search-products.component';

describe('SearchProductsComponent', () => {

  let component: SearchProductsComponent;
  let fixture: ComponentFixture<SearchProductsComponent>;

  let activatedRoute: ActivatedRoute;
  let router: Router;
  let productService: ProductService;
  let shoppingCartService: ShoppingCartService;

  let productsPageNgOnInit: Page<Array<Product>>;
  let productToAddProductToCart: Product;

  function setProductsPageNgOnInit() {

    productsPageNgOnInit = new Page(
      [new Product(1, "name1", "description1", 1.00, Type.SALTY_ESFIHA, PriceRating.PROMOTION, "salty-esfiha.jpg", true)],
      { sort: { empty: true, sorted: true, unsorted: true }, offset: 1, pageSize: 1, pageNumber: 1, unpaged: 1, paged: true },
      1,
      1,
      true,
      1,
      1,
      { empty: true, sorted: true, unsorted: true },
      true,
      1,
      true
    );
  }

  function setProductToAddProductToCart() {

    productToAddProductToCart = new Product(1, "name1", "description1", 10.00, Type.DRINK, PriceRating.REGULAR_PRICE, "salty-pizza.jpg", true);
  }

  beforeEach(() => {

    setProductsPageNgOnInit();
    setProductToAddProductToCart();
  });

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        SearchProductsComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SharedModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    productService = TestBed.inject(ProductService);
    shoppingCartService = TestBed.inject(ShoppingCartService);
  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();
  });

  it("ngOnInit_takesTheQueryParamAndUsesTheSameInTheProductServiceAndSetsTheReturnOfTheProductServiceInTheSearchResultsPagePropertyAndSetsTheCurrentPagePropertyTo0_whenThePagePropertyOfTheQueryParamIsUndefined", () => {

    Object.defineProperty(activatedRoute, "queryParams", {
      get: function () {
        return this.queryParams;
      }
    });

    spyOnProperty(activatedRoute, "queryParams").and.returnValue(of({
      value: "name"
    }));

    spyOn(productService, "searchProducts").and.returnValue(of(productsPageNgOnInit));

    component.ngOnInit();

    expect(component.valueSearch)
      .toEqual("name");

    expect(component.currentPage)
      .toEqual(0);

    expect(component.availablePages.length)
      .toEqual(productsPageNgOnInit.totalPages);

    expect(component.searchResultsPage)
      .toEqual(productsPageNgOnInit);

    expect(component.quantityOfProducts)
      .toEqual(productsPageNgOnInit.content.length);
  });

  it("ngOnInit_takesTheQueryParamAndUsesTheSameInTheProductServiceAndSetsTheReturnOfTheProductServiceInTheSearchResultsPagePropertyAndSetsTheValueOfThePagePropertyInTheCurrentPageProperty_whenThePagePropertyOfTheQueryParamIsNotUndefined", () => {

    Object.defineProperty(activatedRoute, "queryParams", {
      get: function () {
        return this.queryParams;
      }
    });

    spyOnProperty(activatedRoute, "queryParams").and.returnValue(of({
      value: "name",
      page: "1"
    }));

    spyOn(productService, "searchProducts").and.returnValue(of(productsPageNgOnInit));

    component.ngOnInit();

    expect(component.valueSearch)
      .toEqual("name");

    expect(component.currentPage)
      .toEqual(1);

    expect(component.availablePages.length)
      .toEqual(productsPageNgOnInit.totalPages);

    expect(component.searchResultsPage)
      .toEqual(productsPageNgOnInit);

    expect(component.quantityOfProducts)
      .toEqual(productsPageNgOnInit.content.length);
  });

  it("ngAfterViewChecked_scrollTheSiteToTheTop_wheneverCalled", () => {

    component.ngAfterViewChecked();

    expect(document.documentElement.scrollTop)
      .toEqual(0);

    expect(document.documentElement.scrollLeft)
      .toEqual(0);
  });

  it("changePage_callsPreventDefaultFunctionOfTheEventObjectAndDoesNothing_whenEventIsOfTypeTouchstartAndIsCancelableAndParameterNextPage-1IsEqualToPropertyCurrentPage", () => {

    const touchstartEvent = new TouchEvent("touchstart", { cancelable: true });

    component.changePage(touchstartEvent, 1);

    expect(component.currentPage)
      .toEqual(0);
  });

  it("changePage_navigatesToTheSearchRouteAndSendsTheValueAndPageQueryParameters_whenCurrentPagePropertyIsDifferentFromNextPageProperty", () => {

    const routerSpy = spyOn(router, "navigate");

    const mouseEvent = new MouseEvent("click");
    component.valueSearch = "name";

    component.changePage(mouseEvent, 2);

    expect(routerSpy.calls.first().args[0])
      .toContain("/search");

    expect(routerSpy.calls.first().args[1]?.queryParams)
      .toEqual({ value: "name", page: 1 });
  });

  it("addProductToCard_callsTheShoppingCartServiceToAddANewProduct_wheneverCalled", () => {

    let mouseEvent = new MouseEvent("click");

    spyOn(shoppingCartService, "addProduct");

    component.addProductToCard(mouseEvent, productToAddProductToCart);

    expect(shoppingCartService.addProduct)
      .toHaveBeenCalled();
  });
});
