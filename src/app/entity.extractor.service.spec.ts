import { TestBed, inject } from '@angular/core/testing';

import { EntityExtractorService } from './entity.extractor.service';

describe('Entity.ExtractorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntityExtractorService]
    });
  });

  it('should be created', inject([EntityExtractorService], (service: EntityExtractorService) => {
    expect(service).toBeTruthy();
  }));
});
