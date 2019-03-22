import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristicCentresComponent } from './touristic-centres.component';

describe('TouristicCentresComponent', () => {
  let component: TouristicCentresComponent;
  let fixture: ComponentFixture<TouristicCentresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouristicCentresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouristicCentresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
