import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = 'https://gorest.co.in/public/v2/users';
  private token = '47279936a00ab5a49678bdf0834cd6a9816338966276300987ef8f22bff34e66';
  users: any;

  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addUser(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.post(this.apiUrl, user, { headers });

  }
  deleteUser(userId: number) {
    const deleteUrl = `${this.apiUrl}/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.delete(deleteUrl, { headers });
  }

  updateUser(userId: number, user: any) {
    const updateUrl = `${this.apiUrl}/${userId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.put(updateUrl, user, { headers });
  }

}


