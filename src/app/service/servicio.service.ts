import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostResponse } from '../interfaces/post.interface';
import { environment } from 'src/environments/environment';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private files ='http://localhost:3000/api/global-form/default'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  constructor(private http: HttpClient){}



  getPosts(){

    const url: string = `${this.files}`;
     
    return this.http.get<PostResponse>(url);
  }

  deleteControl(controlId: string) {
    const url: string = `${ this.files }${ controlId }`;
    return this.http.delete<any>(url);
  }
}
