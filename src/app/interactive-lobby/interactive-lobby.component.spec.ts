import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveLobbyComponent } from './interactive-lobby.component';

describe('InteractiveLobbyComponent', () => {
  let component: InteractiveLobbyComponent;
  let fixture: ComponentFixture<InteractiveLobbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractiveLobbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
