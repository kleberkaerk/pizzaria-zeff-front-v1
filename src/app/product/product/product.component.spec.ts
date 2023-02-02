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

describe('UniqueProductComponent', () => {

  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  let productTransferService: ProductTransferService;
  let router: Router;
  let shoppingCartService: ShoppingCartService;

  let productNgOnInit: Product;

  function setProductNgOnInit() {

    productNgOnInit = new Product(1, "name1", "description1", 1.00, Type.SALTY_PIZZA, PriceRating.REGULAR_PRICE, "salty-pizza.jpg", true);
  }

  beforeEach(() => {

    setProductNgOnInit();
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

  it("setInitialTouchPoint_initializeInitialTouchPropertyWithEventObject_wheneverCalled", () => {

    const touchEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEvent.changedTouches, "item");

    component.setInitialTouchPoint(touchEvent);

    expect(touchEvent.changedTouches.item)
      .toHaveBeenCalled();
  });

  it("addProductToCart_callsThePreventDefaultMethodInEventObjectCancelableAndTouchendDoesNotDoAnything_whenEventObjectIsTouchendTypeAndItIsAMovingTouchMethodReturnsTrue", () => {

    const touchEvent = new TouchEvent("touchend", { cancelable: true });
    const touchMock = new Touch({ clientX: 1, clientY: 2, identifier: 1, target: new EventTarget() });

    spyOn(touchEvent, "preventDefault");
    spyOn(touchEvent.changedTouches, "item").and.callFake(() => touchMock);

    spyOn(shoppingCartService, "addProduct");

    component.addProductToCart(touchEvent);

    expect(touchEvent.preventDefault)
      .toHaveBeenCalled();

    expect(shoppingCartService.addProduct)
      .not.toHaveBeenCalled();
  });

  it("addProductToCart_callsTheShoppingCartServiceToAddANewProduct_whenItIsAMovingTouchMethodReturnsFalse", () => {

    const touchEvent = new TouchEvent("touchend", { cancelable: true });
    const touchMock = new Touch({ clientX: 1, clientY: 2, identifier: 1, target: new EventTarget() });

    spyOn(touchEvent.changedTouches, "item").and.callFake(() => touchMock);

    component.setInitialTouchPoint(touchEvent);

    spyOn(touchEvent, "preventDefault");

    spyOn(shoppingCartService, "addProduct");

    component.addProductToCart(touchEvent);

    expect(touchEvent.preventDefault)
      .toHaveBeenCalled();

    expect(shoppingCartService.addProduct)
      .toHaveBeenCalled();
  });

  it("purchaseProduct_callsThePreventDefaultMethodInEventObjectCancelableAndTouchendDoesNotDoAnything_whenEventObjectIsTouchendTypeAndItIsAMovingTouchMethodReturnsTrue", () => {

    const touchEvent = new TouchEvent("touchend", { cancelable: true });
    const touchMock = new Touch({ clientX: 1, clientY: 2, identifier: 1, target: new EventTarget() });

    spyOn(touchEvent, "preventDefault");
    spyOn(touchEvent.changedTouches, "item").and.callFake(() => touchMock);

    component.purchaseProduct(touchEvent);

    expect(touchEvent.preventDefault)
      .toHaveBeenCalled();
  });
});
