import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PriceRating } from 'src/app/domain/price-rating';
import { Product } from 'src/app/domain/product';
import { Type } from 'src/app/domain/type';

import { ProductService } from 'src/app/service/product.service';
import { Page } from 'src/app/util/page';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.css']
})
export class ProductMenuComponent implements OnInit {

  menuProductsPage?: Page<Array<Product>>;
  availablePages = new Array<number>();
  currentPage = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  private initializeAvailablePages(numberOfPages: number) {

    for (let i = 1; i <= numberOfPages; i++) {

      this.availablePages.push(i);
    }
  }

  private findMenuProducts(productType: string, pageNumber: number) {

    this.productService.findMenuProducts(productType, pageNumber).subscribe(productsPage => {

      this.menuProductsPage = productsPage;

      this.initializeAvailablePages(productsPage.totalPages);

      console.log(this.menuProductsPage);
    });
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(queryParams => {

      if (queryParams['page'] === undefined) {

        this.currentPage = 0;
        this.findMenuProducts(queryParams['value'], this.currentPage);
      } else {

        const pageNumberInString = queryParams['page'] as string;
        this.currentPage = Number.parseInt(pageNumberInString);
        this.findMenuProducts(queryParams['value'], this.currentPage);
      }

      window.scrollTo(0, 0);
    });
  }



}
