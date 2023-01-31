import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniqueProductComponent } from './unique-product/unique-product.component';

const routes: Routes = [
  {
    path: "",
    component: UniqueProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
