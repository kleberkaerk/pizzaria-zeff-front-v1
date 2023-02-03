import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PriceRating } from '../domain/price-rating';
import { Product } from '../domain/product';
import { Type } from '../domain/type';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { TouchEventHandlerService } from '../service/touch-event-handler.service';

import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {

  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  let shoppingCartService: ShoppingCartService;
  let touchEventHandlerService: TouchEventHandlerService;

  let products: Array<Product>;
  let product: Product;

  function setProducts() {

    products = [
      new Product(1, "name1", "description1", 1.00, Type.SALTY_ESFIHA, PriceRating.PROMOTION, "salty-esfiha.jpg", true),
      new Product(2, "name2", "description2", 2.00, Type.SALTY_ESFIHA, PriceRating.PROMOTION, "salty-esfiha.jpg", true),
      new Product(3, "name3", "description3", 3.00, Type.SALTY_ESFIHA, PriceRating.PROMOTION, "salty-esfiha.jpg", true)
    ]
  }

  function setProduct() {

    product = new Product(1, "name1", "description1", 1.00, Type.SWEET_ESFIHA, PriceRating.REGULAR_PRICE, "sweet-esfiha.jpg", true);
  }

  beforeEach(() => {

    setProducts();
    setProduct();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingCartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    shoppingCartService = TestBed.inject(ShoppingCartService);
    touchEventHandlerService = TestBed.inject(TouchEventHandlerService);
  });

  afterEach(() => {

    sessionStorage.removeItem("products");
  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();
  });

  it("ngOnInit_getsTheProductsStoredInSessionStorageAndSumsUpTheirPrices_whenThereAreProductsStoredInSessionStorage", () => {

    const amount = products.map(product => product.getPrice)
      .reduce((previousPrice, currentPrice) => previousPrice + currentPrice, 0);

    spyOn(shoppingCartService, "checkProductsInSession").and.returnValue(products);

    component.ngOnInit();

    expect(component.products)
      .toEqual(products);

    expect(component.amount)
      .toEqual(amount);
  });

  it("ngOnInit_getsTheProductsThatWereRecentlyAddedToSessionStorageAndSumsUpTheirPrices_whenANewProductIsAdded", () => {

    component.ngOnInit();

    shoppingCartService.addProduct(product);

    expect(component.products)
      .toEqual([product]);

    expect(component.amount)
      .toEqual(product.getPrice);
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

  it("displayProductsInShoppingCart_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });
    const compiled = fixture.nativeElement as HTMLElement;
    const buttonElement = compiled.querySelector(".shopping-cart-button") as Element;
    const shoppingCartElement = compiled.querySelector(".shopping-cart") as Element;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    component.displayProductsInShoppingCart(touchendEvent, buttonElement, shoppingCartElement);

    fixture.detectChanges();

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(buttonElement.getAttribute("class"))
      .not.toContain("cart-of-products-on-display");

    expect(shoppingCartElement.hasAttribute("data-to-show"))
      .not.toBeTrue();
  });

  it("displayProductsInShoppingCart_addsDataToShowAttributeToTheFocusElementAndAddsAClassToTheButtonElement_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalseAndTheFocusElementDoesNotHaveTheDataToShowAttribute", () => {

    const event = new MouseEvent("click");
    const compiled = fixture.nativeElement as HTMLElement;
    const buttonElement = compiled.querySelector(".shopping-cart-button") as Element;
    const shoppingCartElement = compiled.querySelector(".shopping-cart") as Element;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    component.displayProductsInShoppingCart(event, buttonElement, shoppingCartElement);

    fixture.detectChanges();

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(buttonElement.getAttribute("class"))
      .toContain("cart-of-products-on-display");

    expect(shoppingCartElement.hasAttribute("data-to-show"))
      .toBeTrue();
  });

  it("displayProductsInShoppingCart_removesTheDataToShowAttributeFromTheFocusElementAndRemovesAClassFromTheButtonElement_whenAClickEventFiresOutsideTheFocusElement", () => {

    const event = new MouseEvent("click");
    const compiled = fixture.nativeElement as HTMLElement;
    const buttonElement = compiled.querySelector(".shopping-cart-button") as Element;
    const shoppingCartElement = compiled.querySelector(".shopping-cart") as Element;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    component.displayProductsInShoppingCart(event, buttonElement, shoppingCartElement);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    document.documentElement.click();

    fixture.detectChanges();

    expect(buttonElement.getAttribute("class"))
      .not.toContain("cart-of-products-on-display");

    expect(shoppingCartElement.hasAttribute("data-to-show"))
      .toBeFalse();
  });

  it("closeShoppingCart_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });
    const compiled = fixture.nativeElement as HTMLElement;
    const buttonElement = compiled.querySelector(".shopping-cart-button") as Element;
    const shoppingCartElement = compiled.querySelector(".shopping-cart") as Element;

    buttonElement.classList.toggle("cart-of-products-on-display");
    shoppingCartElement.setAttribute("data-to-show", "");

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    component.closeShoppingCart(touchendEvent);

    fixture.detectChanges();

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(buttonElement.getAttribute("class"))
      .toContain("cart-of-products-on-display");

    expect(shoppingCartElement.hasAttribute("data-to-show"))
      .toBeTrue();
  });

  it("closeShoppingCart_firesTheClickEventDefinedOnTheHtmlElement_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalse", () => {

    const event = new MouseEvent("click");
    const compiled = fixture.nativeElement as HTMLElement;
    const buttonElement = compiled.querySelector(".shopping-cart-button") as Element;
    const shoppingCartElement = compiled.querySelector(".shopping-cart") as Element;

    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    component.displayProductsInShoppingCart(event, buttonElement, shoppingCartElement);

    spyOn(touchEventHandlerService, "preventDefaultTouchend");

    component.closeShoppingCart(event);

    fixture.detectChanges();

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(buttonElement.getAttribute("class"))
      .not.toContain("cart-of-products-on-display");

    expect(shoppingCartElement.hasAttribute("data-to-show"))
      .toBeFalse();
  });

  it("removeProduct_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    spyOn(shoppingCartService, "removeProduct");
    component.removeProduct(touchendEvent, 0);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(shoppingCartService.removeProduct)
      .not.toHaveBeenCalled();
  });

  it("removeProduct_callsTheShoppingCartServiceToRemoveAProductAndPassesTheIndexParameterAsAnAnArgument_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalse", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    const shoppingCartServiceSpy = spyOn(shoppingCartService, "removeProduct");

    component.removeProduct(touchendEvent, 0);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(shoppingCartService.removeProduct)
      .toHaveBeenCalled();

    expect(shoppingCartServiceSpy.calls.argsFor(0)[0])
      .toEqual(0);
  });

  it("purchaseProducts_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    component.purchaseProducts(touchendEvent);

    expect(touchEventHandlerService.preventDefaultTouchend)
    .toHaveBeenCalled();

    // Tem mais
  });
});
