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

  private files ='https://tesis-pry-api.azurewebsites.net/api/global-form/default'
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

  updateGlobalForm(body:any){
    const url: string = `https://tesis-pry-api.azurewebsites.net/api/global-form/update-default`;
    return this.http.put<any>(url, body).subscribe(response =>{console.log(response)});

  }
}
