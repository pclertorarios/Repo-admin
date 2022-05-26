import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { RepositoryResponse } from '../../interfaces/repository.interface';

@Component({
  selector: 'app-repositorio',
  templateUrl: './repositorio.component.html',
  styleUrls: ['./repositorio.component.scss']
})
export class RepositorioComponent implements OnInit {

  files!: RepositoryResponse[];
  categories: string[] = [];
  panelMainState = false;
  panelCategoryState = false;

  private getFileId(file: RepositoryResponse) {
    return file._id;
  }

  constructor( private repositoryService: RepositoryService,
               public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.repositoryService.getRepositories()
      .subscribe( files => {
        this.files = files;
        this.files.forEach(file => {
          if (!this.categories.includes(file.category)) {
            this.categories.push(file.category);
          }
        });
      });
  }

  addNewRepositoryFile() {
    this.dialog.open( DialogComponent, {
      width: '50rem',
      data: {
        withCategory: false,
        category: { name: '', category: '', link: '' }
      }
    });
  }

  addNewFile(category: string) {
    this.dialog.open( DialogComponent, {
      width: '50rem',
      data: {
        withCategory: true,
        category: category
      }
    } );
  }

  deleteFile(file: RepositoryResponse) {
    const fileId = this.getFileId(file) || '';
    this.repositoryService.deleteFile(fileId)
      .subscribe();
  }

}
