import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  saveUsers(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/users', user);
  }

  editUser(user: User, id: number): Observable<User> {
    return this.http.put<User>('http://localhost:3000/users/' + id, user);
  }
}
