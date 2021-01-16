import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLibraryUserComponent } from './view-library-user.component';

describe('ViewLibraryUserComponent', () => {
  let component: ViewLibraryUserComponent;
  let fixture: ComponentFixture<ViewLibraryUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLibraryUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLibraryUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
