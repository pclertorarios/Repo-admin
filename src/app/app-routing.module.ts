import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserComponent } from './pages/admin-user/admin-user.component';
import { BmlControlComponent } from './pages/bml-control/bml-control.component';
import { RepositorioComponent } from './pages/repositorio/repositorio.component';

const routes: Routes = [
  {
    path: 'bmc',
    component: BmlControlComponent
  },
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
