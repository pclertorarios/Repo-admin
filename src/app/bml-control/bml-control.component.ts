import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Control, PostResponse, Subcategory } from '../interfaces/post.interface';
import { HttpClient } from '@angular/common/http';
import { ServicioService } from '../service/servicio.service';
import {MatDialog, MatDialogModule, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

export interface DialogData {
  title: string;
  input: string;
}


@Component({
  selector: 'app-bml-control',
  templateUrl: './bml-control.component.html',
  styleUrls: ['./bml-control.component.scss']
})
export class BmlControlComponent implements OnInit {

  files!: PostResponse;
  categories: Category[] = [];
  subCategories: Subcategory[] = [];
  controls: Control[] = [];
  panelMainState = false;
  panelCategoryState = false;
  panelSubCategoryState = false;
  panelCaontrolState = false;
  private getControl(control: Control) {
    return control.name;
  }


  constructor(private servicioService: ServicioService, private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.servicioService.getPosts()
    .subscribe( files => {
      this.files = files;
      files.categories.forEach(category => {
        this.categories.push(category);
        category.subcategories.forEach(subcategory => {
          this.subCategories.push(subcategory);
          subcategory.controls.forEach(control => {
            this.controls.push(control);
          });
        });
      });
    });
  }

  showEditDialog = (data: any) => {
    console.log('data => ', data)
    let dialogRef = this.dialog.open(EditDialog, {
      width: '250px', 
      data: {title: data.type, input: data.name}
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == '' || result == undefined)
        return 
      switch (data.type) {
        case 'Categoria':
          this.updateCategory(data.position[0], result)
          break;
        case 'SubCategoria':
          this.updateSubCategory(data.position[0], data.position[1], result)
          break;
        case 'Control':
          this.updateControl(data.position[0], data.position[1], data.position[2], result)
          break;
        default:
          break;
      }
      this.servicioService.updateGlobalForm(this.files)
      console.log('new title => ', result)
    })
  }

  updateCategory = (categoryPos: number, text: string) => {
    this.files.categories.map((item, i) => {
      if (i === categoryPos)
        item.name = text.trim()
    })
  }

  updateSubCategory = (categoryPos: number, subCategoryPos: number, text: string) => {
    this.files.categories[categoryPos].subcategories.map((item, i) => {
      if (i === subCategoryPos)
        item.shortName = text.trim()
    })
  }

  updateControl = (categoryPos: number, subCategoryPos: number,controlPos: number, text: string) => {
    this.files.categories[categoryPos].subcategories[subCategoryPos].controls.map((item, i) => {
      if (i === controlPos)
        item.name = text.trim()
    })
  }

  showAddDialog = (data: any) => {
    console.log('data => ', data)
    let dialogRef = this.dialog.open(CreateDialog, {
      width: '250px', 
      data: {title: data.type, input: ''}
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result == '' || result == undefined)
        return 
      switch (data.type) {
        case 'Categoria':
          this.addCategory(result)
          break;
        case 'SubCategoria':
          this.addSubCategory(data.position[0], result)
          break;
        case 'Control':
          this.addControl(data.position[0], data.position[1], result)
          break;
        default:
          break;
      }
      this.servicioService.updateGlobalForm(this.files)
      console.log('new title => ', result)
    })
  }

  addCategory = ( text: string) => {
    const category : Category = {name: text.trim(), subcategories: []}
    this.files.categories.push(category)
  }

  addSubCategory = (categoryPos: number, text: string) => {
    const subCategory : Subcategory = {name: text.trim(), controls: [], shortName: text}
    this.files.categories[categoryPos].subcategories.push(subCategory)
  }

  addControl = (categoryPos: number, subCategoryPos: number, text: string) => {
    const control : Control = {name: text.trim()}
    this.files.categories[categoryPos].subcategories[subCategoryPos].controls.push(control)
  }
  
  deleteCategory = (categoryPos: number)=>{
    let categoriesCopy = this.files.categories
    categoriesCopy = categoriesCopy.filter((_,index) => index != categoryPos)
    this.files.categories = categoriesCopy
    this.servicioService.updateGlobalForm(this.files)
  }

  deleteSubcategory = (categoryPos: number, subCategoryPos: number) => {
    let subCategoiesCopy = this.files.categories[categoryPos].subcategories
    subCategoiesCopy = subCategoiesCopy.filter((_,index) => index != subCategoryPos)
    this.files.categories[categoryPos].subcategories = subCategoiesCopy
    this.servicioService.updateGlobalForm(this.files)
  }

  deleteControl = (categoryPos: number, subCategoryPos: number, controlPos: number) => {
    let controlCopy = this.files.categories[categoryPos].subcategories[subCategoryPos].controls
    controlCopy=controlCopy.filter((_,index) => index != controlPos)
    this.files.categories[categoryPos].subcategories[subCategoryPos].controls = controlCopy
    this.servicioService.updateGlobalForm(this.files)
  }
}

@Component({
  selector: 'dialog-overview-create-dialog',
  templateUrl: '../dialogs/create/create.component.html',
})
export class CreateDialog {
  constructor(
    public dialogRef: MatDialogRef<CreateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-overview-edit-dialog',
  templateUrl: '../dialogs/update/update.component.html',
})
export class EditDialog {
  constructor(
    public dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}