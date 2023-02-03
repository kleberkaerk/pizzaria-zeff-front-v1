import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { Product } from 'src/app/domain/product';
import { PriceRating } from 'src/app/domain/price-rating';
import { Type } from 'src/app/domain/type';
import { ProductTransferService } from 'src/app/service/product-transfer.service';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { ProductComponent } from './product.component';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { TouchEventHandlerService } from 'src/app/service/touch-event-handler.service';

describe('UniqueProductComponent', () => {

  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  let productTransferService: ProductTransferService;
  let router: Router;
  let touchEventHandlerService: TouchEventHandlerService;
  let shoppingCartService: ShoppingCartService;

  let productNgOnInit: Product;
  let productToAddProductToCart: Product;

  function setProductNgOnInit() {

    productNgOnInit = new Product(1, "name1", "description1", 1.00, Type.SALTY_PIZZA, PriceRating.REGULAR_PRICE, "salty-pizza.jpg", true);
  }

  function setProductToAddProductToCart() {

    productToAddProductToCart = new Product(2, "name2", "description2", 2.00, Type.DRINK, PriceRating.REGULAR_PRICE, "drink.jpg", true);
  }
  beforeEach(() => {

    setProductNgOnInit();
    setProductToAddProductToCart();
  });

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        ProductComponent,
        FooterComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    productTransferService = TestBed.inject(ProductTransferService);
    router = TestBed.inject(Router);
    touchEventHandlerService = TestBed.inject(TouchEventHandlerService);
    shoppingCartService = TestBed.inject(ShoppingCartService);
  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();
  });

  it("ngOnInit_initializesTheProductPropertyWithTheValueOfTheProductThatProductTransferServiceReturns_whenProductTransferServiceReturnsAProductThatIsNotUndefined", () => {

    spyOn(productTransferService, "getProduct").and.returnValue(of(productNgOnInit));

    component.ngOnInit();

    expect(component.product)
      .toEqual(productNgOnInit);
  });

  it("ngOnInit_navigateToHomePage_whenProductTransferServiceReturnsUndefinedValue", () => {

    spyOn(productTransferService, "getProduct").and.returnValue(of(undefined));

    const routerSpy = spyOn(router, "navigate");

    component.ngOnInit();

    expect(routerSpy.calls.first().args[0][0])
      .toEqual("/");
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

  it("addProductToCart_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    spyOn(shoppingCartService, "addProduct");

    component.addProductToCart(touchendEvent);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(shoppingCartService.addProduct)
      .not.toHaveBeenCalled();
  });

  it("addProductToCart_callsTheShoppingCartServiceToAddANewProductAndPassesTheProductPropertyAsAnArgument_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalse", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    const shoppingCartServiceSpy = spyOn(shoppingCartService, "addProduct");

    component.product = productToAddProductToCart;

    component.addProductToCart(touchendEvent);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(shoppingCartService.addProduct)
      .toHaveBeenCalled();

    expect(shoppingCartServiceSpy.calls.first().args[0])
      .toEqual(productToAddProductToCart);
  });

  it("purchaseProduct_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    component.purchaseProduct(touchendEvent);

    expect(touchEventHandlerService.preventDefaultTouchend)
    .toHaveBeenCalled();

    // Tem mais
  });
});
