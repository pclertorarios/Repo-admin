import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RepositoryResponse } from '../interfaces/repository.interface';
import { NewFileData } from '../interfaces/dialog-data.interface';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  private baseUrl: string = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  getRepositories() {
    const url: string = `${ this.baseUrl }/files`;
    return this.http.get<RepositoryResponse[]>(url);
  }

  createFile(file: RepositoryResponse) {
    const url: string = `${ this.baseUrl }/files`;
    return this.http.post<RepositoryResponse>(url, file);
  }

  deleteFile(fileId: string) {
    const url: string = `${ this.baseUrl }/files/${ fileId }`;
    return this.http.delete<any>(url);
  }
}
