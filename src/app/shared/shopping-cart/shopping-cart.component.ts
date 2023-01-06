import { Component, OnInit } from '@angular/core';

import { Product } from '../domain/product';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public products!: Array<Product>;
  public amount = 0;
  readonly htmlElement = document.documentElement;

  constructor(private shoppingCartService: ShoppingCartService) { }

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

  private preventDefaultTouchStart(e: Event) {

    if (e.cancelable && e.type === "touchstart") {

      e.preventDefault();
    }
  }

  public displayProductsInShoppingCart(e: Event, button: Element, focusElement: Element) {

    this.preventDefaultTouchStart(e);

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

    this.preventDefaultTouchStart(e);

    this.htmlElement.click();
  }

  public removeProduct(e: Event, index: number) {

    e.stopPropagation();

    this.shoppingCartService.removeProduct(index);
  }
}
