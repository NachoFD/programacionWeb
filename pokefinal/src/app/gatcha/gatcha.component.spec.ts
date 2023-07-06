import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatchaComponent } from './gatcha.component';

describe('GatchaComponent', () => {
  let component: GatchaComponent;
  let fixture: ComponentFixture<GatchaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GatchaComponent]
    });
    fixture = TestBed.createComponent(GatchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
