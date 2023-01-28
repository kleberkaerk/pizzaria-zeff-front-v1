import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { ProductMenuComponent } from './product-menu/product-menu.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductMenuComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedModule
  ]
})
export class MenuModule { }
