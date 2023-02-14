import { TestBed } from '@angular/core/testing';

import { AddressRequisitionService } from './address-requisition.service';

describe('AddressRequisitionService', () => {
  let service: AddressRequisitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressRequisitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
