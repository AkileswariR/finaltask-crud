
import { Component, OnInit } from '@angular/core';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../user.service.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  users: any;
  selectedUser: any;
  editForm: FormGroup;
  isEditFormOpen: boolean = false;
    // currentPage: number = 1;
  // itemsPerPage: number = 4;

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
        this.loadUsers(); // Refresh the user list
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
}





  // editUser(user: any): void {
  //   this.selectedUser = { ...user }; // Create a copy of the selected user object
  //   this.isEditFormOpen = true;
  // }

  // cancelEdit(): void {
  //   this.isEditFormOpen = false;
  // }

  // saveChanges(): void {
  //   // Update the user data in the user list
  //   const index = this.users.findIndex((user: { id: any; }) => user.id === this.selectedUser.id);
  //   if (index !== -1) {
  //     this.users[index] = this.selectedUser;
  //     // Close the edit form
  //     this.isEditFormOpen = false;
  //   }
  // }

  // getPaginationRange(): number[] {
  //   const pageCount = Math.ceil(this.users.length / this.itemsPerPage);
  //   return Array.from({ length: pageCount }, (_, index) => index + 1);
  // }

  // getPaginatedUsers(): any[] {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   return this.users.slice(startIndex, startIndex + this.itemsPerPage);
    
  // }

  // changePage(page: number): void {
  //   this.currentPage = page;
  // }

  // nextPage(): void {
  //   const totalPages = Math.ceil(this.users.length / this.itemsPerPage);
  //   if (this.currentPage < totalPages) {
  //     this.currentPage++;
  //   }
  // }

  // previousPage(): void {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //   }
  // }

  // getUserIndex(user: any): number {
  //   return this.users.indexOf(user);
  // }

  // editUser(user: any): void {
  //   this.selectedUser = { ...user }; // Create a copy of the selected user object
  //   this.isEditFormOpen = true;

  //   // Set the form values based on the selected user
  //   this.editForm.patchValue({
  //     name: this.selectedUser.name,
  //     gender: this.selectedUser.gender,
  //     email: this.selectedUser.email,
  //     status: this.selectedUser.status
  //   });
  // }

  // cancelEdit(): void {
  //   this.isEditFormOpen = false;
  //   this.editForm.reset(); // Reset the form values
  // }
  //   saveChanges(): void {
  //   // Update the user data in the user list
  //   this.users = this.users.map((user: any) => {
  //     if (user.id === this.selectedUser.id) {
  //       return this.editForm.value; // Update the user with the form values
  //     }
  //     return user;
  //   });

  //   this.userService.updateUser(this.selectedUser.id, this.editForm.value).subscribe(
  //     () => {
  //       console.log('User updated successfully');
  //       this.isEditFormOpen = false; // Close the edit form
  //     },
  //     error => {
  //       console.log('An error occurred while updating the user:', error);
  //     }
  //   );
  // }

