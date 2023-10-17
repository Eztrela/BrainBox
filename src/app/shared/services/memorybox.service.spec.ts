import { TestBed } from '@angular/core/testing';

import { MemoryboxService } from './memorybox.service';

describe('MemoryboxService', () => {
  let service: MemoryboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemoryboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
