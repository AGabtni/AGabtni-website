import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteRunner } from './infiniteRunner';

describe('InfiniteRunner', () => {
  let component: InfiniteRunner;
  let fixture: ComponentFixture<InfiniteRunner>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteRunner ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteRunner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
