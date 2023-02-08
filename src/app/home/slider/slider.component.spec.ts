import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TouchEventHandlerService } from 'src/app/service/touch-event-handler.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeaturedProductsComponent } from '../featured-products/featured-products.component';

import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {

  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  let touchEventHandlerService: TouchEventHandlerService;

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

    touchEventHandlerService = TestBed.inject(TouchEventHandlerService);
  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();
  });

  it("ngOnOnInit_executesASetIntervalThatWillSumTheValueOfPropertyCurrentSlideTo1AndCheckTheSlideThatCorrespondsToTheValueOfPropertyCurrentSlideEvery8Seconds_whenThePropertyCurrentSlideIsLessThanOrEqualTo3", () => {

    jasmine.clock().install();

    component.ngOnInit();
    jasmine.clock().tick(8000);

    fixture.detectChanges();

    let slideButton = document.getElementById("slide-2") as HTMLInputElement;

    expect(slideButton.checked)
      .toBeTrue();

    jasmine.clock().uninstall();
  });

  it("ngOnInit_executesASetIntervalThatSetsTheValueOfPropertyCurrentSlideTo1AndCheckTheSlideThatCorrespondsToTheValueOfPropertyCurrentSlideEvery8Seconds_whenPropertyCurrentSlideIsGreaterThan3", () => {

    jasmine.clock().install();

    component.ngOnInit();
    jasmine.clock().tick(32000);

    fixture.detectChanges();

    let slideButton = document.getElementById("slide-1") as HTMLInputElement;

    expect(slideButton.checked)
      .toBeTrue();

    jasmine.clock().uninstall();
  });

  it("stopAutomaticSlideAdvance_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    spyOn(window, "clearInterval");

    component.stopAutomaticSlideAdvance(touchEvent);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(window.clearInterval)
      .not.toHaveBeenCalled();

    expect(component.pausedSlides)
      .toBeFalse();
  });

  it("stopAutomaticSlideAdvance_callsTheClearIntervalMethodPassingTheIntervalIdPropertyAsArgumentAndSetsTheValueOfThePausedSlidesPropertyToTrue_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalse", () => {

    const touchEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    const windowSpy = spyOn(window, "clearInterval");

    component.stopAutomaticSlideAdvance(touchEvent);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(window.clearInterval)
      .toHaveBeenCalled();

    expect(windowSpy.calls.argsFor(0)[0])
      .toEqual(component.intervalId);

    expect(component.pausedSlides)
      .toBeTrue();
  });

  it("resumeAutomaticSlideAdvance_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchEvent = new TouchEvent("touchend", { cancelable: true });

    component.pausedSlides = true;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    spyOn(window, "setInterval");

    component.resumeAutomaticSlideAdvance(touchEvent);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(window.setInterval)
      .not.toHaveBeenCalled();

    expect(component.pausedSlides)
      .toBeTrue();
  });

  it("resumeAutomaticSlideAdvance_callsTheSetIntervalMethodWhichWillChangeTheSlidesEvery8MinutesAndSetsTheValueOfThePausedSlidesPropertyToFalse_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalse", () => {

    const touchEvent = new TouchEvent("touchend", { cancelable: true });

    component.pausedSlides = true;

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    spyOn(window, "setInterval");

    component.resumeAutomaticSlideAdvance(touchEvent);

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(window.setInterval)
      .toHaveBeenCalled();

    expect(component.pausedSlides)
      .toBeFalse();
  });

  it("setInitialTouchPoint_callsTouchEventHandlerServiceAndPassesEventObjectAsArgument_wheneverCalled", () => {

    const touchEvent = new TouchEvent("touchstart", { cancelable: true });

    const touchEventHandlerServiceSpy = spyOn(touchEventHandlerService, "setInitialTouchPoint");

    component.setInitialTouchPoint(touchEvent);

    expect(touchEventHandlerService.setInitialTouchPoint)
      .toHaveBeenCalled();

    expect(touchEventHandlerServiceSpy.calls.argsFor(0)[0])
      .toEqual(touchEvent);
  });

  it("slideBack_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    component.slideBack(touchEvent);

    fixture.detectChanges();

    const slide4 = document.getElementById("slide-4") as HTMLInputElement;

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(slide4.checked)
      .toBeFalse();
  });

  it("slideBack_setTheValueOfPropertyCurrentSlideTo4AndCheckTheSlideThatCorrespondsToTheValueOfPropertyCurrentSlide_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalseAndTheCurrentSlidePropertyIsSmallerThan2", () => {

    const touchEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    component.slideBack(touchEvent);

    fixture.detectChanges();

    const slide4 = document.getElementById("slide-4") as HTMLInputElement;

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(slide4.checked)
      .toBeTrue();
  });

  it("slideBack_decreases1OfTheValueOfPropertyCurrentSlideAndCheckTheSlideThatCorrespondsToTheValueOfPropertyCurrentSlide_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalseAndTheCurrentSlidePropertyIsGreaterThanOrEqualTo2", () => {

    jasmine.clock().install();
    component.ngOnInit();
    jasmine.clock().tick(24000);

    jasmine.clock().uninstall();

    const touchEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    component.slideBack(touchEvent);

    fixture.detectChanges();

    const slide3 = document.getElementById("slide-3") as HTMLInputElement;

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(slide3.checked)
      .toBeTrue();
  });

  it("slideAdvance_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    component.slideAdvance(touchEvent);

    fixture.detectChanges();

    const slide2 = document.getElementById("slide-2") as HTMLInputElement;

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(slide2.checked)
      .toBeFalse();
  });

  it("slideAdvance_adds1ToTheValueOfPropertyCurrentSlideAndCheckTheSlideThatCorrespondsToTheValueOfPropertyCurrentSlide_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalseAndTheCurrentSlidePropertyIsLessThanOrEqualTo3", () => {

    const touchEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    component.slideAdvance(touchEvent);

    fixture.detectChanges();

    const slide2 = document.getElementById("slide-2") as HTMLInputElement;

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(slide2.checked)
      .toBeTrue();
  });

  it("slideAdvance_setTheValueOfPropertyCurrentSlideTo1AndCheckTheSlideThatCorrespondsToTheValueOfPropertyCurrentSlide_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalseAndTheCurrentSlidePropertyIsGreaterThan3", () => {

    jasmine.clock().install();
    component.ngOnInit();
    jasmine.clock().tick(24000);

    jasmine.clock().uninstall();

    const touchEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    component.slideAdvance(touchEvent);

    fixture.detectChanges();

    const slide1 = document.getElementById("slide-1") as HTMLInputElement;

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(slide1.checked)
      .toBeTrue();
  });

  it("setSlide_callsPreventDefaultTouchendMethodOfTouchEventHandlerServiceAndDoesNotDoAnything_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsTrue", () => {

    const touchEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(true);

    component.setSlide(touchEvent, 2);

    jasmine.clock().install();
    component.ngOnInit();
    jasmine.clock().tick(8000);

    jasmine.clock().uninstall();

    fixture.detectChanges();

    const slide3 = document.getElementById("slide-3") as HTMLInputElement;

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(slide3.checked)
      .toBeFalse();
  });

  it("setSlide_assignsTheValueOfTheCurrentSlideParameterToTheCurrentSlideProperty_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalse", () => {

    const mouseEvent = new MouseEvent("click");

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    component.setSlide(mouseEvent, 2);

    jasmine.clock().install();
    component.ngOnInit();
    jasmine.clock().tick(8000);

    jasmine.clock().uninstall();

    fixture.detectChanges();

    const slide3 = document.getElementById("slide-3") as HTMLInputElement;

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(slide3.checked)
      .toBeTrue();
  });

  it("setSlide_checkTheSlideThatCorrespondsToTheValueOfParameterCurrentSlideAndAssignsTheValueOfTheCurrentSlideParameterToTheCurrentSlideProperty_whenItIsAMovingTouchMethodOfTouchEventHandlerServiceReturnsFalseAndEventIsOfTypeTouchend", () => {

    const touchEvent = new TouchEvent("touchend", { cancelable: true });

    spyOn(touchEventHandlerService, "preventDefaultTouchend");
    spyOn(touchEventHandlerService, "itIsAMovingTouch").and.returnValue(false);

    component.setSlide(touchEvent, 2);

    fixture.detectChanges();

    const slide2 = document.getElementById("slide-2") as HTMLInputElement;

    expect(touchEventHandlerService.preventDefaultTouchend)
      .toHaveBeenCalled();

    expect(slide2.checked)
      .toBeTrue();
  });
});
