import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SliderComponent } from './home/slider/slider.component';
import { FinalizeSliderComponentTasksGuard } from './guard/finalize-slider-component-tasks.guard';
import { FilterValueQueryParamGuard } from './guard/filter-value-query-param.guard';
import { FilterProductTypeQueryParamGuard } from './guard/filter-product-type-query-param.guard';

const routes: Routes = [
  {
    path: "",
    component: SliderComponent,
    canDeactivate: [FinalizeSliderComponentTasksGuard],
    pathMatch: "full"
  },
  {
    path: "search",
    loadChildren: () => import("./search/search.module").then(module => module.SearchModule),
    canActivate: [FilterValueQueryParamGuard]
  },
  {
    path: "menu",
    loadChildren: () => import("./menu/menu.module").then(module => module.MenuModule),
    canActivate: [FilterProductTypeQueryParamGuard]
  },
  {
    path: "product",
    loadChildren: () => import("./product/product.module").then(module => module.ProductModule)
  },
  {
    path: "signin",
    loadChildren: () => import("./sign-in/sign-in.module").then(module => module.SignInModule)
  },
  {
    path: "signup",
    loadChildren: () => import("./sign-up/sign-up-routing.module").then(module => module.SignUpRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
