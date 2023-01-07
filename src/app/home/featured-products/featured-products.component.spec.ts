import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderComponent } from '../slider/slider.component';
import { FeaturedProductsComponent } from './featured-products.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { ProductService } from '../service/product.service';
import { ProductDTO } from 'src/app/shared/dto/product-dto';
import { Type } from 'src/app/shared/domain/type'
import { PriceRating } from 'src/app/shared/domain/price-rating'
import { ProductsMapByTypeDTO } from 'src/app/shared/dto/product-by-type-map-dto';
import { of } from 'rxjs';
import { Product } from 'src/app/shared/domain/product';
import { Mapper } from 'src/app/shared/util/mapper';
import { ShoppingCartService } from 'src/app/shared/service/shopping-cart.service';

describe('FeaturedProductsComponent', () => {

  let component: FeaturedProductsComponent;
  let fixture: ComponentFixture<FeaturedProductsComponent>;
  let productService: ProductService;
  let shoppingCartService: ShoppingCartService;

  let saltyPizzas: Array<ProductDTO>;
  let sweetPizzas: Array<ProductDTO>;
  let saltyEsfihas: Array<ProductDTO>;
  let sweetEsfihas: Array<ProductDTO>;
  let drinks: Array<ProductDTO>;
  let productsMapByTypeDTOMock: ProductsMapByTypeDTO;

  let saltyPizzasToComparison: Array<Product>;
  let sweetPizzasToComparison: Array<Product>;
  let saltyEsfihasToComparison: Array<Product>;
  let sweetEsfihasToComparison: Array<Product>;
  let drinksToComparison: Array<Product>;

  let saltyPizasToSeeMoreProducts: Array<ProductDTO>;
  let sweetPizasToSeeMoreProducts: Array<ProductDTO>;

  let productToAddProductToCart: Product;

  function setSaltyPizzas() {

    saltyPizzas = [
      new ProductDTO(1, "name1", "description1", 10.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true),
      new ProductDTO(2, "name2", "description2", 20.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true),
      new ProductDTO(3, "name3", "description3", 30.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true)
    ]
  }

  function setSweetPizzas() {

    sweetPizzas = [
      new ProductDTO(4, "name4", "description4", 40.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new ProductDTO(5, "name5", "description5", 50.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new ProductDTO(6, "name6", "description6", 60.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true)
    ]
  }

  function setSaltyEsfihas() {

    saltyEsfihas = [
      new ProductDTO(7, "name7", "description7", 70.00, Type.SALTY_ESFIHA, PriceRating.PROMOTION, "salty-esfiha.jpg", true),
      new ProductDTO(8, "name8", "description8", 80.00, Type.SALTY_ESFIHA, PriceRating.PROMOTION, "salty-esfiha.jpg", true),
      new ProductDTO(9, "name9", "description9", 90.00, Type.SALTY_ESFIHA, PriceRating.PROMOTION, "salty-esfiha.jpg", true)
    ];
  }

  function setSweetEsfihas() {

    sweetEsfihas = [
      new ProductDTO(10, "name10", "description10", 100.00, Type.SWEET_ESFIHA, PriceRating.PROMOTION, "sweet-esfiha.jpg", true),
      new ProductDTO(11, "name11", "description11", 110.00, Type.SWEET_ESFIHA, PriceRating.PROMOTION, "sweet-esfiha.jpg", true)
    ];
  }

  function setDrinks() {
    drinks = [
      new ProductDTO(12, "name12", "description12", 120.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "soda.jpg", true),
      new ProductDTO(13, "name13", "description13", 130.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "soda.jpg", true),
      new ProductDTO(14, "name14", "description14", 140.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "soda.jpg", true)
    ]
  }

  function setProductsMapByTypeDTOMock() {

    productsMapByTypeDTOMock = new ProductsMapByTypeDTO(
      saltyPizzas,
      sweetPizzas,
      saltyEsfihas,
      sweetEsfihas,
      drinks
    );
  }

  function setSaltyPizzasToComparison() {

    saltyPizzasToComparison = saltyPizzas.map(saltyPizza => Mapper.fromProductDTOToProduct(saltyPizza));
  }

  function setSweetPizzasToComparison() {

    sweetPizzasToComparison = sweetPizzas.map(sweetPizza => Mapper.fromProductDTOToProduct(sweetPizza));
  }

  function setSaltyEsfihasToComparison() {

    saltyEsfihasToComparison = saltyEsfihas.map(saltyEsfiha => Mapper.fromProductDTOToProduct(saltyEsfiha));
  }

  function setSweetEsfihasToComparison() {

    sweetEsfihasToComparison = sweetEsfihas.map(sweetEsfiha => Mapper.fromProductDTOToProduct(sweetEsfiha));
  }

  function setDrinksToComparison() {

    drinksToComparison = drinks.map(drink => Mapper.fromProductDTOToProduct(drink));
  }

  function setSaltyPizasToSeeMoreProducts() {

    saltyPizasToSeeMoreProducts = [
      new ProductDTO(1, "name1", "description1", 10.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true),
      new ProductDTO(2, "name2", "description2", 20.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true),
      new ProductDTO(3, "name3", "description3", 30.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true),
      new ProductDTO(4, "name4", "description4", 40.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true),
      new ProductDTO(5, "name5", "description5", 50.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true),
      new ProductDTO(6, "name6", "description6", 60.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true)
    ]
  }

  function setSweetPizasToSeeMoreProducts() {

    sweetPizasToSeeMoreProducts = [
      new ProductDTO(7, "name7", "description7", 70.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new ProductDTO(8, "name8", "description8", 80.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new ProductDTO(9, "name9", "description9", 90.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new ProductDTO(10, "name10", "description10", 100.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new ProductDTO(11, "name11", "description11", 110.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new ProductDTO(12, "name12", "description12", 120.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new ProductDTO(13, "name13", "description13", 130.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new ProductDTO(14, "name14", "description14", 140.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new ProductDTO(15, "name15", "description15", 150.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new ProductDTO(16, "name16", "description16", 160.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new ProductDTO(17, "name17", "description17", 170.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new ProductDTO(18, "name18", "description18", 180.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new ProductDTO(19, "name19", "description19", 190.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new ProductDTO(20, "name20", "description20", 200.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new ProductDTO(21, "name21", "description21", 210.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true),
      new ProductDTO(22, "name22", "description22", 220.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "sweet-pizza.jpg", true)
    ]
  }

  function setProductToAddProductToCart() {

    productToAddProductToCart = new Product(1, "name1", "description1", 10.00, Type.DRINK, PriceRating.REGULAR_PRICE, "salty-pizza.jpg", true);
  }

  beforeEach(() => {

    setSaltyPizzas();
    setSweetPizzas();
    setSaltyEsfihas();
    setSweetEsfihas();
    setDrinks();
    setProductsMapByTypeDTOMock();
    setSaltyPizzasToComparison();
    setSweetPizzasToComparison();
    setSaltyEsfihasToComparison();
    setSweetEsfihasToComparison();
    setDrinksToComparison();
    setSaltyPizasToSeeMoreProducts();
    setSweetPizasToSeeMoreProducts();
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

  it("ngOnInit_callsAServiceMethodAndAssignsItsReturnToTheFeaturedProductsAttribute_wheneverCalled", () => {

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByTypeDTOMock));

    component.ngOnInit();

    expect(component.getSaltyEsfihas())
      .not.toBeNull();

    expect(component.getSaltyEsfihas())
      .toEqual(saltyEsfihasToComparison);
  });

  it("ngAfterViewChecked_addsAClassToACertainExpansionButtonAndToTheWrapperThatHoldsTheProductsContainer_whenAGivenFeaturedProductsMapArrayIsLessThanOrEqualTo5ElementsAndTheBodyElementWidthIsLessThan481OrGreaterThan1023", () => {

    spyOnProperty(document.documentElement, "clientWidth").and.returnValue(1024);

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByTypeDTOMock));

    component.ngOnInit();
    fixture.detectChanges();

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
      .and.returnValue(of(productsMapByTypeDTOMock));

    component.ngOnInit();
    fixture.detectChanges();

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

  it("ngAfterViewChecked_doesNotDoAnything_whenCalledMoreThan4Times", () => {

    for (let i = 0; i < 4; i++) {

      component.ngAfterViewChecked();
    }

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByTypeDTOMock));

    component.ngOnInit();

    fixture.detectChanges();

    const body = document.querySelector("body") as HTMLElement;
    body.style.width = "1920px";

    component.ngAfterViewChecked();

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

  it("getSaltyPizzas_returnsTheArrayOfSaltyPizzasFromTheFeaturedProductsMap_wheneverCalled", () => {

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByTypeDTOMock));

    component.ngOnInit();

    expect(component.getSaltyPizzas())
      .not.toBeNull();

    expect(component.getSaltyPizzas())
      .toEqual(saltyPizzasToComparison);

    expect(component.getSaltyPizzas()?.length)
      .toEqual(saltyPizzasToComparison.length);

    expect(component.getSaltyPizzas())
      .toContain(saltyPizzasToComparison[0]);
  });

  it("getSweetPizzas_returnsTheArrayOfSweetPizzasFromTheFeaturedProductsMap_wheneverCalled", () => {

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByTypeDTOMock));

    component.ngOnInit();

    expect(component.getSweetPizzas())
      .not.toBeNull();

    expect(component.getSweetPizzas())
      .toEqual(sweetPizzasToComparison);

    expect(component.getSweetPizzas()?.length)
      .toEqual(sweetPizzasToComparison.length);

    expect(component.getSweetPizzas())
      .toContain(sweetPizzasToComparison[0]);
  });

  it("getSaltyEsfihas_returnsTheArrayOfSaltyEsfihasFromTheFeaturedProductsMap_wheneverCalled", () => {

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByTypeDTOMock));

    component.ngOnInit();

    expect(component.getSaltyEsfihas())
      .not.toBeNull();

    expect(component.getSaltyEsfihas())
      .toEqual(saltyEsfihasToComparison);

    expect(component.getSaltyEsfihas()?.length)
      .toEqual(saltyEsfihasToComparison.length);

    expect(component.getSaltyEsfihas())
      .toContain(saltyEsfihasToComparison[0]);
  });

  it("getSweetEsfihas_returnsTheArrayOfSweetEsfihasFromTheFeaturedProductsMap_wheneverCalled", () => {

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByTypeDTOMock));

    component.ngOnInit();

    expect(component.getSweetEsfihas())
      .not.toBeNull();

    expect(component.getSweetEsfihas())
      .toEqual(sweetEsfihasToComparison);

    expect(component.getSweetEsfihas()?.length)
      .toEqual(sweetEsfihasToComparison.length);

    expect(component.getSweetEsfihas())
      .toContain(sweetEsfihasToComparison[0]);
  });

  it("getDrinks_returnsTheArrayOfDrinksFromTheFeaturedProductsMap_wheneverCalled", () => {

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(productsMapByTypeDTOMock));

    component.ngOnInit();

    expect(component.getDrinks())
      .not.toBeNull();

    expect(component.getDrinks())
      .toEqual(drinksToComparison);

    expect(component.getDrinks()?.length)
      .toEqual(drinksToComparison.length);

    expect(component.getDrinks())
      .toContain(drinksToComparison[0]);
  });

  it("seeMoreProducts_adds1630PixelsToTheHeightOfTheWrapper_whenScreenWidthIsLessThan481AndWrapHeightIsStillLessThanProductsElement", () => { 

    spyOnProperty(document.documentElement, "clientWidth").and.returnValue(480);

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(new ProductsMapByTypeDTO(saltyPizasToSeeMoreProducts, sweetPizasToSeeMoreProducts, [], [], [])));

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

  it("seeMoreProducts_makesTheWrapGainAnAutomaticHeightAndAddsAClassToTheExpandButton_whenScreenWidthIsLessThan481AndWrapperHeightBecomesGreaterThanOrEqualToTheHeightOfTheProductsElement", () => {

    spyOnProperty(document.documentElement, "clientWidth").and.returnValue(480);

    spyOn(productService, "findProductsInPromotion")
      .and.returnValue(of(new ProductsMapByTypeDTO(saltyPizasToSeeMoreProducts, [], [], [], [])));

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
      .and.returnValue(of(new ProductsMapByTypeDTO(saltyPizasToSeeMoreProducts, sweetPizasToSeeMoreProducts, [], [], [])));

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
      .and.returnValue(of(new ProductsMapByTypeDTO(saltyPizasToSeeMoreProducts, [], [], [], [])));

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
      .and.returnValue(of(new ProductsMapByTypeDTO(saltyPizasToSeeMoreProducts, sweetPizasToSeeMoreProducts, [], [], [])));

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
      .and.returnValue(of(new ProductsMapByTypeDTO(saltyPizasToSeeMoreProducts, [], [], [], [])));

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
