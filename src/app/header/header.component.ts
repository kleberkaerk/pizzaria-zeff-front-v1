import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../domain/product';
import { ProductRequisitionService } from '../service/product.requisition.service'
import { TouchEventHandlerService } from '../service/touch-event-handler.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public activateAccountOptions = false;
  public activateMobileMenu = false;
  public activateMobileSearch = false;
  public logged = true;
  public username = "Luffy";
  public searchInputValue = "";
  private enteredValue!: string;
  public searchResults: Array<Product> = new Array();
  public autocompleteCurrentFocus = -1;

  constructor(
    private touchEventHandlerService: TouchEventHandlerService,
    private productService: ProductRequisitionService,
    private router: Router
  ) { }

  public setInitialTouchPoint(e: TouchEvent) {

    this.touchEventHandlerService.setInitialTouchPoint(e);
  }

  public scrollPageToTop(e: Event) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    window.scrollTo(0, 0);

    if (e.type === "touchend") {

      this.router.navigate(["/"]);
    }
  }

  public searchTypedValue() {

    if (this.autocompleteCurrentFocus !== -1) this.autocompleteCurrentFocus = -1;

    if (this.searchInputValue === "") this.searchResults = new Array();

    this.enteredValue = this.searchInputValue.trimStart();

    if (this.enteredValue.length > 0) {

      this.productService.searchProducts(this.searchInputValue, 10, 0).subscribe(productsPage => {

        this.searchResults = productsPage.content;
      });
    }
  }

  private upCurrentFocus(searchResultsLength: number) {

    const indexOfThePenultimateSearchResult = searchResultsLength - 2;

    if (this.autocompleteCurrentFocus <= indexOfThePenultimateSearchResult) {

      ++this.autocompleteCurrentFocus;
    } else {

      this.autocompleteCurrentFocus = -1;
    }
  }

  private decreaseCurrentFocus(searchResultsLength: number, e: KeyboardEvent) {

    const indexOfTheLastSearchResult = --searchResultsLength;

    e.preventDefault();
    if (this.autocompleteCurrentFocus >= 0) {

      --this.autocompleteCurrentFocus;
    } else {

      this.autocompleteCurrentFocus = indexOfTheLastSearchResult;
    }
  }

  private setCurrentFocusOfAutocompleteWithKeyboard(e: KeyboardEvent) {

    switch (e.key) {

      case "ArrowDown":
        this.upCurrentFocus(this.searchResults.length);
        break;

      case "ArrowUp":
        this.decreaseCurrentFocus(this.searchResults.length, e);
        break;
    }
  }

  private setAutoComplete() {

    if (this.autocompleteCurrentFocus > -1) {

      this.searchInputValue = this.searchResults[this.autocompleteCurrentFocus].getName;
    } else {

      this.searchInputValue = this.enteredValue;
    }
  }

  public autocomplete(e: KeyboardEvent) {

    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

    if (this.searchResults.length === 0) return;

    this.setCurrentFocusOfAutocompleteWithKeyboard(e);

    this.setAutoComplete();
  }

  public setCurrentFocusOfAutocompleteWithMouse(index: number) {

    this.autocompleteCurrentFocus = index;
  }

  public search(searchInput: HTMLInputElement) {

    if (this.searchInputValue === "") {

      return;
    }

    if (this.activateMobileSearch) {

      document.documentElement.click();
    }

    searchInput.blur();
    this.router.navigate(["/search"], { queryParams: { value: this.searchInputValue } });
  }

  public clickSearch(productName: string) {

    this.searchInputValue = productName;

    this.router.navigate(["/search"], { queryParams: { value: productName } });
  }

  public clearSearchInput(e: Event, inputToBeCleaned: HTMLInputElement) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    this.searchInputValue = "";
    this.enteredValue = "";
    this.autocompleteCurrentFocus = -1;
    this.searchResults = new Array();
    inputToBeCleaned.focus();
  }

  public exitMobileSearch(e: Event) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    document.documentElement.click();
  }

  private handlerClickOutside(e: Event, focusElement: Element, callback: Function) {

    const htmlElement = document.documentElement;

    const externalClickChecker = (e: Event) => {

      if (!focusElement.contains((e.target as HTMLElement))) {

        htmlElement.removeEventListener("click", externalClickChecker);
        htmlElement.removeEventListener("touchstart", externalClickChecker);
        focusElement.removeAttribute("data-to-show");
        callback(false);
      }
    }

    if (!focusElement.hasAttribute("data-to-show")) {

      htmlElement.addEventListener("click", externalClickChecker);
      htmlElement.addEventListener("touchstart", externalClickChecker);
      focusElement.setAttribute("data-to-show", "");
      callback(true);
    } else {

      htmlElement.click();
    }
  }

  public accountClickHandler(e: Event, accountOptions: Element): void {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.activateMobileMenu) document.documentElement.click();

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    this.handlerClickOutside(e, accountOptions, (value: boolean) => {

      this.activateAccountOptions = value;
    });
  }

  public handlerClickMobileMenu(e: Event, mobileMenu: Element) {
    
    e.stopPropagation();
    
    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.activateAccountOptions) document.documentElement.click();
    
    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    this.handlerClickOutside(e, mobileMenu, (value: boolean) => {

      this.activateMobileMenu = value;
    });
  }

  public searchClickHandler(e: Event, form: Element, input: HTMLInputElement) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.activateMobileMenu || this.activateAccountOptions) document.documentElement.click();

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    this.handlerClickOutside(e, form, (value: boolean) => {

      /*
      The focusable-search-input class was added with javascript, because the input needed to be made visible before receiving focus.

      If this class was not added through javascript , it would not be possible to focus on the input
      */

      if (value) {

        this.activateMobileSearch = true;
        input.classList.add("focusable-search-input");
        input.focus();
      } else {

        this.activateMobileSearch = false;
        input.classList.remove("focusable-search-input");
      }
    });
  }
}
