import { Component } from '@angular/core';
import { PriceRating } from 'src/app/domain/price-rating';
import { Product } from 'src/app/domain/product';
import { Type } from 'src/app/domain/type';

@Component({
  selector: 'app-unique-product',
  templateUrl: './unique-product.component.html',
  styleUrls: ['./unique-product.component.css']
})
export class UniqueProductComponent {

  product: Product = new Product(1, "name1", "description 1 ", 1.00, Type.DRINK, PriceRating.PROMOTION, "juice.jpg", true);

}
