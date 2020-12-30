import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAddDialogData } from '../models/iadd-dialog-data';

@Component({
  selector: 'app-add-library-modal',
  templateUrl: './add-library-modal.component.html',
  styleUrls: ['./add-library-modal.component.css']
})
export class AddLibraryModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddLibraryModalComponent>,
              @Inject(MAT_DIALOG_DATA)public data: IAddDialogData) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
