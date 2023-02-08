import { Component, OnInit } from '@angular/core';

import { TouchEventHandlerService } from 'src/app/service/touch-event-handler.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  private currentSlide = 1;
  public intervalId!: number;
  public pausedSlides = false;

  constructor(private touchEventHandlerService: TouchEventHandlerService) { }

  private viewSlide(slideNumber: number) {

    let slideButton = document.getElementById("slide-" + slideNumber) as HTMLInputElement;
    slideButton.checked = true
  }

  private automaticSlideAdvance() {

    this.intervalId = window.setInterval(() => {

      if (this.currentSlide <= 3) {

        ++this.currentSlide;
      } else {

        this.currentSlide = 1
      }

      this.viewSlide(this.currentSlide);
    }, 8000);
  }

  ngOnInit(): void {

    this.automaticSlideAdvance();
  }

  public stopAutomaticSlideAdvance(e: Event) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    window.clearInterval(this.intervalId);

    this.pausedSlides = true;
  }

  public resumeAutomaticSlideAdvance(e: Event) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    this.automaticSlideAdvance();

    this.pausedSlides = false;
  }

  public setInitialTouchPoint(e: TouchEvent) {

    this.touchEventHandlerService.setInitialTouchPoint(e);
  }

  public slideBack(e: Event) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    if (this.currentSlide >= 2) {

      --this.currentSlide;
    } else {

      this.currentSlide = 4;
    }

    this.viewSlide(this.currentSlide);
  }

  public slideAdvance(e: Event) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    if (this.currentSlide <= 3) {

      ++this.currentSlide;
    } else {

      this.currentSlide = 1;
    }

    this.viewSlide(this.currentSlide);
  }

  public setSlide(e: Event, currentSlide: number) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    if (e.type === "touchend") {

      this.viewSlide(currentSlide);
    }

    this.currentSlide = currentSlide;
  }
}
