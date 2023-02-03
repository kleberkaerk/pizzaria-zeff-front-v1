import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TouchEventHandlerService {

  private initialTouch = { clientX: 0, clientY: 0 };
  private finalTouch = { clientX: 0, clientY: 0 };

  public preventDefaultTouchend(e: Event) {

    if (e.cancelable && e.type === "touchend") {

      e.preventDefault();
    }
  }

  public setInitialTouchPoint(e: TouchEvent) {

    e.stopPropagation();

    this.initialTouch.clientX = e.changedTouches.item(0)?.clientX as number;
    this.initialTouch.clientY = e.changedTouches.item(0)?.clientY as number;
  }

  public itIsAMovingTouch(e: Event): boolean {

    if (e.type === "touchend") {

      this.finalTouch.clientX = (e as TouchEvent).changedTouches.item(0)?.clientX as number;
      this.finalTouch.clientY = (e as TouchEvent).changedTouches.item(0)?.clientY as number;

      if (JSON.stringify(this.finalTouch) !== JSON.stringify(this.initialTouch)) return true;
    }

    return false;
  }
}
