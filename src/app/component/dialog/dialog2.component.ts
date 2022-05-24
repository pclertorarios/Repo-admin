import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ServicioService } from '../../service/servicio.service';
import { PostResponse, Category } from '../../interfaces/post.interface';

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
  
    newCategory: Category = { name: '', subcategories: []};
    myForm: FormGroup = this.fb.group({
      name: [ , [ Validators.required, Validators.minLength(1) ] ],
      subcategory: [ , [ Validators.required, Validators.minLength(1) ]],
    });
  
    constructor( private servicioService: ServicioService,
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
      this.newCategory.name = this.myForm.value['name'];
      this.newCategory.subcategories = this.myForm.value['subcategory'];
  
      if(!this.isServicioCategory()) {
        this.newCategory.subcategories = this.myForm.value['subcategory'];
      } else {
        this.newCategory.subcategories = this.data.subcategory;
      }
  
      this.servicioService.createFile(this.newCategory)
        .subscribe();
  
      this.newCategory = { name: '', subcategories: ''};
      this.myForm.reset();
      this.dialogRef.close();
    }
  
  }
