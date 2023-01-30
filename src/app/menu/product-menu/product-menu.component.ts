import { Component, OnInit } from '@angular/core';

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
  products: Array<Product> = new Array();
  availablePages: Array<number> = new Array();
  currentPage = 0;

  constructor(private productService: ProductService) {

    this.products.push(new Product(1, "name1", "description1", 1.00, Type.DRINK, PriceRating.REGULAR_PRICE, "soda.jpg", true));
    this.products.push(new Product(2, "name2", "description2", 2.00, Type.DRINK, PriceRating.REGULAR_PRICE, "soda.jpg", true));
    this.products.push(new Product(3, "name3", "description3", 3.00, Type.DRINK, PriceRating.REGULAR_PRICE, "juice.jpg", true));
    this.products.push(new Product(4, "name4", "description4", 4.00, Type.DRINK, PriceRating.REGULAR_PRICE, "soda.jpg", true));
    this.products.push(new Product(5, "name5", "description5", 5.00, Type.DRINK, PriceRating.REGULAR_PRICE, "juice.jpg", true));
    this.products.push(new Product(6, "name6", "description6", 6.00, Type.DRINK, PriceRating.REGULAR_PRICE, "soda.jpg", true));
    this.products.push(new Product(7, "name7", "description7", 7.00, Type.DRINK, PriceRating.REGULAR_PRICE, "soda.jpg", true));
    this.products.push(new Product(8, "name8", "description8", 8.00, Type.DRINK, PriceRating.REGULAR_PRICE, "juice.jpg", true));
    this.products.push(new Product(9, "name9", "description9", 9.00, Type.DRINK, PriceRating.REGULAR_PRICE, "soda.jpg", true));
    this.products.push(new Product(10, "name10", "description10", 10.00, Type.DRINK, PriceRating.REGULAR_PRICE, "juice.jpg", true));
    this.products.push(new Product(11, "name11", "description11", 11.00, Type.DRINK, PriceRating.REGULAR_PRICE, "beer.jpg", true));
    this.products.push(new Product(12, "name12", "description12", 12.00, Type.DRINK, PriceRating.REGULAR_PRICE, "juice.jpg", true));
    this.products.push(new Product(13, "name13", "description13", 13.00, Type.DRINK, PriceRating.REGULAR_PRICE, "beer.jpg", true));
    this.products.push(new Product(14, "name14", "description14", 14.00, Type.DRINK, PriceRating.REGULAR_PRICE, "beer.jpg", true));
    this.products.push(new Product(15, "name15", "description15", 15.00, Type.DRINK, PriceRating.REGULAR_PRICE, "juice.jpg", true));
    this.products.push(new Product(16, "name16", "description16", 16.00, Type.DRINK, PriceRating.REGULAR_PRICE, "soda.jpg", true));
    this.products.push(new Product(17, "name17", "description17", 17.00, Type.DRINK, PriceRating.REGULAR_PRICE, "beer.jpg", true));
    this.products.push(new Product(18, "name18", "description18", 18.00, Type.DRINK, PriceRating.REGULAR_PRICE, "juice.jpg", true));
    this.products.push(new Product(19, "name19", "description19", 19.00, Type.DRINK, PriceRating.REGULAR_PRICE, "beer.jpg", true));
    this.products.push(new Product(20, "name20", "description20", 20.00, Type.DRINK, PriceRating.REGULAR_PRICE, "juice.jpg", true));

    this.availablePages.push(1);
    this.availablePages.push(2);
    this.availablePages.push(3);
    this.availablePages.push(4);
    this.availablePages.push(5);
    this.availablePages.push(6);
  }
  ngOnInit(): void {

    this.productService.findMenuProducts("DRINK", 0).subscribe(productsPaage => { });
  }



}
