import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';

import { SearchProductsComponent } from './search-products/search-products.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SearchProductsComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule
  ]
})
export class SearchModule { }
