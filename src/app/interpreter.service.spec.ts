import { TestBed, inject } from '@angular/core/testing';

import { InterpreterService } from './interpreter.service';

describe('InterpreterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterpreterService]
    });
  });

  it('should be created', inject([InterpreterService], (service: InterpreterService) => {
    expect(service).toBeTruthy();
  }));
});
