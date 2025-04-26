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

  // Paging variables
  pageNumber: number = 0;
  totalPages: number = 0;

  loadFriends() {
    this.friendService.getFriendList(this.pageNumber, 5).subscribe({
      next: (res) => {
        if (res.data) {
          this.friends = res.data.content;
          this.totalPages = res.data.totalPages; // ← ADD THIS
        } else {
          this.friends = [];
          this.totalPages = 0;
        }
        console.log('Loaded friends:', this.friends);
      },
      error: (err) => {
        console.error('Failed to load friends', err);
      },
    });
  }

  nextPage() {
    if (this.pageNumber + 1 < this.totalPages) {
      this.pageNumber++;
      this.loadFriends();
    }
  }

  prevPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.loadFriends();
    }
  }

  pageInput: number = 1; // User input for page number

  // Other existing methods...

  jumpToPage() {
    // If the input is invalid (greater than totalPages), reset to page 1
    if (this.pageInput < 1 || this.pageInput > this.totalPages) {
      this.pageInput = 1;
    }

    this.pageNumber = this.pageInput - 1; // Convert to zero-based index
    this.loadFriends(); // Load the friends of the chosen page
  }
}
