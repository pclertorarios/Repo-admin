import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ServicioService } from 'src/app/service/servicio.service';
import { PostResponse,Category,Subcategory,Control} from 'src/app/interfaces/post.interface';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  
  newcategory: Category={
                      name:'',subcategories:[]};
      myFormCategory: FormGroup = this.fb.group({
        name:[,[Validators.required,Validators.minLength(1)]],
        subcateogries:[,[Validators.required,Validators.min(3)]]
                                              })
    newsubcategory: Subcategory = {
                      name: '', shortName: '',
                      controls: []
                                    };
    myFormSubcategory: FormGroup =this.fb.group({
      name:[,[Validators.required,Validators.min(3)]],
      shortname:[,[Validators.required,Validators.minLength(1)]],
      controls:[,[Validators.required,Validators.minLength(1)]]
    })
    newcontrol: Control = {name: ''}
    myFormControl: FormGroup= this.fb.group({
      name:[,[Validators.required,Validators.minLength(1)]]
    });
  
    constructor(private servicioService:ServicioService,
                private fb:FormBuilder,
                private dialogRef:MatDialogRef<CreateComponent>, 
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
  
    closeDialog()
    {
      this.dialogRef.close();
    }
  
    newCategory(){
      if(this.myFormCategory.invalid){
        this.myFormCategory.markAllAsTouched();
        return;
      }
      this.newcategory.name= this.myFormCategory.value['name'];
      this.newcategory.subcategories= this.myFormCategory.value['subcategories'];
      this.servicioService.updateControl(this.newcategory);
      this.newcategory= {name:'',subcategories:[]}
      this.myFormSubcategory.reset();
      this.dialogRef.close();
    }
  
    newSucategory(){
      if(this.myFormSubcategory.invalid){
        this.myFormSubcategory.markAllAsTouched();
        return;
      }
      this.newsubcategory.name= this.myFormSubcategory.value['name'];
      this.newsubcategory.shortName= this.myFormSubcategory.value['shortname'];
      this.newsubcategory.controls= this.myFormSubcategory.value['controls'];
      this.servicioService.updateControl(this.newsubcategory);
      this.newsubcategory = {name:'',shortName:'',controls:[]}
      this.myFormSubcategory.reset();
      this.dialogRef.close();
    }
  
  
    newControl(){
      if(this.myFormControl.invalid){
        this.myFormControl.markAllAsTouched();
        return;
      } 
      this.newcontrol.name = this.myFormControl.value['name'];
      this.servicioService.updateControl(this.newcontrol);
      this.newcontrol = {name:''}
      this.myFormControl.reset();
      this.dialogRef.close();
    }
    
  
    
  }
  

