import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserComponent } from './pages/admin-user/admin-user.component';
import { RepositorioComponent } from './pages/repositorio/repositorio.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminUserComponent
  },
  {
    path: 'repository',
    component: RepositorioComponent
  },
  {
    path: '**',
    redirectTo: 'admin'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
