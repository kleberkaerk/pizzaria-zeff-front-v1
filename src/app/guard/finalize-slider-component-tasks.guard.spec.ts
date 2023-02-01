import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { FinalizeSliderComponentTasksGuard } from './finalize-slider-component-tasks.guard';
import { SliderComponent } from '../home/slider/slider.component';

describe('FinalizeSliderComponentTasksGuard', () => {

  let guard: FinalizeSliderComponentTasksGuard;
  let sliderComponent: SliderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SliderComponent,
      ]
    });

    guard = TestBed.inject(FinalizeSliderComponentTasksGuard);
    sliderComponent = TestBed.inject(SliderComponent);
  });

  it('should be created', () => {

    expect(guard)
      .toBeTruthy();
  });

  it("canDeactivate_clearIntervalOfTheSliderComponentAndReturnsTrue_wheneverCalled", () => {

    let activatedRouteSnapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    let currentState: RouterStateSnapshot = { url: "", root: activatedRouteSnapshot };

    Object.defineProperty(currentState, "value", {
      get: function () {
        return this.value;
      }
    });

    spyOn(window, "clearInterval");

    expect(guard.canDeactivate(sliderComponent, activatedRouteSnapshot, currentState))
      .toBeTrue();

    expect(window.clearInterval)
      .toHaveBeenCalled();
  });
});
