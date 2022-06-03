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

  deleteCategory(body:any){
    const url: string = `http://localhost:3000/api/global-form/update-default`;
    return this.http.put<any>(url, body).subscribe(response =>{console.log(response)});

  }

  deleteSubCategory(body: any){
    const url: string = `http://localhost:3000/api/global-form/update-default`;
    return this.http.put<any>(url, body).subscribe(response =>{console.log(response)});
  }

  deleteControl(body: any) {
    const url: string = `http://localhost:3000/api/global-form/update-default`;
    return this.http.put<any>(url, body).subscribe(response =>{console.log(response)});
    
  }
}
