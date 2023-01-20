import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderComponent } from '../slider/slider.component';
import { FeaturedProductsComponent } from './featured-products.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { ProductService } from '../service/product.service';
import { Type } from 'src/app/shared/domain/type'
import { PriceRating } from 'src/app/shared/domain/price-rating'
import { of } from 'rxjs';
import { Product } from 'src/app/shared/domain/product';
import { ShoppingCartService } from 'src/app/shared/service/shopping-cart.service';

describe('FeaturedProductsComponent', () => {

  let component: FeaturedProductsComponent;
  let fixture: ComponentFixture<FeaturedProductsComponent>;
  let productService: ProductService;
  let shoppingCartService: ShoppingCartService;

  let productsMapByType: Map<Type, Array<Product>>;
  let productsMapByTypeSeeMoreProducts: Map<Type, Array<Product>>;
  let productToAddProductToCart: Product;

  function setProductsMapByType() {

    let saltyPizzas = [
      new Product(1, "name1", "description1", 10.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true),
      new Product(2, "name2", "description2", 20.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true),
      new Product(3, "name3", "description3", 30.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true)
    ];

    let sweetPizzas = [
      new Product(4, "name4", "description4", 40.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(5, "name5", "description5", 50.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(6, "name6", "description6", 60.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true)
    ];

    let saltyEsfihas = [
      new Product(7, "name7", "description7", 70.00, Type.SALTY_ESFIHA, PriceRating.PROMOTION, "salty-esfiha.jpg", true),
      new Product(8, "name8", "description8", 80.00, Type.SALTY_ESFIHA, PriceRating.PROMOTION, "salty-esfiha.jpg", true),
      new Product(9, "name9", "description9", 90.00, Type.SALTY_ESFIHA, PriceRating.PROMOTION, "salty-esfiha.jpg", true)
    ];

    let sweetEsfihas = [
      new Product(10, "name10", "description10", 100.00, Type.SWEET_ESFIHA, PriceRating.PROMOTION, "sweet-esfiha.jpg", true),
      new Product(11, "name11", "description11", 110.00, Type.SWEET_ESFIHA, PriceRating.PROMOTION, "sweet-esfiha.jpg", true)
    ];

    let drinks = [
      new Product(12, "name12", "description12", 120.00, Type.DRINK, PriceRating.PROMOTION, "soda.jpg", true),
      new Product(13, "name13", "description13", 130.00, Type.DRINK, PriceRating.PROMOTION, "soda.jpg", true),
      new Product(14, "name14", "description14", 140.00, Type.DRINK, PriceRating.PROMOTION, "soda.jpg", true)
    ];

    productsMapByType = new Map();

    productsMapByType.set(Type.SALTY_PIZZA, saltyPizzas);
    productsMapByType.set(Type.SWEET_PIZZA, sweetPizzas);
    productsMapByType.set(Type.SALTY_ESFIHA, saltyEsfihas);
    productsMapByType.set(Type.SWEET_ESFIHA, sweetEsfihas);
    productsMapByType.set(Type.DRINK, drinks);
  }

  function setProductsMapByTypeSeeMoreProducts() {

    let saltyPizas = [
      new Product(1, "name1", "description1", 10.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true),
      new Product(2, "name2", "description2", 20.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true),
      new Product(3, "name3", "description3", 30.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true),
      new Product(4, "name4", "description4", 40.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true),
      new Product(5, "name5", "description5", 50.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true),
      new Product(6, "name6", "description6", 60.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true)
    ];

    let sweetPizas = [
      new Product(7, "name7", "description7", 70.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(8, "name8", "description8", 80.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(9, "name9", "description9", 90.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(10, "name10", "description10", 100.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(11, "name11", "description11", 110.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(12, "name12", "description12", 120.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(13, "name13", "description13", 130.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(14, "name14", "description14", 140.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(15, "name15", "description15", 150.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(16, "name16", "description16", 160.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(17, "name17", "description17", 170.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(18, "name18", "description18", 180.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(19, "name19", "description19", 190.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(20, "name20", "description20", 200.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(21, "name21", "description21", 210.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(22, "name22", "description22", 220.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(23, "name23", "description23", 230.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(24, "name24", "description24", 240.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(25, "name25", "description25", 250.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(26, "name26", "description26", 260.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(27, "name27", "description27", 270.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(28, "name28", "description28", 280.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(29, "name29", "description29", 290.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(30, "name30", "description30", 300.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(31, "name31", "description31", 310.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(32, "name32", "description32", 320.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(33, "name33", "description33", 330.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(34, "name34", "description34", 340.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(35, "name35", "description35", 350.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(36, "name36", "description36", 360.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new Product(37, "name37", "description37", 370.00, Type.SWEET_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
    ];

    productsMapByTypeSeeMoreProducts = new Map();

    productsMapByTypeSeeMoreProducts.set(Type.SALTY_PIZZA, saltyPizas);
    productsMapByTypeSeeMoreProducts.set(Type.SWEET_PIZZA, sweetPizas);
    productsMapByTypeSeeMoreProducts.set(Type.SALTY_ESFIHA, []);
    productsMapByTypeSeeMoreProducts.set(Type.SWEET_ESFIHA, []);
    productsMapByTypeSeeMoreProducts.set(Type.DRINK, []);
  }

  function setProductToAddProductToCart() {

    productToAddProductToCart = new Product(1, "name1", "description1", 10.00, Type.DRINK, PriceRating.REGULAR_PRICE, "salty-pizza.jpg", true);
  }

  beforeEach(() => {

    setProductsMapByType();
    setProductsMapByTypeSeeMoreProducts();
    setProductToAddProductToCart();
  });

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        FeaturedProductsComponent,
        SliderComponent,
        FooterComponent
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeaturedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productService = TestBed.inject(ProductService);
    shoppingCartService = TestBed.inject(ShoppingCartService);
  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();
  });

  it("ngOnInit_callsAProductServiceMethodAndAssignsItsReturnToTheFeaturedProductsProperty_wheneverCalled", () => {

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByType));

    component.ngOnInit();

    expect(component.getSaltyPizzas())
      .not.toBeNull();
    expect(component.getSweetPizzas())
      .not.toBeNull();
    expect(component.getSaltyEsfihas())
      .not.toBeNull();
    expect(component.getSweetEsfihas())
      .not.toBeNull();
    expect(component.getDrinks())
      .not.toBeNull();

    expect(component.getSaltyPizzas())
      .toEqual(productsMapByType.get(Type.SALTY_PIZZA));
    expect(component.getSweetPizzas())
      .toEqual(productsMapByType.get(Type.SWEET_PIZZA));
    expect(component.getSaltyEsfihas())
      .toEqual(productsMapByType.get(Type.SALTY_ESFIHA));
    expect(component.getSweetEsfihas())
      .toEqual(productsMapByType.get(Type.SWEET_ESFIHA));
    expect(component.getDrinks())
      .toEqual(productsMapByType.get(Type.DRINK));

    expect(component.getSaltyPizzas()?.length)
      .toEqual(productsMapByType.get(Type.SALTY_PIZZA)?.length);
    expect(component.getSweetPizzas()?.length)
      .toEqual(productsMapByType.get(Type.SWEET_PIZZA)?.length);
    expect(component.getSaltyEsfihas()?.length)
      .toEqual(productsMapByType.get(Type.SALTY_ESFIHA)?.length);
    expect(component.getSweetEsfihas()?.length)
      .toEqual(productsMapByType.get(Type.SWEET_ESFIHA)?.length);
    expect(component.getDrinks()?.length)
      .toEqual(productsMapByType.get(Type.DRINK)?.length);
  });

  it("ngAfterViewChecked_doesNotDoAnything_whenCalledMoreThan4Times", () => {

    for (let i = 0; i < 3; i++) {

      component.ngAfterViewChecked();
    }

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByType));

    component.ngOnInit();
    component.ngAfterViewChecked();

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector("#salty-pizza-button")?.getAttribute("class"))
      .not.toContain("remove-expansion-button");
    expect(compiled.querySelector("#wrapper-salty-pizza")?.getAttribute("class"))
      .not.toContain("auto-height-wrapper");

    expect(compiled.querySelector("#sweet-pizza-button")?.getAttribute("class"))
      .not.toContain("remove-expansion-button");
    expect(compiled.querySelector("#wrapper-sweet-pizza")?.getAttribute("class"))
      .not.toContain("auto-height-wrapper");

    expect(compiled.querySelector("#salty-esfiha-button")?.getAttribute("class"))
      .not.toContain("remove-expansion-button");
    expect(compiled.querySelector("#wrapper-salty-esfiha")?.getAttribute("class"))
      .not.toContain("auto-height-wrapper");

    expect(compiled.querySelector("#sweet-esfiha-button")?.getAttribute("class"))
      .not.toContain("remove-expansion-button");
    expect(compiled.querySelector("#wrapper-sweet-esfiha")?.getAttribute("class"))
      .not.toContain("auto-height-wrapper");

    expect(compiled.querySelector("#drink-button")?.getAttribute("class"))
      .not.toContain("remove-expansion-button");
    expect(compiled.querySelector("#wrapper-drink")?.getAttribute("class"))
      .not.toContain("auto-height-wrapper");
  });

  it("ngAfterViewChecked_addsAClassToACertainExpansionButtonAndToTheWrapperThatHoldsTheProductsContainer_whenAGivenFeaturedProductsMapArrayIsLessThanOrEqualTo5ElementsAndTheBodyElementWidthIsLessThan481OrGreaterThan1023", () => {

    spyOnProperty(document.documentElement, "clientWidth").and.returnValue(1024);

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByType));

    component.ngOnInit();
    component.ngAfterViewChecked();

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector("#salty-pizza-button")?.getAttribute("class"))
      .toContain("remove-expansion-button");
    expect(compiled.querySelector("#wrapper-salty-pizza")?.getAttribute("class"))
      .toContain("auto-height-wrapper");

    expect(compiled.querySelector("#sweet-pizza-button")?.getAttribute("class"))
      .toContain("remove-expansion-button");
    expect(compiled.querySelector("#wrapper-sweet-pizza")?.getAttribute("class"))
      .toContain("auto-height-wrapper");

    expect(compiled.querySelector("#salty-esfiha-button")?.getAttribute("class"))
      .toContain("remove-expansion-button");
    expect(compiled.querySelector("#wrapper-salty-esfiha")?.getAttribute("class"))
      .toContain("auto-height-wrapper");

    expect(compiled.querySelector("#sweet-esfiha-button")?.getAttribute("class"))
      .toContain("remove-expansion-button");
    expect(compiled.querySelector("#wrapper-sweet-esfiha")?.getAttribute("class"))
      .toContain("auto-height-wrapper");

    expect(compiled.querySelector("#drink-button")?.getAttribute("class"))
      .toContain("remove-expansion-button");
    expect(compiled.querySelector("#wrapper-drink")?.getAttribute("class"))
      .toContain("auto-height-wrapper");
  });

  it("ngAfterViewChecked_addsAClassToACertainExpansionButtonAndToTheWrapperThatHoldsTheProductsContainer_whenAGivenFeaturedProductsMapArrayIsLessThanOrEqualTo4ElementsAndTheBodyElementWidthIsGreaterThan480AndLessThan1024", () => {

    spyOnProperty(document.documentElement, "clientWidth").and.returnValue(1000);

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByType));

    component.ngOnInit();
    component.ngAfterViewChecked();

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector("#salty-pizza-button")?.getAttribute("class"))
      .toContain("remove-expansion-button");
    expect(compiled.querySelector("#wrapper-salty-pizza")?.getAttribute("class"))
      .toContain("auto-height-wrapper");

    expect(compiled.querySelector("#sweet-pizza-button")?.getAttribute("class"))
      .toContain("remove-expansion-button");
    expect(compiled.querySelector("#wrapper-sweet-pizza")?.getAttribute("class"))
      .toContain("auto-height-wrapper");

    expect(compiled.querySelector("#salty-esfiha-button")?.getAttribute("class"))
      .toContain("remove-expansion-button");
    expect(compiled.querySelector("#wrapper-salty-esfiha")?.getAttribute("class"))
      .toContain("auto-height-wrapper");

    expect(compiled.querySelector("#sweet-esfiha-button")?.getAttribute("class"))
      .toContain("remove-expansion-button");
    expect(compiled.querySelector("#wrapper-sweet-esfiha")?.getAttribute("class"))
      .toContain("auto-height-wrapper");

    expect(compiled.querySelector("#drink-button")?.getAttribute("class"))
      .toContain("remove-expansion-button");
    expect(compiled.querySelector("#wrapper-drink")?.getAttribute("class"))
      .toContain("auto-height-wrapper");
  });

  it("getSaltyPizzas_returnsTheArrayOfSaltyPizzasFromTheFeaturedProductsMap_wheneverCalled", () => {

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByType));

    component.ngOnInit();

    expect(component.getSaltyPizzas())
      .not.toBeNull();

    expect(component.getSaltyPizzas())
      .toEqual(productsMapByType.get(Type.SALTY_PIZZA));

    expect(component.getSaltyPizzas()?.length)
      .toEqual(productsMapByType.get(Type.SALTY_PIZZA)?.length);

    expect(component.getSaltyPizzas())
      .toContain((productsMapByType.get(Type.SALTY_PIZZA) as Array<Product>)[0]);
  });

  it("getSweetPizzas_returnsTheArrayOfSweetPizzasFromTheFeaturedProductsMap_wheneverCalled", () => {

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByType));

    component.ngOnInit();

    expect(component.getSweetPizzas())
      .not.toBeNull();

    expect(component.getSweetPizzas())
      .toEqual(productsMapByType.get(Type.SWEET_PIZZA));

    expect(component.getSweetPizzas()?.length)
      .toEqual(productsMapByType.get(Type.SWEET_PIZZA)?.length);

    expect(component.getSweetPizzas())
      .toContain((productsMapByType.get(Type.SWEET_PIZZA) as Array<Product>)[0]);
  });

  it("getSaltyEsfihas_returnsTheArrayOfSaltyEsfihasFromTheFeaturedProductsMap_wheneverCalled", () => {

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByType));

    component.ngOnInit();

    expect(component.getSaltyEsfihas())
      .not.toBeNull();

    expect(component.getSaltyEsfihas())
      .toEqual(productsMapByType.get(Type.SALTY_ESFIHA));

    expect(component.getSaltyEsfihas()?.length)
      .toEqual(productsMapByType.get(Type.SALTY_ESFIHA)?.length);

    expect(component.getSaltyEsfihas())
      .toContain((productsMapByType.get(Type.SALTY_ESFIHA) as Array<Product>)[0]);
  });

  it("getSweetEsfihas_returnsTheArrayOfSweetEsfihasFromTheFeaturedProductsMap_wheneverCalled", () => {

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByType));

    component.ngOnInit();

    expect(component.getSweetEsfihas())
      .not.toBeNull();

    expect(component.getSweetEsfihas())
      .toEqual(productsMapByType.get(Type.SWEET_ESFIHA));

    expect(component.getSweetEsfihas()?.length)
      .toEqual(productsMapByType.get(Type.SWEET_ESFIHA)?.length);

    expect(component.getSweetEsfihas())
      .toContain((productsMapByType.get(Type.SWEET_ESFIHA) as Array<Product>)[0]);
  });

  it("getDrinks_returnsTheArrayOfDrinksFromTheFeaturedProductsMap_wheneverCalled", () => {

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByType));

    component.ngOnInit();

    expect(component.getDrinks())
      .not.toBeNull();

    expect(component.getDrinks())
      .toEqual(productsMapByType.get(Type.DRINK));

    expect(component.getDrinks()?.length)
      .toEqual(productsMapByType.get(Type.DRINK)?.length);

    expect(component.getDrinks())
      .toContain((productsMapByType.get(Type.DRINK) as Array<Product>)[0]);
  });

  it("seeMoreProducts_adds1630PixelsToTheHeightOfTheWrapper_whenScreenWidthIsLessThan481AndWrapHeightIsStillLessThanProductsElement", () => {

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByTypeSeeMoreProducts));

    component.ngOnInit(); 

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    let event = new MouseEvent("click");
    const wrapperElement = compiled.querySelector("#wrapper-sweet-pizza") as HTMLElement;
    const productsElement = compiled.querySelector("#wrapper-sweet-pizza .products") as Element;
    const buttonElement = compiled.querySelector("#sweet-pizza-button") as Element;
    const wrapperHeight = wrapperElement.clientHeight;

    spyOnProperty(document.documentElement, "clientWidth").and.returnValue(480);

    component.seeMoreProducts(event, wrapperElement, productsElement, buttonElement);

    expect(wrapperElement.clientHeight)
      .not.toEqual(wrapperHeight);

    expect(wrapperElement.clientHeight)
      .not.toEqual(productsElement.clientHeight);

    expect(buttonElement?.getAttribute("class"))
      .not.toContain("remove-expansion-button");
  });

  it("seeMoreProducts_makesTheWrapGainAnAutomaticHeightAndAddsAClassToTheExpandButton_whenScreenWidthIsLessThan481AndWrapperHeightBecomesGreaterThanOrEqualToTheHeightOfTheProductsElement", () => {

    spyOnProperty(document.documentElement, "clientWidth").and.returnValue(480);

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByTypeSeeMoreProducts));

    component.ngOnInit();

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    let event = new MouseEvent("click");
    const wrapperElement = compiled.querySelector("#wrapper-salty-pizza") as HTMLElement;
    const productsElement = compiled.querySelector("#wrapper-salty-pizza .products") as Element;
    const buttonElement = compiled.querySelector("#salty-pizza-button") as Element;

    component.seeMoreProducts(event, wrapperElement, productsElement, buttonElement);

    fixture.detectChanges();

    expect(wrapperElement.getAttribute("style"))
      .toEqual("height: auto;");

    expect(wrapperElement.clientHeight)
      .toEqual(productsElement.clientHeight);

    expect(buttonElement?.getAttribute("class"))
      .toContain("remove-expansion-button");
  });

  it("seeMoreProducts_adds650PixelsToTheHeightOfTheWrapper_whenScreenWidthIsGreaterThan480AndLessThan1024AndTheWrapperHeightIsStillLessThanTheProductsElement", () => {

    spyOnProperty(document.documentElement, "clientWidth").and.returnValue(1023);

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByTypeSeeMoreProducts));

    component.ngOnInit();

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    let event = new MouseEvent("click");
    const wrapperElement = compiled.querySelector("#wrapper-sweet-pizza") as HTMLElement;
    const productsElement = compiled.querySelector("#wrapper-sweet-pizza .products") as Element;
    const buttonElement = compiled.querySelector("#sweet-pizza-button") as Element;
    const wrapperHeight = wrapperElement.clientHeight;

    component.seeMoreProducts(event, wrapperElement, productsElement, buttonElement);

    fixture.detectChanges();

    expect(wrapperElement.clientHeight)
      .not.toEqual(wrapperHeight);

    expect(wrapperElement.clientHeight)
      .not.toEqual(productsElement.clientHeight);

    expect(buttonElement?.getAttribute("class"))
      .not.toContain("remove-expansion-button");
  });

  it("seeMoreProducts_makesTheWrapGainAnAutomaticHeightAndAddsAClassToTheExpandButton_whenScreenWidthIsGreaterThan480AndLessThan1024AndWrapperHeightBecomesGreaterThanProductsElementHeight", () => {

    spyOnProperty(document.documentElement, "clientWidth").and.returnValue(1023);

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByTypeSeeMoreProducts));

    component.ngOnInit();

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    let event = new MouseEvent("click");
    const wrapperElement = compiled.querySelector("#wrapper-salty-pizza") as HTMLElement;
    const productsElement = compiled.querySelector("#wrapper-salty-pizza .products") as Element;
    const buttonElement = compiled.querySelector("#salty-pizza-button") as Element;

    component.seeMoreProducts(event, wrapperElement, productsElement, buttonElement);

    fixture.detectChanges();

    expect(wrapperElement.getAttribute("style"))
      .toEqual("height: auto;");

    expect(wrapperElement.clientHeight)
      .toEqual(productsElement.clientHeight);

    expect(buttonElement?.getAttribute("class"))
      .toContain("remove-expansion-button");
  });

  it("seeMoreProducts_adds325PixelsToTheHeightOfTheWrapper_whenScreenWidthIsGreaterThan1024AndWrapHeightIsStillLessThanProductsElement", () => {

    spyOnProperty(document.documentElement, "clientWidth").and.returnValue(1024);

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByTypeSeeMoreProducts));

    component.ngOnInit();

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    let event = new MouseEvent("click");
    const wrapperElement = compiled.querySelector("#wrapper-sweet-pizza") as HTMLElement;
    const productsElement = compiled.querySelector("#wrapper-sweet-pizza .products") as Element;
    const buttonElement = compiled.querySelector("#sweet-pizza-button") as Element;
    const wrapperHeight = wrapperElement.clientHeight;

    component.seeMoreProducts(event, wrapperElement, productsElement, buttonElement);

    fixture.detectChanges();

    expect(wrapperElement.clientHeight)
      .not.toEqual(wrapperHeight);

    expect(wrapperElement.clientHeight)
      .not.toEqual(productsElement.clientHeight);

    expect(buttonElement?.getAttribute("class"))
      .not.toContain("remove-expansion-button");
  });

  it("seeMoreProducts_makesTheWrapTheSameHeightAsTheProductsElementAndAddsAClassToTheExpandButton_whenScreenWidthIsGreaterThan1024AndWrapperHeightBecomesGreaterThanProductsElementHeight", () => {

    spyOnProperty(document.documentElement, "clientWidth").and.returnValue(1024);

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByTypeSeeMoreProducts));

    component.ngOnInit();

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    let event = new MouseEvent("click");
    const wrapperElement = compiled.querySelector("#wrapper-salty-pizza") as HTMLElement;
    const productsElement = compiled.querySelector("#wrapper-salty-pizza .products") as Element;
    const buttonElement = compiled.querySelector("#salty-pizza-button") as Element;

    component.seeMoreProducts(event, wrapperElement, productsElement, buttonElement);

    fixture.detectChanges();

    expect(wrapperElement.getAttribute("style"))
      .toEqual("height: auto;");

    expect(wrapperElement.clientHeight)
      .toEqual(productsElement.clientHeight);

    expect(buttonElement?.getAttribute("class"))
      .toContain("remove-expansion-button");
  });

  it("addProductToCart_callsTheShoppingCartServiceToAddANewProduct_wheneverCalled", () => {

    let event = new MouseEvent("click");

    spyOn(shoppingCartService, "addProduct");

    component.addProductToCart(event, productToAddProductToCart);

    expect(shoppingCartService.addProduct)
      .toHaveBeenCalled();
  });

  it("addProductToCart_callsThePreventDefaultMethod_whenTheEventObjectIsACancelableTouchstart", () => {

    let event = new TouchEvent("touchstart", { cancelable: true });

    spyOn(shoppingCartService, "addProduct");

    component.addProductToCart(event, productToAddProductToCart);

    expect(shoppingCartService.addProduct)
      .toHaveBeenCalled();
  });
});
