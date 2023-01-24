import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/shared/domain/product';
import { ProductService } from 'src/app/shared/service/product.service';
import { Page } from 'src/app/shared/util/page';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {

  public valueOfSearch: string = "a";
  public searchResultsPage?: Page<Array<Product>>;
  public availablePages: Array<number> = new Array();
  public currentPage = 0;

  constructor(private productService: ProductService) { }

  private initializeAvailablePages(numberOfPages: number) {

    for (let i = 1; i <= numberOfPages; i++) {

      this.availablePages.push(i);
    }
  }

  private searchProducts(valueOfSearch: string, quantity: number, pageNumber: number) {

    this.productService.searchProducts(valueOfSearch, quantity, pageNumber).subscribe(productsPage => {

      if (this.availablePages.length === 0) {

        this.initializeAvailablePages(productsPage.totalPages);
      }

      this.searchResultsPage = productsPage;
    });
  }

  ngOnInit(): void {

    this.searchProducts(this.valueOfSearch, 20, this.currentPage);

  }

  public changePage(nextPage: number) {

    this.currentPage = --nextPage;

    this.searchProducts(this.valueOfSearch, 20, this.currentPage);

    window.scrollTo(0, 0);
  }
}
