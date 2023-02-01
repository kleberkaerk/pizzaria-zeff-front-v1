import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductRequisitionService } from 'src/app/service/product.requisition.service';
import { Page } from 'src/app/util/page';
import { Product } from 'src/app/domain/product';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.css']
})
export class ProductMenuComponent implements OnInit, AfterViewInit {

  public menuProductsPage!: Page<Array<Product>>;
  public availablePages = new Array<number>();
  public currentPage = 0;
  public typeOfProducts = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductRequisitionService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) { }

  private initializeAvailablePages(numberOfPages: number) {

    this.availablePages = new Array();

    for (let i = 1; i <= numberOfPages; i++) {

      this.availablePages.push(i);
    }
  }

  private findMenuProducts(productType: string, pageNumber: number) {

    this.productService.findMenuProducts(productType, pageNumber).subscribe(productsPage => {

      this.menuProductsPage = productsPage;

      this.initializeAvailablePages(productsPage.totalPages);
    });
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(queryParams => {

      this.typeOfProducts = queryParams['type'];

      if (queryParams['page'] === undefined) {

        this.currentPage = 0;
      } else {

        const pageNumberInString = queryParams['page'] as string;
        this.currentPage = Number.parseInt(pageNumberInString);
      }

      this.findMenuProducts(this.typeOfProducts, this.currentPage);
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

    this.router.navigate(["/menu"], { queryParams: { type: this.typeOfProducts, page: (nextPage - 1) } });
  }

  public addProductToCard(e: Event, product: Product) {

    e.stopPropagation();

    this.preventDefaultTouchStart(e);

    this.shoppingCartService.addProduct(product);
  }
}
