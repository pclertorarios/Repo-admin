import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";
import {UserInterface} from "../models/User.interface";
import {UpdateUserInterface} from "../models/UpdateUser.interface";


@Injectable({
  providedIn: 'root'
})
export class UsersService{
  readonly ROOT_URL ='http://localhost:3000/api'
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<UserInterface[]>{
    const url: string = `${ this.ROOT_URL }/users`;
    return this.http.get<UserInterface[]>(url);
  }

  getUserById(userId: any) : Observable<UserInterface>{
    const url: string = `${ this.ROOT_URL }/users/${ userId }`;
    return this.http.get<UserInterface>(url);
  }

  updateUser(userId: any, updateData: UpdateUserInterface): Observable<UserInterface>{
    const url: string = `${ this.ROOT_URL }/users/${ userId }`;
    return this.http.put<UserInterface>(url, JSON.stringify(updateData));
  }

  deleteUser(userId: any){
    const url: string = `${ this.ROOT_URL }/users/${ userId }`;
    return this.http.delete<any>(url);
  }

}
