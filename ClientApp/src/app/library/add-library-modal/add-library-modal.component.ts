import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-library-modal',
  templateUrl: './add-library-modal.component.html',
  styleUrls: ['./add-library-modal.component.css']
})
export class AddLibraryModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddLibraryModalComponent>) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
