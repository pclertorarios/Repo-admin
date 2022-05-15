import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NewFileData } from 'src/app/interfaces/dialog-data.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styles: [
    `
    .container {
      display: flex;
      justify-content: space-between;
    }
    `
  ]
})
export class DialogComponent {

  constructor() {}

  // constructor(
  //   public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
  //   @Inject(MAT_DIALOG_DATA) public data: NewFileData,
  // ) {}

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
