import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductMenuComponent } from './product-menu.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { of } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/domain/product';
import { Type } from 'src/app/domain/type';
import { PriceRating } from 'src/app/domain/price-rating';
import { Page } from 'src/app/util/page';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

describe('ProductMenuComponent', () => {

  let component: ProductMenuComponent;
  let fixture: ComponentFixture<ProductMenuComponent>;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  let productService: ProductService;
  let shoppingCartService: ShoppingCartService;

  let productsPageNgOnInit: Page<Array<Product>>;
  let productToAddProductToCart: Product;

  function setProductsPageNgOnInit() {

    let products = [
      new Product(1, "name1", "description1", 1.00, Type.SALTY_ESFIHA, PriceRating.REGULAR_PRICE, "salty-esfiha.jpg", true),
      new Product(2, "name2", "description2", 2.00, Type.SALTY_ESFIHA, PriceRating.REGULAR_PRICE, "salty-esfiha.jpg", true),
      new Product(3, "name3", "description3", 3.00, Type.SALTY_ESFIHA, PriceRating.REGULAR_PRICE, "salty-esfiha.jpg", true),
      new Product(4, "name4", "description4", 4.00, Type.SALTY_ESFIHA, PriceRating.REGULAR_PRICE, "salty-esfiha.jpg", true),
      new Product(5, "name5", "description5", 5.00, Type.SALTY_ESFIHA, PriceRating.REGULAR_PRICE, "salty-esfiha.jpg", true),
    ];

    productsPageNgOnInit = new Page(
      products,
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

    productToAddProductToCart = new Product(1, "name1", "description1", 1.00, Type.DRINK, PriceRating.PROMOTION, "drink.jpg", true);
  }

  beforeEach(() => {

    setProductsPageNgOnInit();
    setProductToAddProductToCart();
  });

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        ProductMenuComponent,
        FooterComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    activatedRoute = TestBed.inject(ActivatedRoute);
    productService = TestBed.inject(ProductService);
    router = TestBed.inject(Router);
    shoppingCartService = TestBed.inject(ShoppingCartService);
  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();
  });

  it("ngOnInit_getTheTypePropertyOfTheQueryParamAndSetsTheCurrentPagePropertyTo0AndSetsTheReturnOfTheProductServiceInTheMenuProductsPagePropertyAndInitializePropertyAvailablePagesAndScrollTheSiteToTheTop_whenThePagePropertyOfTheQueryParamIsUndefined", () => {

    Object.defineProperty(activatedRoute, "queryParams", {
      get: function () { return this.queryParams }
    });

    spyOnProperty(activatedRoute, "queryParams")
      .and.returnValue(of({ type: "SALTY_ESFIHA" }));

    spyOn(productService, "findMenuProducts").and.returnValue(of(productsPageNgOnInit));

    component.ngOnInit();

    expect(component.typeOfProducts)
      .toEqual("SALTY_ESFIHA");

    expect(component.currentPage)
      .toEqual(0);

    expect(component.menuProductsPage)
      .toEqual(productsPageNgOnInit);

    expect(component.availablePages.length)
      .toEqual(1);

    expect(document.documentElement.scrollLeft)
      .toEqual(0);

    expect(document.documentElement.scrollTop)
      .toEqual(0);
  });

  it("ngOnInit_getTheTypePropertyOfTheQueryParamAndSetsTheValueOfThePagePropertyInTheCurrentPagePropertyAndSetsTheReturnOfTheProductServiceInTheMenuProductsPagePropertyAndInitializePropertyAvailablePagesAndScrollTheSiteToTheTop_whenThePagePropertyOfTheQueryParamIsNotUndefined", () => {

    Object.defineProperty(activatedRoute, "queryParams", {
      get: function () { return this.queryParams }
    });

    spyOnProperty(activatedRoute, "queryParams")
      .and.returnValue(of({ type: "SALTY_ESFIHA", page: "1" }));

    spyOn(productService, "findMenuProducts").and.returnValue(of(productsPageNgOnInit));

    component.ngOnInit();

    expect(component.typeOfProducts)
      .toEqual("SALTY_ESFIHA");

    expect(component.currentPage)
      .toEqual(1);

    expect(component.menuProductsPage)
      .toEqual(productsPageNgOnInit);

    expect(component.availablePages.length)
      .toEqual(1);

    expect(document.documentElement.scrollLeft)
      .toEqual(0);

    expect(document.documentElement.scrollTop)
      .toEqual(0);
  });

  it("ngAfterViewInit_scrollTheSiteToTheTop_wheneverCalled", () => {

    component.ngAfterViewInit();

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

  it("changePage_navigatesToTheMenuRouteAndSendsTheTypeAndPageQueryParameters_whenCurrentPagePropertyIsDifferentFromNextPageParameter", () => {

    const routerSpy = spyOn(router, "navigate");

    const mouseEvent = new MouseEvent("click");

    component.typeOfProducts = "DRINK";

    component.changePage(mouseEvent, 2);

    expect(routerSpy.calls.first().args[0])
      .toContain("/menu");

    expect(routerSpy.calls.first().args[1]?.queryParams)
      .toEqual({ type: "DRINK", page: 1 });
  });

  it("addProductToCard_callsTheShoppingCartServiceToAddANewProduct_wheneverCalled", () => {

    let mouseEvent = new MouseEvent("click");

    spyOn(shoppingCartService, "addProduct");

    component.addProductToCard(mouseEvent, productToAddProductToCart);

    expect(shoppingCartService.addProduct)
      .toHaveBeenCalled();
  });
});
