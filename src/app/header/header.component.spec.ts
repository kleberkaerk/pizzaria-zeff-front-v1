import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { ProductService } from '../service/product.service'
import { Router } from '@angular/router';
import { Page } from '../util/page';
import { Product } from '../domain/product';
import { Type } from '../domain/type';
import { PriceRating } from '../domain/price-rating';

describe('HeaderComponent', () => {

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let productService: ProductService;
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

    productService = TestBed.inject(ProductService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();
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

  it("clickSearch_setsTheValueOfTheProductNameParameterInTheSearchInputValuePropertyAndNavigatesToTheSearchRouteAndPutsTheValueOfTheProductNameParameterOnValueQueryParam_wheneverCalled", () => {

    const routerSpy = spyOn(router, "navigate");

    component.clickSearch("name");

    expect(component.searchInputValue)
      .toEqual("name");

    expect(routerSpy.calls.first().args[0])
      .toContain("/search");

    expect(routerSpy.calls.first().args[1]?.queryParams)
      .toEqual({ value: "name" });
  });

  it("clearSearchInput_clearsTheSearchResultsPropertyAndTheValueOfTheSearchInputValuePropertyAndSetsTheAutocompleteCurrentFocusPropertyTo-1_wheneverCalled", () => {

    component.searchInputValue = "test";
    component.autocompleteCurrentFocus = 2;
    component.searchResults = productsClearSearchInput;
    const event = new MouseEvent("click");
    const compiled = fixture.nativeElement as HTMLElement;
    const searchInput = compiled.querySelector(".search-input") as HTMLInputElement;

    component.clearSearchInput(event, searchInput);

    expect(component.searchInputValue)
      .toEqual("");

    expect(component.autocompleteCurrentFocus)
      .toEqual(-1);

    expect(component.searchResults)
      .toEqual(new Array());
  });

  it("exitMobileSearch_triggersTheClickEventHandlerThatWasDefinedInTheHtmlTag_wheneverCalled", () => {

    const event = new MouseEvent('click');
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('.search-form') as Element;
    const input = compiled.querySelector('.search-input') as HTMLElement;

    expect(component.activateMobileSearch)
      .toBeFalse();

    component.searchClickHandler(event, form, input as HTMLInputElement);
    component.exitMobileSearch(event);

    expect(form.hasAttribute("data-to-show"))
      .not.toBeTrue();

    expect(component.activateMobileSearch)
      .not.toBeTrue();

    expect(input.getAttribute("class"))
      .not.toContain("focusable-search-input");

    expect(input.getAttribute("class"))
      .not.toContain("focusable-search-input");
  });

  it('accountClickHandler_updateActivateAccountOptionsToTrueAndAddAAttributeOnElementAccountOptions_whenAccountOptionsDoesNotHaveAttributeDataToShow', () => {

    component.logged = true;
    fixture.autoDetectChanges();

    const event = new MouseEvent('click');
    const compiled = fixture.nativeElement as HTMLElement;
    const accountOptions = compiled.querySelector('.account-options') as Element;

    expect(component.activateAccountOptions)
      .toBeFalse();

    component.accountClickHandler(event, accountOptions);

    expect(component.activateAccountOptions)
      .toBeTrue();

    expect(accountOptions?.hasAttribute('data-to-show'))
      .toBeTrue();
  });

  it('accountClickHandler_notUpdatedActivateAccountOptionsToTrue_whenAccountOptionsHaveAttributeDataToShow', () => {

    const event = new MouseEvent('click');
    const compiled = fixture.nativeElement as HTMLElement;
    const accountOptions = compiled.querySelector('.account-options');

    accountOptions?.setAttribute('data-to-show', '');

    expect(component.activateAccountOptions)
      .toBeFalse();

    if (accountOptions) {
      component.accountClickHandler(event, accountOptions);
    }

    expect(component.activateAccountOptions)
      .toBeFalse();
  });

  it('handlerClickMobileMenu_updateActivateMobileMenuToTrueAndAddAAttributeOnElementMobileMenu_whenMenuDoesNotHaveAttributeDataToShow', () => {

    const event = new MouseEvent('click');
    const compiled = fixture.nativeElement as HTMLElement;
    const mobileMenu = compiled.querySelector('.mobile-menu-options') as Element;

    expect(component.activateMobileMenu)
      .toBeFalse();

    component.handlerClickMobileMenu(event, mobileMenu);

    expect(mobileMenu.hasAttribute("data-to-show"))
      .toBeTrue();

    expect(component.activateMobileMenu)
      .toBeTrue();
  });

  it('handlerClickMobileMenu_notUpdatedMenuToTrue_whenMenuHaveAttributeDataToShow', () => {

    const event = new MouseEvent('click');
    const compiled = fixture.nativeElement as HTMLElement;
    const menu = compiled.querySelector('.mobile-menu-options');

    menu?.setAttribute('data-to-show', '');

    expect(component.activateMobileMenu)
      .toBeFalse();

    if (menu) {
      component.handlerClickMobileMenu(event, menu);
    }

    expect(component.activateMobileMenu)
      .toBeFalse();
  });

  it('handlerClickMobileMenu_doesNothingAnything_whenActivateAccountOptionsIsTrue', () => {

    const event = new MouseEvent('click');
    const compiled = fixture.nativeElement as HTMLElement;
    const menu = compiled.querySelector('.mobile-menu-options');

    component.activateAccountOptions = true;

    expect(component.activateMobileMenu)
      .toBeFalse();

    if (menu) {
      component.handlerClickMobileMenu(event, menu);
    }

    expect(component.activateMobileMenu)
      .toBeFalse();
  });

  it('searchClickHandler_updateActivateSearchToTrueAndAddAAttributeOnElementFormAndAddAClassToTheInputElement_whenFormDoesNotHaveAttributeDataToShow', () => {

    const event = new MouseEvent('click');
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('.search-form') as Element;
    const input = compiled.querySelector('.search-input') as HTMLElement;

    expect(component.activateMobileSearch)
      .toBeFalse();

    component.searchClickHandler(event, form, input as HTMLInputElement);

    expect(form.hasAttribute("data-to-show"))
      .toBeTrue();

    expect(component.activateMobileSearch)
      .toBeTrue();

    expect(input.getAttribute("class"))
      .toContain("focusable-search-input");
  });

  it('searchClickHandler_notUpdateActivateSearchToTrue_whenFormHaveAttributeDataToShow', () => {

    const event = new MouseEvent('click');
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('.search-form');
    const input = compiled.querySelector('.search-input');

    form?.setAttribute('data-to-show', '');

    expect(component.activateMobileSearch)
      .toBeFalse();

    if (form && input) {
      component.searchClickHandler(event, form, input as HTMLInputElement);
    }

    expect(component.activateMobileSearch)
      .toBeFalse();
  });

  it('handlerClickOutside_closeGivenDropdownAndRemoveClickEventInHtml_whenTheClickedElementIsNotPartOfTheDropdown', () => {

    component.logged = true;
    fixture.autoDetectChanges();

    const event = new MouseEvent('click');
    const compiled = fixture.nativeElement as HTMLElement;
    const accountOptions = compiled.querySelector('.account-options');

    expect(component.activateAccountOptions)
      .toBeFalse();

    if (accountOptions) {
      component.accountClickHandler(event, accountOptions);
    }

    const htmlElement = document.documentElement;
    htmlElement.click();

    expect(component.activateAccountOptions)
      .toBeFalse();

    fixture.detectChanges();

    expect(accountOptions?.getAttribute('class'))
      .not.toContain('block-account-options');

    expect(accountOptions?.hasAttribute('data-to-show'))
      .toBeFalse();
  });

  it('preventDefaultTouchStart_callsThePreventDefaultMethodOfTheEventObject_whenTheEventCanBeCanceledAndIsOfTypeTouchstart', () => {

    const touchStartEvent = new TouchEvent('touchstart', { cancelable: true });
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('.search-form');
    const input = compiled.querySelector('.search-input');

    expect(component.activateMobileSearch)
      .toBeFalse();

    if (form && input) {
      component.searchClickHandler(
        touchStartEvent,
        form,
        input as HTMLInputElement
      );
    }

    expect(component.activateMobileSearch)
      .toBeTrue();

    fixture.detectChanges();

    expect(form?.hasAttribute("data-to-show"))
      .toBeTrue();
  });
});
