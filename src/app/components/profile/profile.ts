import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
})
export class ProfileComponent implements OnInit {
  user: any = null;

  ngOnInit(): void {
    // Retrieve the JSON string we saved during login
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      // Convert the string back into a JavaScript object
      this.user = JSON.parse(userData);
    }
  }
}
