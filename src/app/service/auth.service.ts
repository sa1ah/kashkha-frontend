import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: any; // This should be properly typed based on your user model

  constructor() {
    // Initialize currentUser, possibly from local storage or a previous session
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  isCustomer(): boolean {
    // Check if the user is logged in and has a 'customer' role
    return this.currentUser && this.currentUser.role === 'customer';
  }

  // Method to set the current user when they log in
  setCurrentUser(user: any) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Method to clear the current user when they log out
  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }
}
