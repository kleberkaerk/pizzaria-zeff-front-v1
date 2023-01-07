import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  ngOnInit(): void {

    let i = 2;

    setInterval(() => {

      let slideButton = document.getElementById("slide-" + i) as HTMLInputElement;

      slideButton.checked = true

      i++;

      if (i > 4) {
        i = 1
      }

    }, 8000);
  }
}
