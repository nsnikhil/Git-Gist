import { TestBed, inject } from '@angular/core/testing';

import { NetworkApiService } from './network-api.service';

describe('NetworkApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkApiService]
    });
  });

  it('should be created', inject([NetworkApiService], (service: NetworkApiService) => {
    expect(service).toBeTruthy();
  }));
});
