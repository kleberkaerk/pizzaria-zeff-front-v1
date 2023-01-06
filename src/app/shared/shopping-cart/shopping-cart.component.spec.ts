import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PriceRating } from '../domain/price-rating';
import { Product } from '../domain/product';
import { Type } from '../domain/type';
import { ShoppingCartService } from '../service/shopping-cart.service';

import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {

  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let service: ShoppingCartService;

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
    service = TestBed.inject(ShoppingCartService);
  });

  afterEach(() => {

    sessionStorage.removeItem("products");
  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();
  });

  it("ngOnInit_getsTheProductsStoredInSessionStorageAndSumsUpTheirPrices_whenThereAreProductsStoredInSessionStorage", () => {

    let amount = products.map(product => product.getPrice)
      .reduce((previousPrice, currentPrice) => previousPrice + currentPrice, 0);

    spyOn(service, "checkProductsInSession").and.returnValue(products);

    component.ngOnInit();

    expect(component.products)
      .toEqual(products);

    expect(component.amount)
      .toEqual(amount);
  });

  it("ngOnInit_getsTheProductsThatWereRecentlyAddedToSessionStorageAndSumsUpTheirPrices_whenANewProductIsAdded", () => {

    component.ngOnInit();

    service.addProduct(product);

    expect(component.products)
      .toEqual([product]);

    expect(component.amount)
      .toEqual(product.getPrice);
  });

  it("displayProductsInShoppingCart_addsDataToShowAttributeToTheFocusElementAndAddsAClassToTheButtonElement_whenTheFocusElementDoesNotHaveTheDataToShowAttribute", () => {

    let event = new MouseEvent("click");
    let compiled = fixture.nativeElement as HTMLElement;
    let buttonElement = compiled.querySelector(".shopping-cart-button") as Element;
    let shoppingCartElement = compiled.querySelector(".shopping-cart") as Element;

    component.displayProductsInShoppingCart(event, buttonElement, shoppingCartElement);

    fixture.detectChanges();

    expect(buttonElement.getAttribute("class"))
      .toContain("cart-of-products-on-display");

    expect(shoppingCartElement.hasAttribute("data-to-show"))
      .toBeTrue();
  });

  it("displayProductsInShoppingCart_removesTheDataToShowAttributeFromTheFocusElementAndRemovesAClassFromTheButtonElement_whenAClickEventFiresOutsideTheFocusElement", () => {

    let event = new MouseEvent("click");
    let compiled = fixture.nativeElement as HTMLElement;
    let buttonElement = compiled.querySelector(".shopping-cart-button") as Element;
    let shoppingCartElement = compiled.querySelector(".shopping-cart") as Element;

    component.displayProductsInShoppingCart(event, buttonElement, shoppingCartElement);

    document.documentElement.click();

    fixture.detectChanges();

    expect(buttonElement.getAttribute("class"))
      .not.toContain("cart-of-products-on-display");

    expect(shoppingCartElement.hasAttribute("data-to-show"))
      .toBeFalse();
  });

  it("displayProductsInShoppingCart_callsThePreventDefaultMethod_whenTheEventObjectIsACancelableTouchstart", () => {

    let event = new TouchEvent("touchstart", { cancelable: true });
    let compiled = fixture.nativeElement as HTMLElement;
    let buttonElement = compiled.querySelector(".shopping-cart-button") as Element;
    let shoppingCartElement = compiled.querySelector(".shopping-cart") as Element;

    component.displayProductsInShoppingCart(event, buttonElement, shoppingCartElement);

    fixture.detectChanges();

    expect(buttonElement.getAttribute("class"))
      .toContain("cart-of-products-on-display");

    expect(shoppingCartElement.hasAttribute("data-to-show"))
      .toBeTrue();
  });

  it("closeShoppingCart_firesTheClickEventDefinedOnTheHtmlElement_wheneverCalled", () => {

    let event = new MouseEvent("click");
    let compiled = fixture.nativeElement as HTMLElement;
    let buttonElement = compiled.querySelector(".shopping-cart-button") as Element;
    let shoppingCartElement = compiled.querySelector(".shopping-cart") as Element;

    component.displayProductsInShoppingCart(event, buttonElement, shoppingCartElement);

    component.closeShoppingCart(event);

    fixture.detectChanges();

    expect(buttonElement.getAttribute("class"))
      .not.toContain("cart-of-products-on-display");

    expect(shoppingCartElement.hasAttribute("data-to-show"))
      .toBeFalse();
  });

  it("removeProduct_callsTheShoppingCartServiceToRemoveAProduct_wheneverCalled", () => {

    spyOn(service, "removeProduct");

    let event = new MouseEvent("click");

    component.removeProduct(event, 0);

    expect(service.removeProduct)
      .toHaveBeenCalled();
  });
});
