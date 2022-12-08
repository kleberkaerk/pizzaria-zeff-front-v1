import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("accountClickHandler_updateActiveAccountOptionsToTrue_whenAccountOptionsDoesNotHaveAttributeDataToShow", () => {

    const event = new MouseEvent("click");
    const compiled = fixture.nativeElement as HTMLElement;
    const accountOptions = compiled.querySelector(".account-options");

    expect(component.activeAccountOptions)
      .toBeFalse();

    if (accountOptions) {

      component.accountClickHandler(event, accountOptions);
    }

    expect(component.activeAccountOptions)
      .toBeTrue();

    fixture.detectChanges();

    expect(accountOptions?.getAttribute("class"))
      .toContain("block-account-options");

    expect(accountOptions?.hasAttribute("data-to-show"))
      .toBeTrue();
  });

  it("accountClickHandler_notUpdatedActiveAccountOptionsToTrue_whenAccountOptionsHaveAttributeDataToShow", () => {

    const event = new MouseEvent("click");
    const compiled = fixture.nativeElement as HTMLElement;
    const accountOptions = compiled.querySelector(".account-options");

    accountOptions?.setAttribute("data-to-show", "");

    expect(component.activeAccountOptions)
      .toBeFalse();

    if (accountOptions) {

      component.accountClickHandler(event, accountOptions);
    }

    expect(component.activeAccountOptions)
      .toBeFalse();
  });

  it("handlerClickMobileMenu_updateActivateMobileMenuToTrue_whenMenuDoesNotHaveAttributeDataToShow", () => {

    const event = new MouseEvent("click");
    const compiled = fixture.nativeElement as HTMLElement;
    const menu = compiled.querySelector(".mobile-menu-options");
    const menuMobileButton = compiled.querySelector(".mobile-menu-button");

    expect(component.activateMobileMenu)
      .toBeFalse();

    if (menu) {
      component.handlerClickMobileMenu(event, menu);
    }

    expect(component.activateMobileMenu)
      .toBeTrue();

    fixture.detectChanges();

    expect(menuMobileButton?.getAttribute("class"))
      .toContain("activate-mobile-menu");
  });

  it("handlerClickMobileMenu_notUpdatedMenuToTrue_whenMenuHaveAttributeDataToShow", () => {

    const event = new MouseEvent("click");
    const compiled = fixture.nativeElement as HTMLElement;
    const menu = compiled.querySelector(".mobile-menu-options");

    menu?.setAttribute("data-to-show", "");

    expect(component.activateMobileMenu)
      .toBeFalse();

    if (menu) {
      component.handlerClickMobileMenu(event, menu);
    }

    expect(component.activateMobileMenu)
      .toBeFalse();
  });

  it("searchClickHandler_updateActivateSearchToTrue_whenFormDoesNotHaveAttributeDataToShow", () => {

    const event = new MouseEvent("click");
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector(".search-form");
    const input = compiled.querySelector(".search-input");

    expect(component.activateSearch)
      .toBeFalse();

    if (form && input) {
      component.searchClickHandler(event, form, input as HTMLInputElement);
    }

    expect(component.activateSearch)
      .toBeTrue();

    fixture.detectChanges();

    expect(form?.getAttribute("class"))
      .toContain("activate-search-form");
  });

  it("searchClickHandler_notUpdateActivateSearchToTrue_whenFormHaveAttributeDataToShow", () => {

    const event = new MouseEvent("click");
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector(".search-form");
    const input = compiled.querySelector(".search-input");

    form?.setAttribute("data-to-show", "");

    expect(component.activateSearch)
      .toBeFalse();

    if (form && input) {
      component.searchClickHandler(event, form, input as HTMLInputElement);
    }

    expect(component.activateSearch)
      .toBeFalse();
  });

  it("externalClickChecker_closeGivenDropdownAndRemoveClickEventInHtml_whenTheClickedElementIsNotPartOfTheDropdown", () => {

    const event = new MouseEvent("click");
    const compiled = fixture.nativeElement as HTMLElement;
    const accountOptions = compiled.querySelector(".account-options");

    expect(component.activeAccountOptions)
      .toBeFalse();

    if (accountOptions) {

      component.accountClickHandler(event, accountOptions);
    }

    const htmlElement = document.documentElement;
    htmlElement.click();

    expect(component.activeAccountOptions)
      .toBeFalse();

    fixture.detectChanges();

    expect(accountOptions?.getAttribute("class"))
      .not.toContain("block-account-options");

    expect(accountOptions?.hasAttribute("data-to-show"))
      .toBeFalse();
  });

  it("preventDefaultTouchStart_callsThePreventDefaultMethodOfTheEventObject_whenTheEventCanBeCanceledAndIsOfTypeTouchstart", () => {

    const touchStartEvent = new TouchEvent("touchstart", { cancelable: true });
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector(".search-form");
    const input = compiled.querySelector(".search-input");

    expect(component.activateSearch)
      .toBeFalse();

    if (form && input) {
      component.searchClickHandler(touchStartEvent, form, input as HTMLInputElement);
    }

    expect(component.activateSearch)
      .toBeTrue();

    fixture.detectChanges();

    expect(form?.getAttribute("class"))
      .toContain("activate-search-form");
  });

});
