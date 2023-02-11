import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TouchEventHandlerService } from 'src/app/service/touch-event-handler.service';
import { UserRequisitionService } from 'src/app/service/user-requisition.service';

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public invalidUser: boolean = false;
  // será utilizado para criar um loading no botão de fazer login. Este loading ficará visível enquanto a requisição não retornar.
  public openRequisition: boolean = false;
  public redirect = "";

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
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userRequisitionService: UserRequisitionService,
    private touchEventHandlerService: TouchEventHandlerService
  ) { }

  ngOnInit(): void {
      
    this.activatedRoute.queryParams.subscribe(queryParam => {

      this.redirect = queryParam["redirect"];
    });
  }

  public changeToPassword(e: KeyboardEvent, password: HTMLInputElement) {

    if (e.key !== "Enter") return;

    password.focus();
  }

  private login() {

    if (this.credentials.valid) {

      this.openRequisition = true;

      this.userRequisitionService.signIn(
        this.credentials.value.email as string,
        this.credentials.value.password as string
      )
        .subscribe({
          next: httpResponse => {

            if(httpResponse.status === 204) {

              this.invalidUser = false;
            }
            this.openRequisition = false;
          },
          error: (httpResponse: HttpErrorResponse) => {

            if(httpResponse.status === 401) {

              this.invalidUser = true;
            }
            this.openRequisition = false;
          }
        });
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
