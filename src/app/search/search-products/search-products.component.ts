import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from 'src/app/domain/product';
import { ProductTransferService } from 'src/app/service/product-transfer.service';
import { ProductRequisitionService } from 'src/app/service/product-requisition.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { TouchEventHandlerService } from 'src/app/service/touch-event-handler.service';
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
    private productService: ProductRequisitionService,
    private touchEventHandlerService: TouchEventHandlerService,
    private productTransferService: ProductTransferService,
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

  public changePage(e: Event, nextPage: number) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);
    
    if (this.touchEventHandlerService.itIsAMovingTouch(e) || this.currentPage === (nextPage - 1)) return;

    this.router.navigate(["/search"], { queryParams: { value: this.valueSearch, page: (nextPage - 1) } });
  }

  public addProductToCart(e: Event, product: Product) {

    e.stopPropagation();
    
    this.touchEventHandlerService.preventDefaultTouchend(e);
    
    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    this.shoppingCartService.addProduct(product);
  }
}
