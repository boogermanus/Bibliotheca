import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryUsersComponent } from './library-users.component';

describe('LibraryUsersComponent', () => {
  let component: LibraryUsersComponent;
  let fixture: ComponentFixture<LibraryUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
