import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeaturedProductsComponent } from '../featured-products/featured-products.component';

import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderComponent, FeaturedProductsComponent],
      imports: [
        HttpClientTestingModule,
        SharedModule
      ]
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
    jasmine.clock().tick(8000);

    let slideButton = document.getElementById("slide-2") as HTMLInputElement;

    fixture.detectChanges();

    expect(slideButton.checked)
      .toBeTrue();

    jasmine.clock().uninstall();
  });

  it("ngOnOnInit.setInterval_returnsTheIteratorToTheStartingPosition_whenTheIteratorTriesToExceedTheAmountOfSlides", () => {

    jasmine.clock().install();

    component.ngOnInit();
    jasmine.clock().tick(32000);

    let slideButton = document.getElementById("slide-1") as HTMLInputElement;

    fixture.detectChanges();

    expect(slideButton.checked)
      .toBeTrue();

    jasmine.clock().uninstall();
  });

  it("setSlide_setsTheNextSlideToBeDisplayed_whenItIsAClickEvent", () => {

    const mouseEvent = new MouseEvent("click");

    jasmine.clock().install();
    component.ngOnInit();
    component.setSlide(mouseEvent, 2);
    jasmine.clock().tick(8000);

    let nextSlide = document.getElementById("slide-3") as HTMLInputElement;

    expect(nextSlide.checked)
      .toBeTrue();

    jasmine.clock().uninstall();
  });

  it("setSlide_definesTheCurrentSlideAndTheNextSlideToBeDisplayed_whenIsATouchstartEvent", () => {

    const touchEvent = new TouchEvent("touchstart", { cancelable: true });

    jasmine.clock().install();
    component.ngOnInit();
    component.setSlide(touchEvent, 2);

    let currentSlide = document.getElementById("slide-2") as HTMLInputElement;

    expect(currentSlide.checked)
      .toBeTrue();

    jasmine.clock().tick(8000);

    let nextSlide = document.getElementById("slide-3") as HTMLInputElement;

    expect(nextSlide.checked)
      .toBeTrue();

    jasmine.clock().uninstall();
  });

  it("setSlide_setsNextSlideAttributeToValueOne_ whenItReceivesTheLastSlideAsAnArgument", () => {

    const mouseEvent = new MouseEvent("click");

    jasmine.clock().install();
    component.ngOnInit();
    component.setSlide(mouseEvent, 4);
    jasmine.clock().tick(8000);

    let nextSlide = document.getElementById("slide-1") as HTMLInputElement;

    expect(nextSlide.checked)
    .toBeTrue();

    jasmine.clock().uninstall();
  });
});
