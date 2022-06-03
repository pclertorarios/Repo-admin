import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ServicioService } from 'src/app/service/servicio.service';
import { PostResponse,Category,Subcategory,Control} from 'src/app/interfaces/post.interface';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})


export class UpdateComponent implements OnInit {

  categoryupdate: Category={
                    name:'',subcategories:[]};
    myFormCategory: FormGroup = this.fb.group({
      name:[,[Validators.required,Validators.minLength(1)]],
      subcateogries:[,[Validators.required,Validators.min(3)]]
    })
  subcategoryupdate: Subcategory = {
                    name: '', shortName: '',
                    controls: []
  };
  myFormSubcategory: FormGroup =this.fb.group({
    name:[,[Validators.required,Validators.min(3)]],
    shortname:[,[Validators.required,Validators.minLength(1)]],
    controls:[,[Validators.required,Validators.minLength(1)]]
  })
  controlupdate: Control = {name: ''}
  myFormControl: FormGroup= this.fb.group({
    name:[,[Validators.required,Validators.minLength(1)]]
  });

  constructor(private servicioService:ServicioService,
              private fb:FormBuilder,
              private dialogRef:MatDialogRef<UpdateComponent>, 
              @Inject(MAT_DIALOG_DATA)public data: any) { }

  ngOnInit(): void {
    const category: string = this.data.withCategory ? 'zzz': '';
    this.myFormCategory.reset({
      name:'',
      subcategory: '',
    })
    const subcategory: string=this.data.withsuCategory ? 'zzz': '';
    this.myFormSubcategory.reset({
      name:'',
      shortname: '',
      controls:[]
    })
    this.myFormControl.reset({
      name:'',
    })
    
  }

}


