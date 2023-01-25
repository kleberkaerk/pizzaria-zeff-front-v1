import { TestBed } from '@angular/core/testing';

import { FinalizeSliderComponentTasksGuard } from './finalize-slider-component-tasks.guard';

describe('FinalizeHomeComponentTasksGuard', () => {
  let guard: FinalizeSliderComponentTasksGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FinalizeSliderComponentTasksGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
