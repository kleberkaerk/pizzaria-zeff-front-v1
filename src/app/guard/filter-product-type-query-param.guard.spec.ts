import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { FilterProductTypeQueryParamGuard } from './filter-product-type-query-param.guard';

describe('FilterProductTypeQueryParamGuard', () => {

  let guard: FilterProductTypeQueryParamGuard;

  let routerToComparisonInCanActivate: Router;

  beforeEach(() => {

    TestBed.configureTestingModule({});

    guard = TestBed.inject(FilterProductTypeQueryParamGuard);

    routerToComparisonInCanActivate = TestBed.inject(Router);
  });

  it('should be created', () => {

    expect(guard)
      .toBeTruthy();
  });

  it("canActivate_returnsTrue_whenTheQueryParameterTypeIsAProductType", () => {

    let activatedRouteSnapshot = new ActivatedRouteSnapshot();
    let routerStateSnapshot: RouterStateSnapshot = { url: "", root: activatedRouteSnapshot };

    Object.defineProperty(activatedRouteSnapshot, "queryParams", {
      get: function () {
        return this.queryParams;
      }
    });

    Object.defineProperty(routerStateSnapshot, "value", {
      get: function () {
        return this.value;
      }
    });

    spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({ type: "SALTY_PIZZA" });

    expect(guard.canActivate(activatedRouteSnapshot, routerStateSnapshot))
      .toBeTrue();
  });

  it("canActivate_returnsAUrlTreeWithTheInitialRoute_whenTheQueryParameterTypeIsNotProductType", () => {

    let activatedRouteSnapshot = new ActivatedRouteSnapshot();
    let routerStateSnapshot: RouterStateSnapshot = { url: "", root: activatedRouteSnapshot };

    Object.defineProperty(activatedRouteSnapshot, "queryParams", {
      get: function () { return this.queryParams; }
    });

    Object.defineProperty(routerStateSnapshot, "value", {
      get: function () { return this.value; }
    });

    spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({ type: "name" });

    expect(guard.canActivate(activatedRouteSnapshot, routerStateSnapshot))
      .toEqual(routerToComparisonInCanActivate.parseUrl(""));
  });
});
