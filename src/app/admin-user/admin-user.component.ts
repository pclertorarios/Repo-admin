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
  users!: Array<UserInterface>;
  userSelected!: UserInterface;
  constructor(private userService: UsersService,
              public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(resp => {this.users = resp; console.log(this.users);});
  }
  eliminarUsuario(){
    this.userService.deleteUser(this.userSelected._id).subscribe();
    this.userService.getUsers()
      .subscribe(resp => {this.users = resp; console.log(resp);});
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
  update:UpdateUserInterface = {
    "name": "Jose",
    "lastName": "Perez",
    "email": "fasfasfasf",
    "password": "sadasdasd",
    "userType": "afasfas"
  };
  probar(){
    this.userService.updateUser("627198a825fe1aa322a8ce69", this.update).subscribe(response =>{console.log(response);});
  }
}
