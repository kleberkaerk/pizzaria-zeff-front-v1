import { AfterViewChecked, Component, OnInit } from '@angular/core';
import localeBr from '@angular/common/locales/br';

import { Product } from 'src/app/domain/product';
import { Type } from 'src/app/domain/type';
import { registerLocaleData } from '@angular/common';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { ProductRequisitionService } from 'src/app/service/product-requisition.service';
import { ProductTransferService } from 'src/app/service/product-transfer.service';
import { Router } from '@angular/router';
import { TouchEventHandlerService } from 'src/app/service/touch-event-handler.service';

registerLocaleData(localeBr, "br");

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit, AfterViewChecked {

  private featuredProducts: Map<Type, Array<Product>> = new Map();
  private limiterToAfterViewChecked = 0;

  constructor(
    private touchEventHandlerService: TouchEventHandlerService,
    private productService: ProductRequisitionService,
    private shoppingCartService: ShoppingCartService,
    private productTransferService: ProductTransferService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.productService.findProductsInPromotion().subscribe(
      productsMap => {

        this.featuredProducts = productsMap;
      }
    );
  }

  private removeButton(elementsOnDisplay: number) {

    this.featuredProducts.forEach((products: Product[], key: Type) => {

      if (products.length <= elementsOnDisplay) {

        switch (key) {

          case 0:
            document.querySelector("#salty-pizza-button")?.classList.add("remove-expansion-button");
            document.querySelector("#wrapper-salty-pizza")?.classList.add("auto-height-wrapper");
            break;

          case 1:
            document.querySelector("#sweet-pizza-button")?.classList.add("remove-expansion-button");
            document.querySelector("#wrapper-sweet-pizza")?.classList.add("auto-height-wrapper");
            break;

          case 2:
            document.querySelector("#salty-esfiha-button")?.classList.add("remove-expansion-button");
            document.querySelector("#wrapper-salty-esfiha")?.classList.add("auto-height-wrapper");
            break;

          case 3:
            document.querySelector("#sweet-esfiha-button")?.classList.add("remove-expansion-button");
            document.querySelector("#wrapper-sweet-esfiha")?.classList.add("auto-height-wrapper");
            break;

          case 4:
            document.querySelector("#drink-button")?.classList.add("remove-expansion-button");
            document.querySelector("#wrapper-drink")?.classList.add("auto-height-wrapper");
            break;
        }
      }
    });
  }

  ngAfterViewChecked(): void {

    if (this.limiterToAfterViewChecked >= 4) {

      return;
    }
    this.limiterToAfterViewChecked++;

    const clientWidth = window.innerWidth;

    if (clientWidth >= 481 && clientWidth <= 1023) {

      this.removeButton(4);
    } else {

      this.removeButton(5);
    }
  }

  public setInitialTouchPoint(e: TouchEvent) {

    this.touchEventHandlerService.setInitialTouchPoint(e);
  }

  public viewProduct(e: Event, product: Product) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    this.productTransferService.setProduct(product);

    if (e.type === "touchend") {

      this.router.navigate(["/product"]);
    }
  }

  public getSaltyPizzas(): Array<Product> | undefined {

    return this.featuredProducts.get(Type.SALTY_PIZZA);
  }

  public getSweetPizzas(): Array<Product> | undefined {

    return this.featuredProducts.get(Type.SWEET_PIZZA);
  }

  public getSaltyEsfihas(): Array<Product> | undefined {

    return this.featuredProducts.get(Type.SALTY_ESFIHA);
  }

  public getSweetEsfihas(): Array<Product> | undefined {

    return this.featuredProducts.get(Type.SWEET_ESFIHA);
  }

  public getDrinks(): Array<Product> | undefined {

    return this.featuredProducts.get(Type.DRINK);
  }

  private showMoreProducts(
    wrapper: HTMLElement,
    productsHeight: number,
    button: Element,
    heightToBeAdded: number
  ) {

    let wrapperHeight = wrapper.clientHeight;

    wrapperHeight += heightToBeAdded;

    if (wrapperHeight >= productsHeight) {

      button.classList.add("remove-expansion-button");
      wrapper.style.height = "auto";
    } else {

      wrapper.style.height = wrapperHeight.toFixed(0) + "px";
    }
  }

  public seeMoreProducts(e: Event, wrapper: HTMLElement, products: Element, button: Element) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    const clientWidth = window.innerWidth;
    const productsHeight = products.scrollHeight;

    if (clientWidth <= 480) {

      this.showMoreProducts(wrapper, productsHeight, button, 1630);
    } else if (clientWidth <= 1023) {

      this.showMoreProducts(wrapper, productsHeight, button, 640);
    } else {

      this.showMoreProducts(wrapper, productsHeight, button, 326);
    }
  }

  public addProductToCart(e: Event, product: Product) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    this.shoppingCartService.addProduct(product);
  }
}
