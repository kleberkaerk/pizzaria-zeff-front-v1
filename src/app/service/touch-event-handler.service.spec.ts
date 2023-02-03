import { TestBed } from '@angular/core/testing';

import { TouchEventHandlerService } from './touch-event-handler.service';

describe('TouchEventHandlerService', () => {

  let service: TouchEventHandlerService;

  beforeEach(() => {

    TestBed.configureTestingModule({});

    service = TestBed.inject(TouchEventHandlerService);
  });

  it('should be created', () => {

    expect(service)
      .toBeTruthy();
  });

  it("preventDefaultTouchend_callFunctionPreventDefaultFromEventObject_whenEventObjectIsCancelableAndIsOfTypeTouchend", () => {

    const event = new TouchEvent("touchend", { cancelable: true });

    spyOn(event, "preventDefault");

    service.preventDefaultTouchend(event);

    expect(event.preventDefault)
      .toHaveBeenCalled();
  });

  it("setInitialTouchPoint_initializeInitialTouchPropertyWithEventObject_wheneverCalled", () => {

    const touchEvent = new TouchEvent("touchend");

    spyOn(touchEvent.changedTouches, "item");

    service.setInitialTouchPoint(touchEvent);

    expect(touchEvent.changedTouches.item)
      .toHaveBeenCalled();
  });

  it("itIsAMovingTouch_initializeFinalTouchPropertyWithEventObjectAndReturnsTrue_whenFinalTouchPropertyIsDifferentFromInitialTouchProperty", () => {

    const touchendEvent = new TouchEvent("touchend");

    const mockTouchend = new Touch({ clientX: 2, clientY: 1, identifier: 1, target: new EventTarget() });

    spyOn(touchendEvent.changedTouches, "item").and.callFake(() => mockTouchend);

    expect(service.itIsAMovingTouch(touchendEvent))
      .toBeTrue();
  });

  it("itIsAMovingTouch_initializeFinalTouchPropertyWithEventObjectAndReturnsFalse_whenFinalTouchPropertyIsEqualToTheInitialTouchProperty", () => {

    const touchendEvent = new TouchEvent("touchend");

    const mockTouchend = new Touch({ clientX: 2, clientY: 1, identifier: 1, target: new EventTarget() });

    spyOn(touchendEvent.changedTouches, "item").and.callFake(() => mockTouchend);

    service.setInitialTouchPoint(touchendEvent);

    expect(service.itIsAMovingTouch(touchendEvent))
      .toBeFalse();
  });
});
