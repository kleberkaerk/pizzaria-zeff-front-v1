import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { of } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";

import { HeaderComponent } from "./header.component";
import { ProductRequisitionService } from "../service/product.requisition.service"
import { Router } from "@angular/router";
import { Page } from "../util/page";
import { Product } from "../domain/product";
import { Type } from "../domain/type";
import { PriceRating } from "../domain/price-rating";
import { TouchEventHandlerService } from "../service/touch-event-handler.service";

describe("HeaderComponent", () => {

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let touchEventHandlerService: TouchEventHandlerService;
  let productService: ProductRequisitionService;
  let router: Router;

  let productsSearchTypedValue: Page<Array<Product>>;
  let productsAutocomplete: Array<Product>;
  let productsClearSearchInput: Array<Product>;

  function setProductsSearchTypedValue() {

    let product = new Product(1, "name1", "description1", 1.00, Type.SALTY_ESFIHA, PriceRating.PROMOTION, "salty-esfiha.jpg", true);

    let statePage = {
      empty: true,
      sorted: true,
      unsorted: true
    };

    let pageable = {
      sort: statePage,
      offset: 1,
      pageSize: 1,
      pageNumber: 1,
      unpaged: 1,
      paged: true
    }

    productsSearchTypedValue = new Page<Array<Product>>([product], pageable, 1, 1, true, 1, 1, statePage, true, 1, true);
  }

  function setProductsAutocomplete() {

    productsAutocomplete = [
      new Product(1, "name1", "description1", 1.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true),
      new Product(2, "name2", "description2", 2.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true),
      new Product(3, "name3", "description3", 3.00, Type.SALTY_PIZZA, PriceRating.PROMOTION, "salty-pizza.jpg", true)
    ];
  }

  function setProductsClearSearchInput() {

    productsClearSearchInput = [
      new Product(1, "name1", "description1", 1.00, Type.SWEET_ESFIHA, PriceRating.REGULAR_PRICE, "sweet-esfiha.jpg", true),
      new Product(2, "name2", "description2", 2.00, Type.SWEET_ESFIHA, PriceRating.REGULAR_PRICE, "sweet-esfiha.jpg", true),
      new Product(3, "name3", "description3", 3.00, Type.SWEET_ESFIHA, PriceRating.REGULAR_PRICE, "sweet-esfiha.jpg", true)
    ];
  }

  beforeEach(() => {

    setProductsSearchTypedValue();
    setProductsAutocomplete();
    setProductsClearSearchInput();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    touchEventHandlerService = TestBed.inject(TouchEventHandlerService);
    productService = TestBed.inject(ProductRequisitionService);
    router = TestBed.inject(Router);
  });

  it("should create", () => {

    expect(component)
      .toBeTruthy();
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

  it("scrollPageToTop_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    spyOn(window, "scrollTo");

    component.scrollPageToTop(touchendEvent);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(window.scrollTo)
      .not.toHaveBeenCalled();
  });

  it("scrollPageToTop_scrollTheSiteToTheTop_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalse", () => {

    const mouseEvent = new MouseEvent("click");

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    component.scrollPageToTop(mouseEvent);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(document.documentElement.scrollTop)
      .toEqual(0);

    expect(document.documentElement.scrollLeft)
      .toEqual(0);
  });

  it("scrollPageToTop_scrollTheSiteToTheTopAndNavigateToHomePage_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalseAndTheEventObjectIsOfTypeTouchend", () => {

    const touchEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    const routerSpy = spyOn(router, "navigate");

    component.scrollPageToTop(touchEvent);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(document.documentElement.scrollTop)
      .toEqual(0);

    expect(document.documentElement.scrollLeft)
      .toEqual(0);

    expect(routerSpy.calls.first().args[0])
      .toContain("/");
  });

  it("searchTypedValue_setsTheAutocompleteCurrentFocusPropertyTo-1_whenAutocompleteCurrentFocusIsDifferentFrom-1", () => {

    component.searchInputValue = "  ";
    component.autocompleteCurrentFocus = 1;

    component.searchTypedValue();

    expect(component.autocompleteCurrentFocus)
      .toEqual(-1);
  });

  it("searchTypedValue_clearsTheSearchResultsProperty_whenSearchInputValuePropertyIsEmpty", () => {

    component.searchInputValue = "";

    component.searchTypedValue();

    expect(component.searchResults)
      .toEqual(new Array());
  });

  it("searchTypedValue_callsTheProductServiceAndSetsTheSearchProductsMethodCallbackInTheSearchResultsProperty_whenAPropertyTypedValueHasSomeValue", () => {

    spyOn(productService, "searchProducts").and.returnValue(of(productsSearchTypedValue));

    component.searchInputValue = "name";

    component.searchTypedValue();

    expect(component.searchResults)
      .toEqual(productsSearchTypedValue.content);
  });

  it("autocomplete_doesNotDoAnything_whenKeyboardEventTypeIsDifferentFromArrowDownAndArrowUp", () => {

    component.autocompleteCurrentFocus = 2;

    const keyboardEvent = new KeyboardEvent("keydown", { key: "A" });

    component.autocomplete(keyboardEvent);

    expect(component.autocompleteCurrentFocus)
      .toEqual(2);
  });

  it("autocomplete_doesNotDoAnything_whenTheSearchResultsPropertyHasNoProducts", () => {

    component.autocompleteCurrentFocus = 2;

    const keyboardEvent = new KeyboardEvent("keydown", { key: "ArrowUp" });

    component.autocomplete(keyboardEvent);

    expect(component.autocompleteCurrentFocus)
      .toEqual(2);
  });

  it("autocomplete_addsOneMoreToTheAutocompleteCurrentFocusPropertyValueAndPutsTheNameOfOneOfTheProductsFromTheSearchResultsPropertyInTheSearchInputValueProperty_whenKeyPressedIsArrowDownAndTheValueOfTheAutocompleteCurrentFocusPropertyIisGreaterThan-1AndLessThanThePenultimateProductIndexOfTheSearchResultsProperty", () => {

    component.searchResults = productsAutocomplete;

    const keyboardEvent = new KeyboardEvent("keydown", { key: "ArrowDown" });

    component.autocomplete(keyboardEvent);

    expect(component.autocompleteCurrentFocus)
      .toEqual(0);

    expect(component.searchInputValue)
      .toEqual(productsAutocomplete[0].getName)
  });

  it("autocomplete_setsTheAutocompleteCurrentFocusPropertyTo-1AndSetsTheValueOfTheEnteredValuePropertyToTheSearchInputValueProperty_whenKeyPressedIsArrowDownAndTheValueOfTheAutocompleteCurrentFocusPropertyIsGreaterThanTheSecondToLastProductIndexOfTheSearchResultProperty", () => {

    component.searchInputValue = "name";
    component.searchTypedValue();
    component.searchInputValue = "name2";
    component.searchResults = productsAutocomplete;
    component.autocompleteCurrentFocus = 2;

    const keyboardEvent = new KeyboardEvent("keydown", { key: "ArrowDown" });

    component.autocomplete(keyboardEvent);

    expect(component.autocompleteCurrentFocus)
      .toEqual(-1);

    expect(component.searchInputValue)
      .toEqual("name");
  });

  it("autocomplete_decreasesANumberOfTheAutocompleteCurrentFocusPropertyAndPutsTheNameOfOneOfTheProductsFromTheSearchResultsPropertyInTheSearchInputValueProperty_whenKeyPressedIsArrowUpAndTheValueOfPropertyAutocompleteCurrentFocusIsGreaterThanOrEqualTo0", () => {

    component.autocompleteCurrentFocus = 1;
    component.searchResults = productsAutocomplete;

    const keyboardEvent = new KeyboardEvent("keydown", { key: "ArrowUp" });

    component.autocomplete(keyboardEvent);

    expect(component.autocompleteCurrentFocus)
      .toEqual(0);

    expect(component.searchInputValue)
      .toEqual(productsAutocomplete[0].getName);
  });

  it("autocomplete_assignsLastProductIndexFromSearchResultsPropertyToAutocompleteCurrentFocusPropertyAndPutsTheNameOfOneOfTheProductsFromTheSearchResultsPropertyInTheSearchInputValueProperty_whenKeyPressedIsArrowUpAndTheValueOfTheAutocompleteCurrentFocusPropertyIsLessThan0", () => {

    component.searchResults = productsAutocomplete;

    const keyboardEvent = new KeyboardEvent("keydown", { key: "ArrowUp" });

    component.autocomplete(keyboardEvent);

    expect(component.autocompleteCurrentFocus)
      .toEqual(2);

    expect(component.searchInputValue)
      .toEqual(productsAutocomplete[2].getName);
  });

  it("setCurrentFocusOfAutocompleteWithMouse_setsTheParameterValueInTheAutocompleteCurrentFocusProperty_wheneverCalled", () => {

    component.setCurrentFocusOfAutocompleteWithMouse(2);

    expect(component.autocompleteCurrentFocus)
      .toEqual(2);
  });

  it("search_doesNotDoAnything_whenPropertySearchInputValueIsEmpty", () => {

    spyOn(router, "navigate");

    const searchInput = document.querySelector(".search-input") as HTMLInputElement;

    component.search(searchInput);

    expect(router.navigate)
      .not.toHaveBeenCalled();
  });

  it("search_triggersAnClickEventAttachedToTheHtmlElementThatSetsTheActivateMobileSearchPropertyToFalse_ whenPropertyActivateMobileSearchIsTrue", () => {

    const event = new MouseEvent("click");
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector(".search-form") as Element;
    const input = compiled.querySelector(".search-input") as HTMLInputElement;

    component.mobileSearchClickHandler(event, form, input);

    component.searchInputValue = "name";

    const routerSpy = spyOn(router, "navigate");

    component.search(input);

    fixture.detectChanges();

    expect(component.activateMobileSearch)
      .toBeFalse();

    expect(input.getAttribute("class"))
      .not.toContain("focusable-search-input");

    expect(form.hasAttribute("data-to-show"))
      .toBeFalse();

    expect(routerSpy.calls.first().args[0])
      .toContain("/search");

    expect(routerSpy.calls.first().args[1]?.queryParams)
      .toEqual({ value: "name" });
  });

  it("search_navigatesToTheSearchRouteAndPutsTheValueOfTheSearchInputValuePropertyOnValueQueryParam_whenPropertySearchInputValueIsNotEmpty", () => {

    const routerSpy = spyOn(router, "navigate");

    const searchInput = document.querySelector(".search-input") as HTMLInputElement;
    component.searchInputValue = "name";

    component.search(searchInput);

    expect(routerSpy.calls.first().args[0])
      .toContain("/search");

    expect(routerSpy.calls.first().args[1]?.queryParams)
      .toEqual({ value: "name" });
  });

  it("setInitialClickPoint_callsTheStopPropagationAndPreventDefaultMethodOfTheEventObjectAndInitializeInitialClickPropertyWithEventObject_wheneverCalled", () => {

    const mousedownEvent = new MouseEvent("mousedown");

    spyOn(mousedownEvent, "stopPropagation");
    spyOn(mousedownEvent, "preventDefault");

    const clientXSpy = spyOnProperty(mousedownEvent, "clientX");
    const clientYSpy = spyOnProperty(mousedownEvent, "clientY");

    component.setInitialClickPoint(mousedownEvent);

    expect(mousedownEvent.stopPropagation)
      .toHaveBeenCalled();

    expect(mousedownEvent.preventDefault)
      .toHaveBeenCalled();

    expect(clientXSpy.calls.count())
      .toEqual(1);

    expect(clientYSpy.calls.count())
      .toEqual(1);
  });

  it("clickSearch_callPreventDefaultFunctionFromEventObjectAndDoesNotDoAnything_whenEventIsMouseupTypeAndItIsAMovingClickMethodReturnsTrue", () => {

    const mousedownEvent = new MouseEvent("mousedown");
    spyOnProperty(mousedownEvent, "clientX").and.returnValue(1);
    spyOnProperty(mousedownEvent, "clientY").and.returnValue(1);

    component.setInitialClickPoint(mousedownEvent);

    const mouseupEvent = new MouseEvent("mouseup");

    const searchInput = document.querySelector(".search-input") as HTMLInputElement;

    spyOn(router, "navigate");
    spyOn(searchInput, "blur");

    component.clickSearch(mouseupEvent, "name", searchInput);

    expect(component.searchInputValue)
      .toEqual("");

    expect(router.navigate)
      .not.toHaveBeenCalled();

    expect(searchInput.blur)
      .not.toHaveBeenCalled();
  });

  it("clickSearch_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenEventIsNotMouseupTypeAndItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    const searchInput = document.querySelector(".search-input") as HTMLInputElement;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    spyOn(router, "navigate");
    spyOn(searchInput, "blur");

    component.clickSearch(touchendEvent, "name", searchInput);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(component.searchInputValue)
      .toEqual("");

    expect(router.navigate)
      .not.toHaveBeenCalled();

    expect(searchInput.blur)
      .not.toHaveBeenCalled();
  });

  it("clickSearch_setsTheValueOfTheProductNameParameterInTheSearchInputValuePropertyAndNavigatesToTheSearchRouteAndPutsTheValueOfTheProductNameParameterOnValueQueryParamAndCallBlurFunctionOfSearchInputParameter_whenPreventDefaultFunctionFromEventObjectOrIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalse", () => {

    const mousedownEvent = new MouseEvent("mousedown");
    spyOnProperty(mousedownEvent, "clientX").and.returnValue(0);
    spyOnProperty(mousedownEvent, "clientY").and.returnValue(0);

    component.setInitialClickPoint(mousedownEvent);

    const mouseupEvent = new MouseEvent("mouseup");

    const searchInput = document.querySelector(".search-input") as HTMLInputElement;

    const routerSpy = spyOn(router, "navigate");
    spyOn(searchInput, "blur");

    component.clickSearch(mouseupEvent, "name", searchInput);

    expect(component.searchInputValue)
      .toEqual("name");

    expect(routerSpy.calls.first().args[0])
      .toContain("/search");

    expect(routerSpy.calls.first().args[1]?.queryParams)
      .toEqual({ value: "name" });

    expect(searchInput.blur)
      .toHaveBeenCalled();
  });

  it("clickSearch_setsTheValueOfTheProductNameParameterInTheSearchInputValuePropertyAndNavigatesToTheSearchRouteAndPutsTheValueOfTheProductNameParameterOnValueQueryParamAndCallBlurFunctionOfSearchInputParameterAndTriggersAClickEventOnTheHTMLTag_whenPreventDefaultFunctionFromEventObjectOrIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalseAndEventIsOfTypeTouchend", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    const searchInput = document.querySelector(".search-input") as HTMLInputElement;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    const routerSpy = spyOn(router, "navigate");
    spyOn(searchInput, "blur");
    spyOn(document.documentElement, "click");

    component.clickSearch(touchendEvent, "name", searchInput);

    expect(component.searchInputValue)
      .toEqual("name");

    expect(routerSpy.calls.first().args[0])
      .toContain("/search");

    expect(routerSpy.calls.first().args[1]?.queryParams)
      .toEqual({ value: "name" });

    expect(searchInput.blur)
      .toHaveBeenCalled();

    expect(document.documentElement.click)
      .toHaveBeenCalled();
  });

  it("clearSearchInput_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const event = new TouchEvent("touchend", { cancelable: true });
    const compiled = fixture.nativeElement as HTMLElement;
    const searchInput = compiled.querySelector(".search-input") as HTMLInputElement;

    component.searchInputValue = "test";
    component.autocompleteCurrentFocus = 2;
    component.searchResults = productsClearSearchInput;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    component.clearSearchInput(event, searchInput);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(component.searchInputValue)
      .toEqual("test");

    expect(component.autocompleteCurrentFocus)
      .toEqual(2);

    expect(component.searchResults)
      .toEqual(productsClearSearchInput);
  });

  it("clearSearchInput_clearsTheSearchResultsPropertyAndTheValueOfTheSearchInputValuePropertyAndSetsTheAutocompleteCurrentFocusPropertyTo-1_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalse", () => {

    const event = new MouseEvent("click");
    const compiled = fixture.nativeElement as HTMLElement;
    const searchInput = compiled.querySelector(".search-input") as HTMLInputElement;

    component.searchInputValue = "test";
    component.autocompleteCurrentFocus = 2;
    component.searchResults = productsClearSearchInput;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    spyOn(searchInput, "focus");

    component.clearSearchInput(event, searchInput);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(component.searchInputValue)
      .toEqual("");

    expect(component.autocompleteCurrentFocus)
      .toEqual(-1);

    expect(component.searchResults)
      .toEqual(new Array());

    expect(searchInput.focus)
      .toHaveBeenCalled();
  });

  it("handlerClickOutside_triggersAClickOnTheHtmlElement_whenFocusElementParameterHasDataToShowAtribute", () => {

    const event = new MouseEvent("click");
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector(".search-form") as Element;
    const input = compiled.querySelector(".search-input") as HTMLInputElement;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    component.mobileSearchClickHandler(event, form, input);
    component.mobileSearchClickHandler(event, form, input);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(component.activateMobileSearch)
      .toBeFalse();

    expect(form.hasAttribute("data-to-show"))
      .toBeFalse();

    expect(input.getAttribute("class"))
      .not.toContain("focusable-search-input");

  });

  it("mobileSearchClickHandler_triggersAClickOnTheHtmlElementAndCallsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenActivateMobileMenuPropertyOrActivateAccountOptionsPropertyIsTrueAndItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    component.activateMobileMenu = true;

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector(".search-form") as Element;
    const input = compiled.querySelector(".search-input") as HTMLInputElement;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");

    spyOn(document.documentElement, "click");

    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    component.mobileSearchClickHandler(touchendEvent, form, input);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(document.documentElement.click)
      .toHaveBeenCalled();
  });

  it("mobileSearchClickHandler_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector(".search-form") as Element;
    const input = compiled.querySelector(".search-input") as HTMLInputElement;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    component.mobileSearchClickHandler(touchendEvent, form, input);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(component.activateMobileSearch)
      .toBeFalse();

    expect(form.hasAttribute("data-to-show"))
      .toBeFalse();

    expect(input.getAttribute("class"))
      .not.toContain("focusable-search-input");
  });

  it("mobileSearchClickHandler_updateActivateMobileSearchToTrueAndAddAAttributeOnElementFormAndAddAClassToTheInputElement_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalseAndFormDoesNotHaveAttributeDataToShow", () => {

    const event = new MouseEvent("click");
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector(".search-form") as Element;
    const input = compiled.querySelector(".search-input") as HTMLInputElement;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    component.mobileSearchClickHandler(event, form, input);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(component.activateMobileSearch)
      .toBeTrue();

    expect(form.hasAttribute("data-to-show"))
      .toBeTrue();

    expect(input.getAttribute("class"))
      .toContain("focusable-search-input");
  });

  it("accountClickHandler_triggersAClickOnTheHtmlElementAndCallsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenActivateMobileMenuPropertyIsTrueAndItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    component.logged = true;
    component.activateMobileMenu = true;
    fixture.autoDetectChanges();

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });
    const compiled = fixture.nativeElement as HTMLElement;
    const accountOptions = compiled.querySelector(".account-options") as Element;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");

    spyOn(document.documentElement, "click");

    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    component.accountClickHandler(touchendEvent, accountOptions);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(document.documentElement.click)
      .toHaveBeenCalled();

    expect(component.activateAccountOptions)
      .toBeFalse();

    expect(accountOptions?.hasAttribute("data-to-show"))
      .toBeFalse();
  });

  it("accountClickHandler_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    component.logged = true;
    fixture.autoDetectChanges();

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });
    const compiled = fixture.nativeElement as HTMLElement;
    const accountOptions = compiled.querySelector(".account-options") as Element;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    component.accountClickHandler(touchendEvent, accountOptions);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(component.activateAccountOptions)
      .toBeFalse();

    expect(accountOptions?.hasAttribute("data-to-show"))
      .toBeFalse();
  });

  it("accountClickHandler_updateActivateAccountOptionsToTrueAndAddAAttributeOnElementAccountOptions_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalseAndAccountOptionsElementDoesNotHaveAttributeDataToShow", () => {

    component.logged = true;
    fixture.autoDetectChanges();

    const event = new MouseEvent("click");
    const compiled = fixture.nativeElement as HTMLElement;
    const accountOptions = compiled.querySelector(".account-options") as Element;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    component.accountClickHandler(event, accountOptions);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(component.activateAccountOptions)
      .toBeTrue();

    expect(accountOptions?.hasAttribute("data-to-show"))
      .toBeTrue();
  });

  // ----------------------------------------------------------------------

  it("accountOptionAccessHandler_", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    component.accountOptionAccessHandler(touchendEvent, "SALTY_ESFIHA");

    expect(true)
      .toBeTrue();
  });

  it("signOutOfAccount_", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    component.signOutOfAccount(touchendEvent);

    expect(true)
      .toBeTrue();
  });

  // ----------------------------------------------------------------------

  it("handlerClickMobileMenu_triggersAClickOnTheHtmlElementAndCallsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenActivateAccountOptionsPropertyIsTrueAndItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    component.activateAccountOptions = true;

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });
    const compiled = fixture.nativeElement as HTMLElement;
    const menu = compiled.querySelector(".menu") as Element;

    spyOn(document.documentElement, "click");

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    component.handlerClickMobileMenu(touchendEvent, menu);

    expect(document.documentElement.click)
      .toHaveBeenCalled();

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(component.activateMobileMenu)
      .toBeFalse();

    expect(menu.hasAttribute("data-to-show"))
      .toBeFalse();
  });

  it("handlerClickMobileMenu_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });
    const compiled = fixture.nativeElement as HTMLElement;
    const menu = compiled.querySelector(".menu") as Element;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    component.handlerClickMobileMenu(touchendEvent, menu);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(component.activateMobileMenu)
      .toBeFalse();

    expect(menu.hasAttribute("data-to-show"))
      .toBeFalse();
  });

  it("handlerClickMobileMenu_updateActivateMobileMenuToTrueAndAddAAttributeOnMenuElement_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalseAndMenuElementDoesNotHaveAttributeDataToShow", () => {

    const event = new MouseEvent("click");
    const compiled = fixture.nativeElement as HTMLElement;
    const mobileMenu = compiled.querySelector(".menu") as Element;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    component.handlerClickMobileMenu(event, mobileMenu);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(component.activateMobileMenu)
      .toBeTrue();

    expect(mobileMenu.hasAttribute("data-to-show"))
      .toBeTrue();
  });

  it("menuAccessHandler_callsTheStopPropagationOfTheEventObjectAndDoesNothing_whenActivateMobileMenuPropertyIsFalse", () => {

    const event = new MouseEvent("click");

    component.activateMobileMenu = false;

    spyOn(event, "stopPropagation");

    spyOn(document.documentElement, "click");

    component.menuAccessHandler(event, "DRINK");

    expect(event.stopPropagation)
      .toHaveBeenCalled();

    expect(document.documentElement.click)
      .not.toHaveBeenCalled();
  });

  it("menuAccessHandler_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenActivateMobileMenuPropertyIsTrueAndItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    component.activateMobileMenu = true;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    spyOn(document.documentElement, "click");

    component.menuAccessHandler(touchendEvent, "SALTY_PIZZA");

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(document.documentElement.click)
      .not.toHaveBeenCalled();
  });

  it("menuAccessHandler_triggersAClickOnTheHtmlElement_whenActivateMobileMenuPropertyIsTrueAndItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalseAndEventObjectIsNotTouchendType", () => {

    const event = new MouseEvent("click");

    component.activateMobileMenu = true;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    spyOn(document.documentElement, "click");

    component.menuAccessHandler(event, "SWEET_PIZZA");

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(document.documentElement.click)
      .toHaveBeenCalled();
  });

  it("menuAccessHandler_navigateToMenuRouteAndTriggersAClickOnTheHtmlElement_whenActivateMobileMenuPropertyIsTrueAndItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalseAndEventObjectIsTouchendType", () => {

    const touchendEvent = new TouchEvent("touchend", { cancelable: true });

    component.activateMobileMenu = true;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    const routerSpy = spyOn(router, "navigate");

    spyOn(document.documentElement, "click");

    component.menuAccessHandler(touchendEvent, "SWEET_ESFIHA");

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(routerSpy.calls.first().args[0][0])
      .toEqual("/menu");

    expect(document.documentElement.click)
      .toHaveBeenCalled();
  });
});
