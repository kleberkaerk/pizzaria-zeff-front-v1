import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductMenuComponent } from './product-menu/product-menu.component';

const routes: Routes = [
  {
    path: "",
    component: ProductMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
