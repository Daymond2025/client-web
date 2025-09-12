import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionPopupComponent } from './condition-popup.component';

describe('ConditionPopupComponent', () => {
  let component: ConditionPopupComponent;
  let fixture: ComponentFixture<ConditionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
