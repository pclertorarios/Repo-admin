import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RepositoryService } from 'src/app/services/repository.service';
import { RepositoryResponse } from '../../interfaces/repository.interface';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styles: [
    `
    mat-form-field {
      width: 100%
    }
    .container {
      display: flex;
      justify-content: flex-start;
      gap: 20px;
    }
    `
  ]
})
export class DialogComponent implements OnInit {

  newFile: RepositoryResponse = { name: '', category: '', link: '' };
  myForm: FormGroup = this.fb.group({
    name: [ , [ Validators.required, Validators.minLength(1) ] ],
    link: [ , [ Validators.required, Validators.minLength(3) ]],
    category: [ , [ Validators.required, Validators.minLength(1) ]]
  });

  constructor( private repositoryService: RepositoryService,
               private dialogRef: MatDialogRef<DialogComponent>,
               private fb: FormBuilder,
               @Inject(MAT_DIALOG_DATA) public data: any ) {}

  ngOnInit(): void {
    const category: string = this.data.withCategory ? 'zzz' : '';
    this.myForm.reset({
      name: '',
      link: '',
      category: category
    });
  }

  fieldIsValid( field: string ): boolean | null {
    return this.myForm.controls[field].errors
        && this.myForm.controls[field].touched;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  isRepositoryFile(): boolean {
    return this.data.withCategory;
  }

  addFile() {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.newFile.name = this.myForm.value['name'];
    this.newFile.link = this.myForm.value['link'];

    if(!this.isRepositoryFile()) {
      this.newFile.category = this.myForm.value['category'];
    } else {
      this.newFile.category = this.data.category;
    }

    this.repositoryService.createFile(this.newFile)
      .subscribe();

    this.newFile = { name: '', category: '', link: '' };
    this.myForm.reset();
    this.dialogRef.close();
  }

}
