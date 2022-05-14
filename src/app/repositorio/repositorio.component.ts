import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../service/repository.service';
import { RepositoryResponse } from '../interfaces/repository.interface';
import { Router } from '@angular/router';


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
               private router: Router ) { }

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

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }


}
