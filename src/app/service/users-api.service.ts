import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserInterface} from "../models/User.interface";
import {UpdateUserInterface} from "../models/UpdateUser.interface";


@Injectable({
  providedIn: 'root'
})
export class UsersService{
  readonly ROOT_URL ='http://localhost:3000/api/global-form/default'
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<UserInterface[]>{
    const url: string = `${ this.ROOT_URL }/users`;
    return this.http.get<UserInterface[]>(url);
  }

  getUserById(userId: number) : Observable<UserInterface>{
    const url: string = `${ this.ROOT_URL }/users/${userId}`;
    return this.http.get<UserInterface>(url);
  }

  updateUser(userId: number, updateData: UpdateUserInterface): Observable<UserInterface>{
    const url: string = `${ this.ROOT_URL }/users/${userId}`;
    return this.http.put<UserInterface>(url, updateData);
  }

  deleteUser(userId: number){
    const url: string = `${ this.ROOT_URL }/users/${userId}`;
    return this.http.delete(url);
  }

}
