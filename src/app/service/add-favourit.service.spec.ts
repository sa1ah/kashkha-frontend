import { TestBed } from '@angular/core/testing';

import { AddFavouritService } from './add-favourit.service';

describe('AddFavouritService', () => {
  let service: AddFavouritService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddFavouritService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
