import { Component, OnInit } from '@angular/core';
import {UserInterface} from "../models/User.interface";
import {UsersService} from "../service/users-api.service";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
  users: Array<UserInterface> | undefined;
  constructor(private userService: UsersService) { }
  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(resp => {this.users = resp; console.log(this.users);});
  }

}
