import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  private nextSlide = 2;
  public intervalId!: number;

  ngOnInit(): void {

    this.intervalId = window.setInterval(() => {

      let slideButton = document.getElementById("slide-" + this.nextSlide) as HTMLInputElement;

      slideButton.checked = true

      this.nextSlide++;

      if (this.nextSlide > 4) {
        this.nextSlide = 1
      }
    }, 8000)
  }

  public setSlide(e: Event, currentSlide: number) {

    if (e.cancelable && e.type === "touchstart") {

      e.preventDefault();
      const selectedSlide = document.getElementById("slide-" + currentSlide) as HTMLInputElement;
      selectedSlide.checked = true;
    }

    if (currentSlide < 4) {

      this.nextSlide = ++currentSlide;
    } else {

      this.nextSlide = 1;
    }
  }
}
