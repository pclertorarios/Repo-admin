import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Control, PostResponse, Subcategory } from '../interfaces/post.interface';
import { HttpClient } from '@angular/common/http';
import { ServicioService } from '../service/servicio.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../component/dialog/dialog2.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{

  files!: PostResponse;
  categories: Category[] = [];
  subCategories: Subcategory[] = [];
  controls: Control[] = [];

  panelMainState = false;
  panelCategoryState = false;
  panelSubCategoryState = false;
  panelCaontrolState = false;

  private getFileId(files: PostResponse) {
    return files._id;
  }

  constructor(private servicioService: ServicioService, private router:Router, private dialog: MatDialog) {}

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

  addNewCategory() {
    this.dialog.open( DialogComponent, {
      width: '50rem',
      data: {
        withCategory: false,
        category: { name: '',subcategory: '', shortName:'' }
      }
    });
  }

  addNewSubcategory(subcategory: string) {
    this.dialog.open( DialogComponent, {
      width: '50rem',
      data: {
        withsubCategory: true,

        subcategory: {name: '',controls:''}
      }
    } );
  }
  deleteFile(file: PostResponse) {
    const fileId = this.getFileId(file) || '';
    this.servicioService.deleteFile(fileId)
      .subscribe();
  }

}
