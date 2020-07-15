import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrikersComponent } from './strikers.component';

describe('StrikersComponent', () => {
  let component: StrikersComponent;
  let fixture: ComponentFixture<StrikersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrikersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrikersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
