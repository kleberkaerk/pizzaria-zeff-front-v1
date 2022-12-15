import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("ngOnOnInit_executesASetIntervalWhichWillChangeTheRadioButtonOnTheSlidesEveryFourSeconds_wheneverCalled", () => {

    jasmine.clock().install();

    component.ngOnInit();
    jasmine.clock().tick(4000);

    let slideButton = document.getElementById("slide-2") as HTMLInputElement;

    fixture.detectChanges();

    expect(slideButton.checked)
      .toBeTrue();

    jasmine.clock().uninstall();
  });

  it("ngOnOnInit.setInterval_returnsTheIteratorToTheStartingPosition_whenTheIteratorTriesToExceedTheAmountOfSlides", () => {

    jasmine.clock().install();

    component.ngOnInit();
    jasmine.clock().tick(16000);

    let slideButton = document.getElementById("slide-1") as HTMLInputElement;

    fixture.detectChanges();

    expect(slideButton.checked)
      .toBeTrue();

    jasmine.clock().uninstall();
  });
});
