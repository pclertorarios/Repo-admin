import {Component, Inject, OnInit} from '@angular/core';
import {UserInterface} from "../models/User.interface";
import {UsersService} from "../service/users-api.service";
import {MatDialog} from "@angular/material/dialog";
import {EditUserComponent} from "../dialogs/edit-user/edit-user.component";
import {NgForm} from "@angular/forms";
import {UpdateUserInterface} from "../models/UpdateUser.interface";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
  users: Array<UserInterface> | undefined;
  selected = 0;
  edit = false;
  userSelected: UserInterface | undefined;
  usersA: UserInterface[] = [
    {id: 0, name: 'juan', lastName: 'juan', email: 'juan', phone: 'juan', password: 'juan'},
    {id: 1, name: 'luis', lastName: 'luis', email: 'juan', phone: 'juan', password: 'juan'},
    {id: 2, name: 'carlos', lastName: 'carlos', email: 'juan', phone: 'juan', password: 'juan'}
  ]
  constructor(private userService: UsersService,
              public dialog: MatDialog) {
    this.userService.getUserById(this.selected).subscribe(response=>this.userSelected = response);


  }
  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(resp => {this.users = resp; console.log(this.users);});
  }
  eliminarUsuario(id: number){
    this.userService.deleteUser(id);
  }
  openEditDialog(){
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '500px',
      data: {
        id: this.userSelected?.id,
        name: this.userSelected?.name,
        lastName: this.userSelected?.lastName,
        email: this.userSelected?.email,
        password: this.userSelected?.password,
        phone: this.userSelected?.phone
      }
    });

    dialogRef.beforeClosed().subscribe(result => {
      this.userService.getUserById(this.selected)
        .subscribe(response => this.userSelected = response);
    })
  }
}
