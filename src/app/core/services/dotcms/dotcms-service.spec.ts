import { TestBed } from '@angular/core/testing';

import { DotcmsService } from './dotcms-service';

describe('DotcmsService', () => {
  let service: DotcmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DotcmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
