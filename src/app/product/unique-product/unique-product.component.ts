import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from 'src/app/domain/product';
import { ProductTransferService } from 'src/app/service/product-transfer.service';

@Component({
  selector: 'app-unique-product',
  templateUrl: './unique-product.component.html',
  styleUrls: ['./unique-product.component.css']
})
export class UniqueProductComponent implements OnInit {

  public product!: Product;

  constructor(
    private productTransferService: ProductTransferService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.productTransferService.getProduct().subscribe(product => {

    // console.log(product)


      if (product === undefined) {

        this.router.navigate(["/"]);
      }

      this.product = product as Product;
    });
  }
}
