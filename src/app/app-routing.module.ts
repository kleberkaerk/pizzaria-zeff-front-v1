import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturedProductsComponent } from './home/featured-products/featured-products.component';

const routes: Routes = [
  {
    path: "",
    component: FeaturedProductsComponent,
    pathMatch: "full"
  },
  {
    path: "search",
    loadChildren: () => import("./search/search.module").then(module => module.SearchModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
