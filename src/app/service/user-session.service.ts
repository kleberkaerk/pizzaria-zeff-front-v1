import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  userInSessionSubject = new Subject<boolean>();

  public checkUserSession(): boolean {

    if (sessionStorage.getItem("credentials")) {

      return true;
    } else {

      return false;
    }
  }

  public setUserSession(username: string, password: string) {

    const sessionValue = window.btoa(username + ":" + password);

    sessionStorage.setItem("credentials", sessionValue);

    this.userInSessionSubject.next(true);
  }

  public getUserSession(): string {

    return sessionStorage.getItem("credentials") as string;
  }

  public signOutTheUser() {

    sessionStorage.removeItem("credentials");

    this.userInSessionSubject.next(false);
  }
}
