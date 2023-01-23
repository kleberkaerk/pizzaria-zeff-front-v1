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

  searchResultsPage?: Page<Array<Product>>;
  pageNumber = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.productService.searchProducts("a", 20, this.pageNumber).subscribe(productsPage => {

        this.searchResultsPage = productsPage;
      });
  }
}
