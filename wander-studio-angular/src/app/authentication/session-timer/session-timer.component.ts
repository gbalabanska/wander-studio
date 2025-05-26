import { Component, OnInit } from '@angular/core';
import { TokenTimerService } from '../service/token-timer.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-session-timer',
  standalone: true,
  template: `
    <div class="session-timer-bubble">
      <p class="timer-text">
        ⏳ Session expires in: <strong>{{ countdown }}</strong>
      </p>
      <button class="refresh-btn" (click)="refreshSession()">
        🔄 Refresh Session
      </button>
    </div>
  `,
  styles: [
    `
      .session-timer-bubble {
        background-color: #f4f1f1; /* soft pink-tinted gray */
        padding: 1rem;
        border-radius: 25px;
        border: 2px solid grey;
        box-shadow: 2px 3px 8px rgba(231, 114, 120, 0.3);
        display: inline-block;
        max-width: 300px;
        text-align: center;
      }

      .timer-text {
        font-size: 16px;
        font-weight: 500;
        color: var(--dark-purpl);
        margin: 0 0 10px 0;
      }

      .refresh-btn {
        background: linear-gradient(
          to right,
          #3ca374,
          #52b788
        ); /* green button */
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.1);
      }

      .refresh-btn:hover {
        background: linear-gradient(to right, #52b788, #3ca374);
        transform: scale(1.05);
        box-shadow: 0 6px 15px rgba(60, 163, 116, 0.3);
      }
    `,
  ],
})
export class SessionTimerComponent implements OnInit {
  countdown: string = '';

  constructor(
    private timer: TokenTimerService,
    private authService: AuthService
  ) {
    this.timer.countdown.subscribe((value) => {
      this.countdown = value;
    });
  }

  ngOnInit(): void {
    const expiresAtStr = sessionStorage.getItem('expiresAt');
    if (expiresAtStr) {
      const expiresAt = parseInt(expiresAtStr, 10);
      if (!isNaN(expiresAt)) {
        this.timer.startCountdown(expiresAt);
      }
    }
  }

  refreshSession() {
    console.log('Refreshing session...');
    this.authService.refreshToken().subscribe((res) => {
      const expiresAt = res.data?.expiresAt;
      if (expiresAt) {
        this.timer.startCountdown(expiresAt);
        sessionStorage.setItem('expiresAt', expiresAt.toString());
      }
    });
  }
}
