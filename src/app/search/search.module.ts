import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchProductsComponent } from './search-products/search-products.component';
import { FooterComponent } from '../shared/footer/footer.component';

@NgModule({
  declarations: [
    SearchProductsComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
