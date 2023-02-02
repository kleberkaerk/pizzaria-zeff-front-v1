import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/domain/product';
import { ProductTransferService } from 'src/app/service/product-transfer.service';

@Component({
  selector: 'app-unique-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public product!: Product;

  constructor(
    private productTransferService: ProductTransferService,
    private router: Router
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
}
