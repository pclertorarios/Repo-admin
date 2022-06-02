import {Component, Inject, OnInit} from '@angular/core';
import {UserInterface} from "../models/User.interface";
import {UsersService} from "../service/users-api.service";
import {MatDialog} from "@angular/material/dialog";
import {EditUserComponent} from "../dialogs/edit-user/edit-user.component";
import {NgForm} from "@angular/forms";
import {UpdateUserInterface} from "../models/UpdateUser.interface";
import {Router} from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
  users!: Array<UserInterface>;
  userSelected!: UserInterface;


  constructor(private userService: UsersService,
              public dialog: MatDialog,public _router: Router, public _location: Location) {
  }
  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(resp => {this.users = resp;
        var aux = [];
        for(var i = 0; i < this.users.length; i++){
          if(this.users[i].status == true){
            aux.push(this.users[i]);
          }
        }
        this.users = aux;
        console.log(this.users);
      });
  }
  eliminarUsuario(){
    const editUser:UpdateUserInterface = {
      id: this.userSelected._id,
      name: this.userSelected.name,
      lastName: this.userSelected.lastName,
      email: this.userSelected.email,
      password: this.userSelected.password,
      userType: this.userSelected.userType,
      status: false,
    }
    this.userService.updateUser(this.userSelected._id, editUser).subscribe(response => {console.log(response)});
  }
  openEditDialog(){
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '500px',
      data: {
        id: this.userSelected?._id,
        name: this.userSelected?.name,
        lastName: this.userSelected?.lastName,
        email: this.userSelected?.email,
        password: this.userSelected?.password,
      }
    });

    dialogRef.beforeClosed().subscribe(result => {
      this.userService.getUserById(this.userSelected._id)
        .subscribe(response => this.userSelected = response);
    })
  }
}
