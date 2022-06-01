import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostResponse } from '../interfaces/post.interface';
import { environment } from 'src/environments/environment';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {MatDialogModule} from '@angular/material/dialog'
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

  deleteControl(control: string) {
    const url: string = `${ this.files }/files/${control}`;
    return this.http.delete<any>(url);
    
  }
}
