import {Component, inject, model} from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {BarcodeFormat} from '@zxing/library';
@Component({
  selector: 'app-camera-dialog',
  imports: [
    CommonModule,
    ZXingScannerModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './camera-dialog.component.html',
  styleUrl: './camera-dialog.component.css'
})
export class CameraDialogComponent {

  public readonly dialogRef = inject(MatDialogRef<CameraDialogComponent>);
  public readonly scanned = model('')
  public barcodes = [
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_93,
    BarcodeFormat.CODE_128,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.UPC_EAN_EXTENSION,
    BarcodeFormat.EAN_8,
    BarcodeFormat.EAN_13
  ]

  public hasDevices = false;
  public availableDevices: MediaDeviceInfo[] = [];
  public selectedDevice: MediaDeviceInfo | undefined;

  public onClose(): void {
    this.dialogRef.close(this.scanned());
  }

  public onCodeResult(result: string): void {
    console.log(result);
    this.scanned.set(result);
    this.onClose()
  }

  public onDeviceChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedDevice = this.availableDevices.find(d => d.deviceId === target.value);
  }

  public onHasDevices(event: boolean): void {
    this.hasDevices = true;
  }

  public onDevicesFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    if(devices.length > 0) {
      this.selectedDevice = this.availableDevices[0]
      this.hasDevices = true;
    }
  }

  public onError(error: any): void {
    console.error('Barcode scanning error', error);
  }
}
