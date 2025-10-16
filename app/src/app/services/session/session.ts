import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private userKey = 'user';

  setUser(user: any) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser() {
    const savedUser = localStorage.getItem(this.userKey);
    return savedUser ? JSON.parse(savedUser) : null;
  }

  clearUser() {
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }
}
