import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './material/material.module';

// Pages
import { AppComponent } from './app.component';
import { AdminUserComponent } from './pages/admin-user/admin-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RepositorioComponent } from './pages/repositorio/repositorio.component';

// Components
import { DialogComponent } from './components/dialog/dialog.component';
import { EditUserComponent } from './dialogs/edit-user/edit-user.component';
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { BmlControlComponent, CreateDialog, EditDialog } from './pages/bml-control/bml-control.component';

@NgModule({
  declarations: [
    BmlControlComponent,
    NavigationComponent,
    DashboardComponent,
    RepositorioComponent,
    AdminUserComponent,
    DialogComponent,
    EditUserComponent,
    AppComponent,
    CreateDialog,
    EditDialog
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    HttpClientModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{
    provide: MAT_DIALOG_DATA,
    useValue: {}
  },{
    provide: MatDialogRef,
    useValue: {}
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
