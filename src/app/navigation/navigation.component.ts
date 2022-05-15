import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostResponse } from '../interfaces/post.interface'; 
import { HttpClient } from '@angular/common/http';
import { ServicioService } from '../service/servicio.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{

  files!: PostResponse[];
  categories: string[] = [];
  panelMainState = false;
  panelCategoryState = false;



  constructor(private servicioService: ServicioService, private router:Router) {}
  ngOnInit(): void {
    this.servicioService.getPosts()
    .subscribe( files => {
      this.files = files;
      this.files.forEach(file => {
        if (!this.categories.includes(file.category)) {
          this.categories.push(file.category);
        }
      });
    });
}

}