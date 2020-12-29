import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLibrariesComponent } from './view-libraries.component';

describe('ViewLibrariesComponent', () => {
  let component: ViewLibrariesComponent;
  let fixture: ComponentFixture<ViewLibrariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLibrariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLibrariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
