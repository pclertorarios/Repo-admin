import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../service/repository.service';
import { RepositoryResponse } from '../interfaces/repository.interface';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';


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

  addNewFile() {
    this.dialog.open( DialogComponent, {
      width: '50rem'
    } );
  }

}
