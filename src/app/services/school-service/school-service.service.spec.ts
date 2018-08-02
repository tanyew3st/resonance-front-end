import { TestBed, inject } from '@angular/core/testing';

import { SchoolServiceService } from './school-service.service';

describe('SchoolServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolServiceService]
    });
  });

  it('should be created', inject([SchoolServiceService], (service: SchoolServiceService) => {
    expect(service).toBeTruthy();
  }));
});
