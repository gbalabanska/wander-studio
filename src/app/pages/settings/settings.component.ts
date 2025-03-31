import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  template: `
    <div class="page">
      <h2>Settings</h2>

      <div class="setting-group">
        <h3>Appearance</h3>
        <label>
          <span>Dark Mode</span>
          <input
            type="checkbox"
            [checked]="darkMode"
            (change)="toggleDarkMode()"
          />
        </label>
      </div>

      <div class="setting-group">
        <h3>Notifications</h3>
        <label>
          <span>Enable Notifications</span>
          <input
            type="checkbox"
            [checked]="notificationsEnabled"
            (change)="toggleNotifications()"
          />
        </label>
      </div>

      <div class="setting-group">
        <h3>Account Info</h3>
        <p><strong>Username:</strong> wanderer123</p>
        <p><strong>Email:</strong> wandererAexample.com</p>
      </div>
    </div>
  `,
  styles: [
    `
      .page {
        padding: 20px;
      }
      .setting-group {
        background: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        margin-bottom: 15px;
      }
      label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
      }
      input[type='checkbox'] {
        transform: scale(1.2);
      }
    `,
  ],
})
export class SettingsComponent {
  darkMode = false;
  notificationsEnabled = true;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.style.background = this.darkMode ? '#2c3e50' : '#ffffff';
    document.body.style.color = this.darkMode ? '#ffffff' : '#000000';
  }

  toggleNotifications() {
    this.notificationsEnabled = !this.notificationsEnabled;
    alert(
      `Notifications ${this.notificationsEnabled ? 'Enabled' : 'Disabled'}`
    );
  }
}
