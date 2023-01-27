import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from 'src/app/domain/product';
import { ProductService } from 'src/app/service/product.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { Page } from 'src/app/util/page';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit, AfterViewInit {

  public valueSearch: string = "";
  public searchResultsPage?: Page<Array<Product>>;
  public quantityOfProducts = 0;
  public availablePages: Array<number> = new Array();
  public currentPage = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) { }

  private initializeAvailablePages(numberOfPages: number) {

    this.availablePages = new Array();

    for (let i = 1; i <= numberOfPages; i++) {

      this.availablePages.push(i);
    }
  }

  private searchProducts(valueOfSearch: string, quantity: number, pageNumber: number) {

    this.productService.searchProducts(valueOfSearch, quantity, pageNumber).subscribe(productsPage => {

      this.initializeAvailablePages(productsPage.totalPages);

      this.searchResultsPage = productsPage;
      this.quantityOfProducts = this.searchResultsPage.content.length;
    });
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(queryParam => {

      this.valueSearch = queryParam['value'];

      if (queryParam['page'] === undefined) {

        this.searchProducts(this.valueSearch, 20, 0);
        this.currentPage = 0;
      } else {

        const pageNumberInString = queryParam['page'] as string;
        this.currentPage = Number.parseInt(pageNumberInString);
        this.searchProducts(this.valueSearch, 20, this.currentPage);
      }
      window.scrollTo(0, 0);
    });
  }

  ngAfterViewInit(): void {

    window.scrollTo(0, 0);
  }

  private preventDefaultTouchStart(e: Event) {

    if (e.cancelable && e.type === "touchstart") {

      e.preventDefault();
    }
  }

  public changePage(e: Event, nextPage: number) {

    e.stopPropagation();

    this.preventDefaultTouchStart(e);

    if (this.currentPage === (nextPage - 1)) return;

    this.router.navigate(["/search"], { queryParams: { value: this.valueSearch, page: (nextPage - 1) } });
  }

  public addProductToCard(e: Event, product: Product) {

    e.stopPropagation();

    this.preventDefaultTouchStart(e);

    this.shoppingCartService.addProduct(product);
  }
}
