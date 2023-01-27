import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { ProductMenuComponent } from './product-menu/product-menu.component';

@NgModule({
  declarations: [
    ProductMenuComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
