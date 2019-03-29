import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteRatingComponent } from './site-rating.component';

describe('SiteRatingComponent', () => {
  let component: SiteRatingComponent;
  let fixture: ComponentFixture<SiteRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
