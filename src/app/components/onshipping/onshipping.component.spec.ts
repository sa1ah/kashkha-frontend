import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnshippingComponent } from './onshipping.component';

describe('OnshippingComponent', () => {
  let component: OnshippingComponent;
  let fixture: ComponentFixture<OnshippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnshippingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnshippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
