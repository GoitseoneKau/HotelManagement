import { TestBed } from '@angular/core/testing';

import { PayfastService } from './payfast.service';

describe('PayfastService', () => {
  let service: PayfastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayfastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
