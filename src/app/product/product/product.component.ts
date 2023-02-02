import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/domain/product';
import { ProductTransferService } from 'src/app/service/product-transfer.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-unique-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public product!: Product;
  private initialTouch = { clientX: 0, clientY: 0 };
  private finalTouch = { clientX: 0, clientY: 0 };

  constructor(
    private productTransferService: ProductTransferService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {

    this.productTransferService.getProduct().subscribe(product => {

      if (product === undefined) {

        this.router.navigate(["/"]);
      } else {

        this.product = product;
      }
    });
  }

  public setInitialTouchPoint(e: TouchEvent) {

    e.stopPropagation();

    this.initialTouch.clientX = e.changedTouches.item(0)?.clientX as number;
    this.initialTouch.clientY = e.changedTouches.item(0)?.clientY as number;
  }

  private preventDefaultTouchend(e: Event) {

    if (e.cancelable && e.type === "touchend") {

      e.preventDefault();
    }
  }

  private itIsAMovingTouch(e: Event): boolean {

    if (e.type === "touchend") {

      this.finalTouch.clientX = (e as TouchEvent).changedTouches.item(0)?.clientX as number;
      this.finalTouch.clientY = (e as TouchEvent).changedTouches.item(0)?.clientY as number;

      if (JSON.stringify(this.finalTouch) !== JSON.stringify(this.initialTouch)) return true;
    }

    return false;
  }

  public addProductToCart(e: Event) {

    e.stopPropagation();

    this.preventDefaultTouchend(e);

    if (this.itIsAMovingTouch(e)) return;

    this.shoppingCartService.addProduct(this.product);
  }

  public purchaseProduct(e: Event) {

    e.stopPropagation();

    this.preventDefaultTouchend(e);

    if (this.itIsAMovingTouch(e)) return;

    // Lógica aqui
  }
}
