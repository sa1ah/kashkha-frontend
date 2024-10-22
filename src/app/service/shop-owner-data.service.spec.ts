import { TestBed } from '@angular/core/testing';

import { ShopOwnerDataService } from './shop-owner-data.service';

describe('ShopOwnerDataService', () => {
  let service: ShopOwnerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopOwnerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
