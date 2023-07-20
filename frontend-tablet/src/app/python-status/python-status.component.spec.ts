import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythonStatusComponent } from './python-status.component';

describe('PythonStatusComponent', () => {
  let component: PythonStatusComponent;
  let fixture: ComponentFixture<PythonStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PythonStatusComponent]
    });
    fixture = TestBed.createComponent(PythonStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
