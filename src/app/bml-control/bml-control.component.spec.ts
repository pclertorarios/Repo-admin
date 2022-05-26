import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmlControlComponent } from './bml-control.component';

describe('BmlControlComponent', () => {
  let component: BmlControlComponent;
  let fixture: ComponentFixture<BmlControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BmlControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmlControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
