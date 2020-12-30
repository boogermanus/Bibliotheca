import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLibraryModalComponent } from './add-library-modal.component';

describe('AddLibraryModalComponent', () => {
  let component: AddLibraryModalComponent;
  let fixture: ComponentFixture<AddLibraryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLibraryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLibraryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
