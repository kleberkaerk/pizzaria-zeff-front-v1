import { TestBed } from '@angular/core/testing';

import { UserRequisitionService } from './user-requisition.service';

describe('UserRequisitionService', () => {
  let service: UserRequisitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRequisitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
