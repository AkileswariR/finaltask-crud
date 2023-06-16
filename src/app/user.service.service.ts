import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
 
  private apiUrl = 'https://gorest.co.in/public/v2/users';
  private token = '92f2a9893acc663ca821cbacd90a89605c02054bbce88a009aa959ddb052c29e';

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


