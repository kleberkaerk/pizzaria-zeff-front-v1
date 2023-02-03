import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/domain/product';
import { ProductTransferService } from 'src/app/service/product-transfer.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { TouchEventHandlerService } from 'src/app/service/touch-event-handler.service';

@Component({
  selector: 'app-unique-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {

  public product!: Product;

  constructor(
    private productTransferService: ProductTransferService,
    private router: Router,
    private touchEventHandlerService: TouchEventHandlerService,
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

  ngAfterViewInit(): void {

    window.scrollTo(0, 0);
  }

  public setInitialTouchPoint(e: TouchEvent) {

    this.touchEventHandlerService.setInitialTouchPoint(e);
  }

  public addProductToCart(e: Event) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    this.shoppingCartService.addProduct(this.product);
  }

  public purchaseProduct(e: Event) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    // Lógica aqui
  }
}
