import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceTouristicProfileUpSetComponent } from './maintenance-touristic-profile-up-set.component';

describe('MaintenanceTouristicProfileUpSetComponent', () => {
  let component: MaintenanceTouristicProfileUpSetComponent;
  let fixture: ComponentFixture<MaintenanceTouristicProfileUpSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceTouristicProfileUpSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceTouristicProfileUpSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
