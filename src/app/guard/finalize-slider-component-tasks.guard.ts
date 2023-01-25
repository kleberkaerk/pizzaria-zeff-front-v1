import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { SliderComponent } from '../home/slider/slider.component';

@Injectable({
  providedIn: 'root'
})
export class FinalizeSliderComponentTasksGuard implements CanDeactivate<SliderComponent> {
  
  canDeactivate(
    component: SliderComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    window.clearInterval(component.intervalId);

    return true;
  }
}
