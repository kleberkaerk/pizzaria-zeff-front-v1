import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { UniqueProductComponent } from './unique-product/unique-product.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UniqueProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
