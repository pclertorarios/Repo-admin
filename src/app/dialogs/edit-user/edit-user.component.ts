import {Component, Inject, OnInit} from '@angular/core';
import {UpdateUserInterface} from "../../models/UpdateUser.interface";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UsersService} from "../../service/users-api.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editProfile: UpdateUserInterface | undefined;
  someValue: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }
  updateProfile(form: NgForm){
    const updateData: UpdateUserInterface = form.value;
    console.log(updateData);
    this.userService.updateUser(this.data.id, updateData);
    this.dialogRef.close();
  }
  onNoClick(): void{
    this.dialogRef.close(this.someValue);
  }

}
