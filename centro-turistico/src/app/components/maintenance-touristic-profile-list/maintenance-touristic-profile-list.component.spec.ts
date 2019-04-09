import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceTouristicProfileListComponent } from './maintenance-touristic-profile-list.component';

describe('MaintenanceTouristicProfileListComponent', () => {
  let component: MaintenanceTouristicProfileListComponent;
  let fixture: ComponentFixture<MaintenanceTouristicProfileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceTouristicProfileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceTouristicProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
