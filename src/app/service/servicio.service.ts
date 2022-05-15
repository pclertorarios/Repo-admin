import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostResponse } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private files ='http://localhost:3000/api/global-form/default'



  constructor(private http: HttpClient){}



  getPosts(){

    const url: string = `${this.files}`;

    return this.http.get<PostResponse>(url);
  }
}
