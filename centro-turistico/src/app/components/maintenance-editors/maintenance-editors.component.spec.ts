import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceEditorsComponent } from './maintenance-editors.component';

describe('MaintenanceEditorsComponent', () => {
  let component: MaintenanceEditorsComponent;
  let fixture: ComponentFixture<MaintenanceEditorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceEditorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceEditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
