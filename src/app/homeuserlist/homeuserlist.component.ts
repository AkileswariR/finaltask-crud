import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { UserServiceService } from '../user.service.service';

@Component({
  selector: 'app-homeuserlist',
  templateUrl: './homeuserlist.component.html',
  styleUrls: ['./homeuserlist.component.css']
})

export class HomeuserlistComponent {
 
  register = new FormGroup({
    name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required])
  });
  users: any;

  
  constructor(private userService: UserServiceService) { }

  
  ngOnInit(): void {
    this.loadUsers();
  }

 
loadUsers(): void {
  this.userService.getUsers().subscribe(
    response => {
      this.users = response;
      this.users.reverse();
      // this.users = response.sort((a: any, b: any) => {
      //     // Sort in descending order based on ID (assuming ID is a numeric field)
      //     return b.id - a.id;
      //   });
    },
    error => {
      console.log('An error occurred while fetching users:', error);
    }
  );
}
  
  addUser(user: any) {
  this.userService.addUser(user).subscribe(
    () => {
      console.log('User added successfully');
      this.loadUsers();
      this.users.reverse(); // Refresh the user list
    },
    error => {
      console.log('An error occurred while adding the user:', error);
    }
  );
}
  
  onSubmit(): void {
    if (this.register.valid) {
      const user = {
        name: this.register.get('name')?.value,
        gender: this.register.get('gender')?.value,
        email: this.register.get('email')?.value,
        status: this.register.get('status')?.value
      };

      this.userService.addUser(user).subscribe(
        response => {
          console.log('Data posted successfully:', response);
           this.loadUsers(); // Refresh the user list
        },
        error => {
          console.log('An error occurred:', error);
        }
      );
    }
  
  }

}
 