import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PriceRating } from 'src/app/domain/price-rating';

import { Product } from 'src/app/domain/product';
import { Type } from 'src/app/domain/type';
import { ProductTransferService } from 'src/app/service/product-transfer.service';
import { ProductRequisitionService } from 'src/app/service/product-requisition.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { TouchEventHandlerService } from 'src/app/service/touch-event-handler.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Page } from 'src/app/util/page';

import { SearchProductsComponent } from './search-products.component';

describe('SearchProductsComponent', () => {

  let component: SearchProductsComponent;
  let fixture: ComponentFixture<SearchProductsComponent>;

  let activatedRoute: ActivatedRoute;
  let productService: ProductRequisitionService;
  let touchEventHandlerService: TouchEventHandlerService;
  let productTransferService: ProductTransferService;
  let shoppingCartService: ShoppingCartService;
  let router: Router;

  let productsPageNgOnInit: Page<Array<Product>>;
  let productViewProduct: Product;
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

  function setProductViewProduct() {

    productViewProduct = new Product(1, "name1", "description1", 10.00, Type.SALTY_ESFIHA, PriceRating.REGULAR_PRICE, "salty-esfiha.jpg", true);
  }

  function setProductToAddProductToCart() {

    productToAddProductToCart = new Product(1, "name1", "description1", 10.00, Type.DRINK, PriceRating.REGULAR_PRICE, "salty-pizza.jpg", true);
  }

  beforeEach(() => {

    setProductsPageNgOnInit();
    setProductViewProduct();
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
    productService = TestBed.inject(ProductRequisitionService);
    touchEventHandlerService = TestBed.inject(TouchEventHandlerService);
    productTransferService = TestBed.inject(ProductTransferService);
    shoppingCartService = TestBed.inject(ShoppingCartService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();
  });

  it("ngOnInit_takesTheQueryParamAndUsesTheSameInTheProductServiceAndSetsTheReturnOfTheProductServiceInTheSearchResultsPagePropertyAndSetsTheCurrentPagePropertyTo0AndScrollTheSiteToTheTop_whenThePagePropertyOfTheQueryParamIsUndefined", () => {

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

    expect(document.documentElement.scrollTop)
      .toEqual(0);

    expect(document.documentElement.scrollLeft)
      .toEqual(0);
  });

  it("ngOnInit_takesTheQueryParamAndUsesTheSameInTheProductServiceAndSetsTheReturnOfTheProductServiceInTheSearchResultsPagePropertyAndSetsTheValueOfThePagePropertyInTheCurrentPagePropertyAndScrollTheSiteToTheTop_whenThePagePropertyOfTheQueryParamIsNotUndefined", () => {

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

    expect(document.documentElement.scrollTop)
      .toEqual(0);

    expect(document.documentElement.scrollLeft)
      .toEqual(0);
  });

  it("ngAfterViewInit_scrollTheSiteToTheTop_wheneverCalled", () => {

    component.ngAfterViewInit();

    expect(document.documentElement.scrollTop)
      .toEqual(0);

    expect(document.documentElement.scrollLeft)
      .toEqual(0);
  });

  it("setInitialTouchPoint_callsTouchEventHandlerServiceAndPassesEventObjectAsArgument_wheneverCalled", () => {

    const touchEvent = new TouchEvent("touchstart", { cancelable: true });

    const touchEventHandlerServiceSpy = spyOn(touchEventHandlerService, "setInitialTouchPoint");

    component.setInitialTouchPoint(touchEvent);

    expect(touchEventHandlerService.setInitialTouchPoint)
      .toHaveBeenCalled();

    expect(touchEventHandlerServiceSpy.calls.argsFor(0)[0])
      .toEqual(touchEvent);
  });

  it("viewProduct_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    spyOn(productTransferService, "setProduct");

    component.viewProduct(touchendEvent, productViewProduct);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(productTransferService.setProduct)
      .not.toHaveBeenCalled();
  });

  it("viewProduct_callsTheProductTransferServicePassingTheProductParameterAsArgument_whenEverythingGoesWell", () => {

    const mouseEvent = new MouseEvent("click");

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    const productTransferServiceSpy = spyOn(productTransferService, "setProduct");

    component.viewProduct(mouseEvent, productViewProduct);

    expect(touchEventHandlerService.preventDefaultTouchend)
    .toHaveBeenCalled();

    expect(productTransferService.setProduct)
      .toHaveBeenCalled();

    expect(productTransferServiceSpy.calls.argsFor(0)[0])
      .toEqual(productViewProduct);
  });

  it("viewProduct_callsTheProductTransferServicePassingTheProductParameterAndNavigatesToProductRoute_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalseAndTheEventIsOfTypeTouchend", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    const productTransferServiceSpy = spyOn(productTransferService, "setProduct");

    const routerSpy = spyOn(router, "navigate");

    component.viewProduct(touchendEvent, productViewProduct);

    expect(touchEventHandlerService.preventDefaultTouchend)
    .toHaveBeenCalled();

    expect(productTransferService.setProduct)
      .toHaveBeenCalled();

    expect(productTransferServiceSpy.calls.argsFor(0)[0])
      .toEqual(productViewProduct);

    expect(routerSpy.calls.first().args[0])
      .toEqual(["/product"]);
  });

  it("changePage_callsPreventDefaultFunctionOfTheEventObjectAndDoesNothing_whenEventIsOfTypeTouchendAndIsCancelableAndParameterNextPage-1IsEqualToPropertyCurrentPage", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    component.changePage(touchendEvent, 1);

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

  it("addProductToCart_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    spyOn(shoppingCartService, "addProduct");

    component.addProductToCart(touchEvent, productToAddProductToCart);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(shoppingCartService.addProduct)
      .not.toHaveBeenCalled();
  });

  it("addProductToCart_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndCallsTheShoppingCartServiceToAddANewProduct_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalse", () => {

    const touchEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    const shoppingCartServiceSpy = spyOn(shoppingCartService, "addProduct");

    component.addProductToCart(touchEvent, productToAddProductToCart);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(shoppingCartService.addProduct)
      .toHaveBeenCalled();

    expect(shoppingCartServiceSpy.calls.first().args[0])
      .toEqual(productToAddProductToCart);
  });
});
