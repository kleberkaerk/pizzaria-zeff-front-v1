import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { UserRequisitionService } from 'src/app/service/user-requisition.service';
import { UserSessionService } from 'src/app/service/user-session.service';
import { Router } from '@angular/router';
import { TouchEventHandlerService } from 'src/app/service/touch-event-handler.service';
import { User } from 'src/app/domain/user';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  public redirect = "";
  // será utilizado para criar um loading no botão de fazer Criar conta. Este loading ficará visível enquanto a requisição não retornar.
  public openRequisition = false;
  public differentPasswords = false;
  // public errorMessage = "";
  public errorInRequest = false;

  public registerData = this.formBuilder.group({
    name: ["", [
      Validators.required,
      Validators.pattern("([a-zA-Záéíóúâêîôûãõ]{2,})"),
      Validators.maxLength(100)]
    ],
    email: ["", [
      Validators.required,
      Validators.pattern("([a-zA-Z0-9]|[a-zA-Z0-9][\\.])*([a-zA-Z0-9])@[a-zA-Z]{1,}(\\.[a-zA-Z]{2,})+")]
    ],
    password: ["", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(150)]
    ],
    passwordConfirmation: ["", [
      Validators.required]
    ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userRequisitionService: UserRequisitionService,
    private userSessionService: UserSessionService,
    private router: Router,
    private touchEventHandlerService: TouchEventHandlerService
  ) { }

  public changeToNext(e: KeyboardEvent, nextElement: HTMLInputElement) {

    if (e.key !== "Enter") return;

    nextElement.focus();
  }

  private successHandling(httpResponse: HttpResponse<void>, username: string, password: string) {

    this.openRequisition = false;

    if (httpResponse.status === 204) {

      this.userSessionService.setUserSession(username, password);
      this.router.navigate([this.redirect]);
    } else {

      this.errorInRequest = true;
    }
  }

  private errorHandling(httpResponse: HttpErrorResponse) {

    this.openRequisition = false;

    if (httpResponse.status === 401) {

      // this.invalidUser = true;
    } else {

      this.errorInRequest = true;
    }
  }

  private checkForDifferentPasswords(): boolean {

    if (JSON.stringify(this.registerData.value.passwordConfirmation) !== JSON.stringify(this.registerData.value.password)) {

      return true;
    } else {

      return false;
    }
  }

  private createUserToBeRegistered():User {

    return new User(
      (this.registerData.value.name as string).trim(),
      (this.registerData.value.email as string).trim(),
      this.registerData.value.password as string
    );
  }

  private registration() {

    if (this.checkForDifferentPasswords()) {

      this.differentPasswords = true;
      return;
    }

    if (this.registerData.valid) {

      this.openRequisition = true;

      const user = this.createUserToBeRegistered();

      this.userRequisitionService.signUp(user).subscribe({
        next: httpResponse => {

          console.log(httpResponse);

          // this.successHandling(httpResponse, username, password);
        },
        error: (httpErrorResponse: HttpErrorResponse) => {

          console.log(httpErrorResponse);
          // this.errorHandling(httpErrorResponse);
        }
      });
    }
  }

  public registrationWithKeyboard(e: KeyboardEvent) {

    if (e.key !== "Enter") return;

    this.registration();
  }

  public setInitialTouchPoint(e: TouchEvent) {

    this.touchEventHandlerService.setInitialTouchPoint(e);
  }

  public registrationWithButton(e: Event) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);

    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    this.registration();
  }
}
