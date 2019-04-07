import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceNewsListComponent } from './maintenance-news-list.component';

describe('MaintenanceNewsListComponent', () => {
  let component: MaintenanceNewsListComponent;
  let fixture: ComponentFixture<MaintenanceNewsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceNewsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
