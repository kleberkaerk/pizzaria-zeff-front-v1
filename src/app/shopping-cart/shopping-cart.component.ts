import { Component, OnInit } from '@angular/core';

import { Product } from '../domain/product';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { TouchEventHandlerService } from '../service/touch-event-handler.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public products!: Array<Product>;
  public amount = 0;
  readonly htmlElement = document.documentElement;

  public functionalityUnderDevelopment = false;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private touchEventHandlerService: TouchEventHandlerService
  ) { }

  private calculateTotalAmount() {

    this.amount = this.products.map(product => product.getPrice)
      .reduce((previousPrice, currentPrice) => previousPrice + currentPrice, 0);
  }

  ngOnInit(): void {

    this.products = this.shoppingCartService.checkProductsInSession();

    if (this.products) {
      this.calculateTotalAmount();
    }

    this.shoppingCartService.productsSubject.subscribe(products => {

      this.products = products;
      this.calculateTotalAmount();
    });
  }

  public setInitialTouchPoint(e: TouchEvent) {

    this.touchEventHandlerService.setInitialTouchPoint(e);
  }

  public displayProductsInShoppingCart(e: Event, button: Element, focusElement: Element) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    const externalClickChecker = (e: Event) => {

      if (!focusElement.contains((e.target as HTMLElement))) {

        this.htmlElement.removeEventListener("click", externalClickChecker);
        this.htmlElement.removeEventListener("touchstart", externalClickChecker);
        focusElement.removeAttribute("data-to-show");
        button.classList.toggle("cart-of-products-on-display");
      }
    }

    if (!focusElement.hasAttribute("data-to-show")) {

      e.stopPropagation();
      this.htmlElement.addEventListener("click", externalClickChecker);
      this.htmlElement.addEventListener("touchstart", externalClickChecker);
      focusElement.setAttribute("data-to-show", "");
      button.classList.toggle("cart-of-products-on-display");
    }
  }

  public closeShoppingCart(e: Event) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    this.htmlElement.click();
  }

  public removeProduct(e: Event, index: number) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    this.shoppingCartService.removeProduct(index);
  }

  public purchaseProducts(e: Event) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    // Lógica aqui
  }

  public noticeOfFunctionalityUnderDevelopment(e: Event) {

    this.functionalityUnderDevelopment = true;
  }

  public closeFunctionalityNoticeUnderDevelopment() {
    
    this.functionalityUnderDevelopment = false;
  }
}
