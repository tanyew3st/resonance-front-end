import { TestBed, inject } from '@angular/core/testing';

import { DonorServiceService } from './donor-service.service';

describe('DonorServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DonorServiceService]
    });
  });

  it('should be created', inject([DonorServiceService], (service: DonorServiceService) => {
    expect(service).toBeTruthy();
  }));
});
