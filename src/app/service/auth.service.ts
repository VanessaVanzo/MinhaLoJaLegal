import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}&password=${password}`)
      .pipe(map(users => {
        if (users.length > 0) {
          localStorage.setItem('user', JSON.stringify(users[0]));
          return true;
        } else {
          return false;
        }
      }));
  }

  logout() {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getUser(): User | null {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  }

  getUserRole(): string | null {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userObj = JSON.parse(user);
        return userObj.role || null;
      } catch (error) {
        console.error('Erro ao ler user do localStorage', error);
        return null;
      }
    }
    return null;
  }

}
