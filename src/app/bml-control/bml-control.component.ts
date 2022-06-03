import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Control, PostResponse, Subcategory } from '../interfaces/post.interface';
import { HttpClient } from '@angular/common/http';
import { ServicioService } from '../service/servicio.service';
import {MatDialogModule} from '@angular/material/dialog'
import { Injectable } from '@angular/core';



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


  constructor(private servicioService: ServicioService, private router:Router, private http: HttpClient) {}

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
/*
  deleteControl(control: Control) {
    const controlId = this.getControl(control) || '';
    this.servicioService.deleteControl(control)
      .subscribe();
  }
 */

  showInfo = (data : any) => {
    console.log('info => ', data)
    console.log('data a eliminar0' , this.files.categories[data.i].subcategories[data.subi].
    controls[data.coni])
    console.log('update old files = > ', this.files)
    let controlCopy = this.files.categories[data.i].subcategories[data.subi].controls
    console.log('controls => ', controlCopy, data.coni)
    controlCopy.map((item, index) => {
      if (index == data.coni){
        item.name = 'EDICION DE CONTROL'
      }
    })
    this.files.categories[data.i].subcategories[data.subi].controls = controlCopy
    console.log('update new files = > ', this.files)
    this.deleteControl(this.files)
  }
  
  DeleteCategory = (data: any)=>{
    console.log('info => ', data)
    console.log('data a eliminar0' , this.files.categories)
    console.log('update old files = > ', this.files)
    let controlCopy = this.files.categories
    console.log('controls => ', controlCopy, data.i.name)
    controlCopy=controlCopy.filter((_,index)=>index!=data)
    this.files.categories = controlCopy
    console.log('update new files = > ', this.files)
    this.deleteCategory(this.files)
  }

  DeleteSubcategory = (data : any) => {
    console.log('info => ', data)
    console.log('data a eliminar0' , this.files.categories[data.i].subcategories[data.subi])
    console.log('update old files = > ', this.files)
    let controlCopy = this.files.categories[data.i].subcategories
    console.log('controls => ', controlCopy, data.subi)
    controlCopy=controlCopy.filter((_,index)=>index!=data.subi)
    this.files.categories[data.i].subcategories = controlCopy
    console.log('update new files = > ', this.files)
    this.deleteSubcategory(this.files)
  }

  DeleteControl = (data : any) => {
    console.log('info => ', data)
    console.log('data a eliminar0' , this.files.categories[data.i].subcategories[data.subi].
    controls[data.coni])
    console.log('update old files = > ', this.files)
    let controlCopy = this.files.categories[data.i].subcategories[data.subi].controls
    console.log('controls => ', controlCopy, data.coni)
    controlCopy=controlCopy.filter((_,index)=>index!=data.coni)
    this.files.categories[data.i].subcategories[data.subi].controls = controlCopy
    console.log('update new files = > ', this.files)
    this.deleteControl(this.files)
  }

 

  deleteCategory (filesToUpdate: any){
    this.servicioService.deleteSubCategory(filesToUpdate)
  }

  deleteSubcategory( fileToUpdate: any){
    this.servicioService.deleteSubCategory(fileToUpdate)
  }

  deleteControl(fileToUpdate: any) {
    // const controlId = this.getControl(controls) || '';
    this.servicioService.deleteControl(fileToUpdate)
    //   .subscribe();
  }

}

