
import { Component, OnInit } from '@angular/core';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../user.service.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  users: any[]=[];
  selectedUser: any;
  editForm: FormGroup;
  isEditFormOpen: boolean = false;
  pagedUsers: any[] = [];
  currentPage = 1;
  itemsPerPage = 4;
  totalItems = 0;
   user: any =[];
   userData: any = {};

    constructor(private userService: UserServiceService, private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      response => {
        this.users = response;
         this.totalItems = this.users.length;
        this.setPage(1); 
      },
      error => {
        console.log('An error occurred while fetching users:', error);
      }
    );
  }
 
   addUser(user: any) {
    this.userService.addUser(user).subscribe(
      response => {
        console.log('User added successfully');
        const newlyAddedUser = response;
        this.users.push(newlyAddedUser);
        this.totalItems++;
        this.setPage(this.totalItems);
      },
      error => {
        console.log('An error occurred while adding the user:', error);
      }
    );
  }


  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log('User deleted successfully');
        this.loadUsers(); // Refresh the user list
      },
      error => {
        console.log('An error occurred while deleting the user:', error);
      }
    );
  }

  
  editUser(user: any): void {
    this.selectedUser = { ...user }; // Create a copy of the selected user object
    this.isEditFormOpen = true;

    // Set the form values based on the selected user
    this.editForm.patchValue({
      id: this.selectedUser.id,
      name: this.selectedUser.name,
      gender: this.selectedUser.gender,
      email: this.selectedUser.email,
      status: this.selectedUser.status
    });
  }

  cancelEdit(): void {
    this.isEditFormOpen = false;
    this.editForm.reset(); // Reset the form values
  }

  saveChanges(): void {
    const updatedUser = { ...this.editForm.value }; // Create a copy of the updated form values
    const userId = updatedUser.id; // Store the user id 
    delete updatedUser.id; 

    // Update the user data in the user list
    this.users = this.users.map((user: any) => {
      if (user.id === userId) {
        return { id: userId, ...updatedUser }; // Update the user with the form values
      }
    this.isEditFormOpen = false;

      return user;

    });

    this.userService.updateUser(userId, updatedUser).subscribe(
      () => {
        console.log('User updated successfully');
        this.isEditFormOpen = false; // Close the edit form
      },
      error => {
        console.log('An error occurred while updating the user:', error);
      }
    );
  }
   setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedUsers = this.users.slice(startIndex, endIndex);
  }

  getPaginationRange(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }

  changePage(page: number): void {
    this.setPage(page);
  }
    viewData(user: any){
    this.userData = user;
  }
}




