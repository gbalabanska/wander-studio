import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenTimerService {
  private expiresAt: number = 0;
  private countdown$ = new BehaviorSubject<string>('00:00');
  private timerSubscription?: Subscription;

  get countdown() {
    return this.countdown$.asObservable();
  }

  startCountdown(expiresAtMillis: number) {
    this.expiresAt = expiresAtMillis;

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = interval(1000).subscribe(() => {
      const now = Date.now();
      const diff = this.expiresAt - now;

      if (diff <= 0) {
        this.countdown$.next('Expired');
        this.timerSubscription?.unsubscribe();
      } else {
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        const formatted = `${this.pad(minutes)}:${this.pad(seconds)}`;
        this.countdown$.next(formatted);
      }
    });
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }

  stopCountdown() {
    this.timerSubscription?.unsubscribe();
    this.countdown$.next('00:00');
  }
}
