import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {UserInterface} from "../models/User.interface";
import {UpdateUserInterface} from "../models/UpdateUser.interface";


@Injectable({
  providedIn: 'root'
})
export class UsersService{
  readonly ROOT_URL ='http://localhost:3000/api'
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  constructor(private http: HttpClient) {
  }
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
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
    return this.http.put<UserInterface>(url, JSON.stringify(updateData), this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }

  deleteUser(userId: any){
    const url: string = `${ this.ROOT_URL }/users/${ userId }`;
    return this.http.delete<any>(url);
  }

}
