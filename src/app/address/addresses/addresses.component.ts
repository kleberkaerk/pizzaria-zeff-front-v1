import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/domain/address';
import { AddressRequisitionService } from 'src/app/service/address-requisition.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  public addresses = new Array<Address>();

  constructor(
    private addressRequisitionService: AddressRequisitionService
  ) { }

  ngOnInit(): void {

    this.addressRequisitionService.findUserAddress()
      .subscribe(addresses => {

        this.addresses = addresses;
      });
  }
}
