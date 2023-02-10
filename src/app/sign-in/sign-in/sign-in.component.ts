import { Component, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TouchEventHandlerService } from 'src/app/service/touch-event-handler.service';

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  public credentials = this.formBuilder.group({
    email: ["", [
      Validators.required,
      Validators.pattern("([a-zA-Z0-9]|[a-zA-Z0-9][\\.])*([a-zA-Z0-9])@[a-zA-Z]{1,}(\\.[a-zA-Z]{2,})+"),
      Validators.maxLength(150)]
    ],
    password: ["", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(150)]
    ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private touchEventHandlerService: TouchEventHandlerService
  ) { }

  public changeToPassword(e: KeyboardEvent, password: HTMLInputElement) {

    if (e.key !== "Enter") return;

    password.focus();
  }

  private login() {

    if (this.credentials.valid) {

      console.log("Executou");
    }
  }

  public loginWithKeyboard(e: KeyboardEvent) {

    if (e.key !== "Enter") return;

    this.login();
  }

  public setInitialTouchPoint(e: TouchEvent) {

    this.touchEventHandlerService.setInitialTouchPoint(e);
  }

  public loginWithButton(e: Event) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);
    
    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    this.login();
  }
}
