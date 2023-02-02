import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from 'src/app/domain/product';
import { ProductTransferService } from 'src/app/service/product-transfer.service';
import { ProductRequisitionService } from 'src/app/service/product.requisition.service';
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
  private initialTouch = { clientX: 0, clientY: 0 };
  private finalTouch = { clientX: 0, clientY: 0 };

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductRequisitionService,
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

  public viewProduct(e: Event, product: Product) {

    e.stopPropagation();

    this.preventDefaultTouchend(e);

    if (this.itIsAMovingTouch(e)) return;

    this.productTransferService.setProduct(product);

    if (e.type === "touchend") {

      this.router.navigate(["/product"]);
    }
  }

  public changePage(e: Event, nextPage: number) {

    e.stopPropagation();

    this.preventDefaultTouchend(e);
    
    if (this.itIsAMovingTouch(e) || this.currentPage === (nextPage - 1)) return;

    this.router.navigate(["/search"], { queryParams: { value: this.valueSearch, page: (nextPage - 1) } });
  }

  public addProductToCard(e: Event, product: Product) {

    e.stopPropagation();
    
    this.preventDefaultTouchend(e);
    
    if (this.itIsAMovingTouch(e)) return;

    this.shoppingCartService.addProduct(product);
  }
}
