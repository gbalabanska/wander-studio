import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../services/friends.service';
import { FormsModule } from '@angular/forms';
import { Friend, User } from '../../../models/dto/dtos';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss',
  animations: [
    trigger('slideInFromTop', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate(
          '0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class FriendsComponent implements OnInit {
  constructor(private friendService: FriendService) {}

  searchUsername: string = '';
  foundUser: User | null = null;
  friends: Friend[] = [];

  ngOnInit() {
    this.loadFriends(); // Load friends on component initialization
  }

  // Load friend list
  loadFriends() {
    this.friendService.getFriendList().subscribe({
      next: (res) => {
        this.friends = res.data || [];
        console.log('Loaded friends:', this.friends);
      },
      error: (err) => {
        console.error('Failed to load friends', err);
      },
    });
  }

  // Search for a user
  searchUser() {
    if (!this.searchUsername.trim()) return;

    this.friendService.searchUsers(this.searchUsername.trim()).subscribe({
      next: (user) => {
        this.foundUser = user;
      },
      error: (err) => {
        console.error('User not found', err);
        this.foundUser = null;
      },
    });
  }

  addFriend() {
    if (!this.foundUser) return;

    this.friendService.addToFriendList(this.foundUser.id).subscribe({
      next: (res) => {
        if (res) {
          console.log('Friend added:', res.message);
          this.loadFriends(); // Reload the updated friends list
          this.foundUser = null; // Clear the search result
          this.searchUsername = ''; // Clear the input
        } else {
          console.error('Could not add friend:', res.message);
          // Optional: you could show a toast notification here
        }
      },
      error: (err) => {
        if (err.error && err.error.message) {
          alert(err.error.message); // Show error message (⚠️ You are already friends with this user)
        } else {
          alert('An unexpected error occurred.');
        }
        console.error('Error adding friend:', err);
      },
    });
  }

  // Method to delete a friend
  deleteFriend(friendId: number): void {
    if (confirm('Are you sure you want to remove this friend?')) {
      this.friendService.deleteFriend(friendId).subscribe({
        next: (response) => {
          console.log('Friend deleted:', response);
          this.loadFriends(); // Reload the friend list after deletion
        },
        error: (err) => {
          console.error('Error deleting friend:', err);
        },
      });
    }
  }
}
