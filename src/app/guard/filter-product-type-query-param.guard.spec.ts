import { TestBed } from '@angular/core/testing';

import { FilterProductTypeQueryParamGuard } from './filter-product-type-query-param.guard';

describe('FilterProductTypeQueryParamGuard', () => {
  let guard: FilterProductTypeQueryParamGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FilterProductTypeQueryParamGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
