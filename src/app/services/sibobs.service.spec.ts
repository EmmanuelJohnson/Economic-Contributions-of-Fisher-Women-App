import { TestBed } from '@angular/core/testing';

import { SibobsService } from './sibobs.service';

describe('SibobsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SibobsService = TestBed.get(SibobsService);
    expect(service).toBeTruthy();
  });
});
