import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraDialogComponent } from './camera-dialog.component';
import {MatDialogRef} from "@angular/material/dialog";

describe('CameraDialogComponent', () => {
  let component: CameraDialogComponent;
  let fixture: ComponentFixture<CameraDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CameraDialogComponent],
      providers: [{provide: MatDialogRef, useValue: {}}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
