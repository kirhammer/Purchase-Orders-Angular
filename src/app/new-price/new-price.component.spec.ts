import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPriceComponent } from './new-price.component';

describe('NewPriceComponent', () => {
  let component: NewPriceComponent;
  let fixture: ComponentFixture<NewPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
