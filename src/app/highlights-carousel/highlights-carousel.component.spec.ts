import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightsCarouselComponent } from './highlights-carousel.component';

describe('HighlightsCarouselComponent', () => {
  let component: HighlightsCarouselComponent;
  let fixture: ComponentFixture<HighlightsCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightsCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
