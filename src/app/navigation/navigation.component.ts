import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Control, PostResponse, Subcategory } from '../interfaces/post.interface';
import { HttpClient } from '@angular/common/http';
import { ServicioService } from '../service/servicio.service';

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
  private getFileId(file: PostResponse) {
    return file._id;
  }

  constructor(private servicioService: ServicioService, private router:Router) {}

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

 

}
