import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-functionality-under-development',
  templateUrl: './functionality-under-development.component.html',
  styleUrls: ['./functionality-under-development.component.css']
})
export class FunctionalityUnderDevelopmentComponent {

  @Output() public eventEmitterForClosing = new EventEmitter();

  public closeFunctionalityUnderDevelopmentComponent() {

    this.eventEmitterForClosing.emit();
  }
}
