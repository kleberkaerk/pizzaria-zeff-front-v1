import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { BlockWrongQueryParameterGuard } from './block-wrong-query-parameter.guard';

describe('BlockWrongQueryParameterGuard', () => {

  let guard: BlockWrongQueryParameterGuard;
  let routerToComparisonInCanActivate: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ]
    });

    guard = TestBed.inject(BlockWrongQueryParameterGuard);
    routerToComparisonInCanActivate = TestBed.inject(Router);
  });

  it('should be created', () => {

    expect(guard)
      .toBeTruthy();
  });

  it("canActivate_returnsAUrlTreeWithTheInitialRoute_whenValueQueryParameterIsEmpty", () => {

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

    spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({ value: "" });

    expect(guard.canActivate(activatedRouteSnapshot, routerStateSnapshot))
      .toEqual(routerToComparisonInCanActivate.parseUrl(""));
  });

  it("canActivate_returnsTrue_whenValueQueryParameterIsNotEmpty", () => {

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

    spyOnProperty(activatedRouteSnapshot, "queryParams").and.returnValue({ value: "name" });

    expect(guard.canActivate(activatedRouteSnapshot, routerStateSnapshot))
      .toBeTrue();
  });
});
