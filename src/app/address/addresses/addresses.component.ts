import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/domain/address';
import { AddressRequisitionService } from 'src/app/service/address-requisition.service';
import { TouchEventHandlerService } from 'src/app/service/touch-event-handler.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  // será utilizado para criar um loading  no componente. Este loading ficará visível enquanto a requisição não retornar.
  public openRequisition = false;
  public addresses = new Array<Address>();
  // será utilizado para informar ao usuário de que ele deletou um endereço
  public deletedAddress = false;
  public errorInRequest = false;

  constructor(
    private addressRequisitionService: AddressRequisitionService,
    private touchEventHandlerService: TouchEventHandlerService
  ) { }

  ngOnInit(): void {

    this.addressRequisitionService.findUserAddress()
      .subscribe(addresses => {

        this.addresses = addresses;
      });
  }

  public deleteAddress(e: Event, address: Address) {

    e.stopPropagation();

    this.touchEventHandlerService.preventDefaultTouchend(e);
    if (this.touchEventHandlerService.itIsAMovingTouch(e)) return;

    this.openRequisition = true;

    this.addressRequisitionService.deleteAddress(address.getId)
      .subscribe({
        next: httpResponse => {

          if (httpResponse.status === 204) {

            this.deletedAddress = true;
            this.addresses.splice(this.addresses.indexOf(address), 1);

          } else {

            this.errorInRequest = true;
          }

          this.openRequisition = false;
        }
      });
  }
}
