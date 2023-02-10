import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductMenuComponent } from './product-menu.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { of } from 'rxjs';
import { ProductRequisitionService } from 'src/app/service/product-requisition.service';
import { Product } from 'src/app/domain/product';
import { Type } from 'src/app/domain/type';
import { PriceRating } from 'src/app/domain/price-rating';
import { Page } from 'src/app/util/page';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { TouchEventHandlerService } from 'src/app/service/touch-event-handler.service';
import { ProductTransferService } from 'src/app/service/product-transfer.service';

describe('ProductMenuComponent', () => {

  let component: ProductMenuComponent;
  let fixture: ComponentFixture<ProductMenuComponent>;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  let productService: ProductRequisitionService;
  let touchEventHandlerService: TouchEventHandlerService;
  let productTransferService: ProductTransferService;
  let shoppingCartService: ShoppingCartService;

  let productsPageNgOnInit: Page<Array<Product>>;
  let productToAddProductToCart: Product;
  let productViewProduct: Product;

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

  function setProductViewProduct() {

    productViewProduct = new Product(1, "name1", "description1", 10.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true);
  }

  beforeEach(() => {

    setProductsPageNgOnInit();
    setProductToAddProductToCart();
    setProductViewProduct();
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
    productService = TestBed.inject(ProductRequisitionService);
    touchEventHandlerService = TestBed.inject(TouchEventHandlerService);
    productTransferService = TestBed.inject(ProductTransferService);
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

  it("changePage_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    spyOn(router, "navigate");

    component.changePage(touchendEvent, 2);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(router.navigate)
      .not.toHaveBeenCalled();
  });

  it("changePage_doesNothing_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalseAndParameterNextPage-1IsEqualToPropertyCurrentPage", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    spyOn(router, "navigate");

    component.changePage(touchendEvent, 1);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(router.navigate)
      .not.toHaveBeenCalled();
  });

  it("changePage_navigatesToTheMenuRouteAndSendsTheTypeAndPageQueryParameters_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalseAndCurrentPagePropertyIsDifferentFromNextPageParameter", () => {

    const mouseEvent = new MouseEvent("click");

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    component.typeOfProducts = "DRINK";

    const routerSpy = spyOn(router, "navigate");

    component.changePage(mouseEvent, 2);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(routerSpy.calls.first().args[0])
      .toContain("/menu");

    expect(routerSpy.calls.first().args[1]?.queryParams)
      .toEqual({ type: "DRINK", page: 1 });
  });

  it("addProductToCart_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    spyOn(shoppingCartService, "addProduct");

    component.addProductToCart(touchendEvent, productToAddProductToCart);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(shoppingCartService.addProduct)
      .not.toHaveBeenCalled();
  });

  it("addProductToCart_callsTheShoppingCartServiceToAddANewProductAndPassesTheProductOfTheParameterAsAnArgument_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalse", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    const shoppingCartServiceSpy = spyOn(shoppingCartService, "addProduct");

    component.addProductToCart(touchendEvent, productToAddProductToCart);

    expect(touchEventHandlerService.preventDefaultTouchend)
    .toHaveBeenCalled();

    expect(shoppingCartService.addProduct)
      .toHaveBeenCalled();

    expect(shoppingCartServiceSpy.calls.first().args[0])
      .toEqual(productToAddProductToCart);
  });
});
