import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegalosComponent } from './regalos.component';

describe('RegalosComponent', () => {
  let component: RegalosComponent;
  let fixture: ComponentFixture<RegalosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegalosComponent]
    });
    fixture = TestBed.createComponent(RegalosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
