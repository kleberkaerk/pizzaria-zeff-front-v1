import { TestBed } from '@angular/core/testing';

import { BlockWrongQueryParameterGuard } from './block-wrong-query-parameter.guard';

describe('BlockWrongQueryParameterGuard', () => {
  let guard: BlockWrongQueryParameterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BlockWrongQueryParameterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
