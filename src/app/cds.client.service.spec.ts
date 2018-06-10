import { TestBed, inject } from '@angular/core/testing';

import { CdsClientService } from './cds.client.service';

describe('CdsClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CdsClientService]
    });
  });

  it('should be created', inject([CdsClientService], (service: CdsClientService) => {
    expect(service).toBeTruthy();
  }));
});
