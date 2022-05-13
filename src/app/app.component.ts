import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicioService } from './service/servicio.service';
import { PostResponse } from './interfaces/post.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ngOnInit(): void {
    this.servicioService.getPosts().subscribe(post => {
      this.posts = post;
    });
  }


  readonly ROOT_URL ='http://localhost:3000/api/global-form/default'

  posts!: PostResponse;

  constructor(private servicioService:ServicioService){
    }

}
