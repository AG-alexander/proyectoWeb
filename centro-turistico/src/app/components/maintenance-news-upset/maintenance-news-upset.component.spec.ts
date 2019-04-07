import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceNewsUpsetComponent } from './maintenance-news-upset.component';

describe('MaintenanceNewsUpsetComponent', () => {
  let component: MaintenanceNewsUpsetComponent;
  let fixture: ComponentFixture<MaintenanceNewsUpsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceNewsUpsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceNewsUpsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
