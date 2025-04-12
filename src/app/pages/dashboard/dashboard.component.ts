import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
  template: `
    <div class="dashboard" [@slideInFromTop]>
      <div class="welcome">
        <h2>Welcome, {{ userName }}! 🌍</h2>
        <p>Plan, organize, and track your adventures with Wander Studio.</p>
        <a
          routerLink="/new-trip"
          routerLinkActive="active"
          class="create-trip-btn"
        >
          ➕ Create New Trip
        </a>
      </div>

      <div class="month-selector">
        <label for="month">Select Month:</label>
        <select id="month" (change)="onMonthChange($event)">
          <option
            *ngFor="let month of months; let i = index"
            [value]="i"
            [selected]="i === selectedMonth"
          >
            {{ month }}
          </option>
        </select>
      </div>

      <div class="calendar-section">
        <h3>Your Upcoming Trips 📅</h3>
        <div class="calendar">
          <div
            *ngFor="let day of daysInMonth"
            class="day"
            [class.trip-day]="tripDays.includes(day)"
          >
            {{ day }}
          </div>
        </div>
      </div>

      <div class="friend-list-section">
        <h3>Your Travel Buddies 🧑‍🤝‍🧑</h3>
        <ul class="friend-list">
          <li *ngFor="let friend of friends">
            <span>{{ friend }}</span>
            <button class="remove-btn" (click)="removeFriend(friend)">
              ❌
            </button>
          </li>
        </ul>
        <input placeholder="Add a friend..." class="friend-input" />
        <button class="add-friend-btn" (click)="addFriend()">➕ Add</button>
      </div>
    </div>
  `,
  styles: [
    `
      :root {
        --orange-pink: #e77278;
        --orange-red: #ac3457;
        --dark-purpl: #1e274e;
        --brownish-yellow: #edbd8c;
      }

      .dashboard {
        max-width: 900px;
        margin: 30px auto;
        padding: 20px;
        font-family: 'Arial', sans-serif;
        background: #e6dbdb;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      .welcome {
        text-align: center;
        background: var(--dark-purpl);
        color: white;
        padding: 25px;
        border-radius: 20px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }

      .create-trip-btn {
        background: var(--orange-pink);
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 30px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .create-trip-btn:hover {
        background: var(--orange-red);
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
      }

      .month-selector {
        margin-top: 25px;
        text-align: center;
      }

      .month-selector select {
        padding: 10px;
        border: 1px solid var(--dark-purpl);
        border-radius: 8px;
        font-size: 16px;
        background: #fff;
        transition: border-color 0.2s;
      }

      .month-selector select:hover {
        border-color: var(--orange-pink);
      }

      .calendar-section {
        margin-top: 40px;
        text-align: center;
      }

      .calendar {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 12px;
        margin-top: 15px;
      }

      .day {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f4f4f4;
        border-radius: 12px;
        font-weight: bold;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
      }

      .day:hover {
        background: var(--orange-pink);
        color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .trip-day {
        background: var(--brownish-yellow);
        color: white;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .friend-list-section {
        margin-top: 40px;
      }

      .friend-list {
        list-style: none;
        padding: 0;
      }

      .friend-list li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f4f4f4;
        padding: 12px;
        border-radius: 12px;
        margin-bottom: 12px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
      }

      .friend-list li:hover {
        background: var(--orange-pink);
        color: white;
      }

      .remove-btn {
        background: var(--orange-red);
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s ease;
      }

      .remove-btn:hover {
        background: #e5533e;
        transform: scale(1.05);
      }

      .friend-input {
        width: calc(100% - 100px);
        padding: 12px;
        border: 1px solid var(--dark-purpl);
        border-radius: 8px;
        font-size: 16px;
        margin-right: 10px;
        transition: border-color 0.3s ease;
      }

      .friend-input:focus {
        border-color: var(--orange-pink);
        outline: none;
      }

      .add-friend-btn {
        background: var(--orange-pink);
        color: white;
        border: none;
        padding: 10px 18px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s ease;
      }

      .add-friend-btn:hover {
        background: var(--orange-red);
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class DashboardComponent {
  userName = 'Gabby';
  selectedMonth = new Date().getMonth();
  daysInMonth: number[] = [];
  tripDays = [3, 4, 5, 6, 7, 10, 15, 22, 27];
  friends = ['Alice', 'Bob', 'Charlie'];
  newFriend = '';

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor() {
    this.updateDaysInMonth();
  }

  updateDaysInMonth() {
    const year = new Date().getFullYear();
    const days = new Date(year, this.selectedMonth + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: days }, (_, i) => i + 1);
  }

  onMonthChange(event: Event) {
    this.selectedMonth = +(event.target as HTMLSelectElement).value;
    this.updateDaysInMonth();
  }

  addFriend() {
    if (this.newFriend.trim() && !this.friends.includes(this.newFriend)) {
      this.friends.push(this.newFriend);
      this.newFriend = '';
    }
  }

  removeFriend(friend: string) {
    this.friends = this.friends.filter((f) => f !== friend);
  }
}
