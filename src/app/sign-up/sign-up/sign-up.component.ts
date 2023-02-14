import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { UserRequisitionService } from 'src/app/service/user-requisition.service';
import { UserSessionService } from 'src/app/service/user-session.service';
import { ActivatedRoute } from '@angular/router';
import { TouchEventHandlerService } from 'src/app/service/touch-event-handler.service';
import { User } from 'src/app/domain/user';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public redirect = "";
  // será utilizado para criar um loading no botão de fazer Criar conta. Este loading ficará visível enquanto a requisição não retornar.
  public openRequisition = false;
  public differentPasswords = false;
  public userToBeRegistered!: User;
  public successInRegisteringUser = false;
  public emailConflictMessage = "";
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
    private activatedRoute: ActivatedRoute,
    private userRequisitionService: UserRequisitionService,
    private userSessionService: UserSessionService,
    private touchEventHandlerService: TouchEventHandlerService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(queryParam => {

      this.redirect = queryParam["redirect"];
    });
  }

  public changeToNext(e: KeyboardEvent, nextElement: HTMLInputElement) {

    if (e.key !== "Enter") return;

    nextElement.focus();
  }

  private successHandling(httpResponse: HttpResponse<void>) {

    this.openRequisition = false;

    if (httpResponse.status === 201) {

      this.userSessionService.setUserSession(
        this.userToBeRegistered.getUsername,
        this.userToBeRegistered.getPassword
      );

      this.successInRegisteringUser = true;
    } else {

      this.errorInRequest = true;
    }
  }

  private errorHandling(httpErrorResponse: HttpErrorResponse) {

    this.openRequisition = false;

    if (httpErrorResponse.status === 409) {

      this.emailConflictMessage = httpErrorResponse.error.message;
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

  private createUserToBeRegistered(): User {

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

      this.userToBeRegistered = this.createUserToBeRegistered();

      this.userRequisitionService.signUp(this.userToBeRegistered).subscribe({
        next: httpResponse => {

          this.successHandling(httpResponse);
        },
        error: (httpErrorResponse: HttpErrorResponse) => {

          this.errorHandling(httpErrorResponse);
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
