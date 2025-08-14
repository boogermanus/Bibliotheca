import {Component, inject, model} from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-camera-dialog',
  imports: [
    MatDialogModule,
  ],
  templateUrl: './camera-dialog.component.html',
  styleUrl: './camera-dialog.component.css'
})
export class CameraDialogComponent {

  public readonly dialogRef = inject(MatDialogRef<CameraDialogComponent>);
  public readonly scanned = model('')

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
