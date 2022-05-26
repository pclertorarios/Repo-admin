import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Control, PostResponse, Subcategory } from '../interfaces/post.interface';
import { HttpClient } from '@angular/common/http';
import { ServicioService } from '../service/servicio.service';


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
/*
  deleteControl(control: Control) {
    const controlId = this.getControl(control) || '';
    this.servicioService.deleteControl(control)
      .subscribe();
  }
 */

}
