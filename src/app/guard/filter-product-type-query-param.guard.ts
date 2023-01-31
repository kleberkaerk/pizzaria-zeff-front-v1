import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterProductTypeQueryParamGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    switch (route.queryParams["type"]) {

      case "SALTY_PIZZA":
      case "SWEET_PIZZA":
      case "SALTY_ESFIHA":
      case "SWEET_ESFIHA":
      case "DRINK":
        return true;

      default:
        return this.router.parseUrl("");
    }
  }
}
