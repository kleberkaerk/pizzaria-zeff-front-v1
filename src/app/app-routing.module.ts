import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalizeSliderComponentTasksGuard } from './guard/finalize-slider-component-tasks.guard';
import { SliderComponent } from './home/slider/slider.component';

const routes: Routes = [
  {
    path: "",
    component: SliderComponent,
    canDeactivate: [FinalizeSliderComponentTasksGuard],
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
