import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public activateAccountOptions = false;
  public activateMobileMenu = false;
  public activateSearch = false;
  public logged = false;
  public username = "Luffy"

  private preventDefaultTouchStart(e: Event) {

    if (e.cancelable && e.type === "touchstart") {
      
      e.preventDefault();
    }
  }

  private handlerClickOutside(e: Event, focusElement: Element, callback: Function) {

    this.preventDefaultTouchStart(e);

    const htmlElement = document.documentElement;

    const externalClickChecker = (e: Event) => {

      if (!focusElement.contains((e.target as HTMLElement))) {

        htmlElement.removeEventListener("click", externalClickChecker);
        htmlElement.removeEventListener("touchstart", externalClickChecker);
        focusElement.removeAttribute("data-to-show");
        callback(false);
      }
    }

    if (!focusElement.hasAttribute("data-to-show")) {

      htmlElement.addEventListener("click", externalClickChecker);
      htmlElement.addEventListener("touchstart", externalClickChecker);
      focusElement.setAttribute("data-to-show", "");
      e.stopPropagation();
      callback(true);
    }
  }

  public accountClickHandler(e: Event, accountOptions: Element): void {

    this.handlerClickOutside(e, accountOptions, (value: boolean)=> {
      this.activateAccountOptions = value;
    });
  }

  public handlerClickMobileMenu(e: Event, menu: Element) {

    if (this.activateAccountOptions) {
      return
    };

      this.handlerClickOutside(e, menu, (value: boolean) => {
        this.activateMobileMenu = value;
      });
  }

  public searchClickHandler(e: Event, form: Element, input: HTMLInputElement) {

    this.handlerClickOutside(e, form, (value: boolean)=> {
      
      if(value) {
        this.activateSearch = true;
        input.focus();
      } else {
        this.activateSearch = false;
      }
    })
  }
}
