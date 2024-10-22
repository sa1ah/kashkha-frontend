import { TestBed } from '@angular/core/testing';

import { ForYouItemService } from './for-you-item.service';

describe('ForYouItemService', () => {
  let service: ForYouItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForYouItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
