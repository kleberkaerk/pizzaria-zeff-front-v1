import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockWrongQueryParameterGuard } from '../guard/block-wrong-query-parameter.guard';
import { SearchProductsComponent } from './search-products/search-products.component';

const routes: Routes = [
  {
    path: "",
    component: SearchProductsComponent,
    canActivate: [BlockWrongQueryParameterGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
