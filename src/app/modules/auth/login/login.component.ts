import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-logo">◈ Sole &amp; Story</div>
        <h1 class="auth-title">Welcome back</h1>
        <p class="auth-sub">Sign in to your account</p>
        <form (ngSubmit)="login()" #f="ngForm" class="auth-form">
          <div class="field-group">
            <label>Email*</label>
            <input type="email" [(ngModel)]="email" name="email" required placeholder="hamza@gmail.com" />
          </div>
          <div class="field-group">
            <label>Password*</label>
            <input type="password" [(ngModel)]="password" name="password" required placeholder="••••••••" />
          </div>
          <div class="form-row">
            <label class="check-label"><input type="checkbox" /> Remember me</label>
            <a href="#" class="forgot-link">Forgot password?</a>
          </div>
          <button type="submit" class="btn-primary btn-full submit-btn">Sign In</button>
        </form>
        <p class="auth-footer">Don't have an account? <a routerLink="/auth/register">Register →</a></p>
      </div>
    </div>
  `,
  styles: [`
    .auth-page { min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 40px 16px; background: var(--canvas); }
    .auth-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 48px 40px; width: 100%; max-width: 420px; box-shadow: var(--shadow-rest); }
    .auth-logo { font-family: var(--font-hero); font-size: 22px; font-weight: 700; color: var(--accent); margin-bottom: 28px; }
    .auth-title { font-family: var(--font-hero); font-size: 32px; font-weight: 600; margin-bottom: 4px; }
    .auth-sub { font-size: 15px; color: var(--muted); margin-bottom: 32px; }
    .auth-form { display: flex; flex-direction: column; gap: 20px; }
    .field-group { display: flex; flex-direction: column; gap: 6px; label { font-size: 14px; font-weight: 600; color: var(--ink); } }
    .form-row { display: flex; align-items: center; justify-content: space-between; }
    .check-label { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--ink); cursor: pointer; }
    .forgot-link { font-size: 13px; color: var(--accent); text-decoration: none; &:hover { text-decoration: underline; } }
    .submit-btn { padding: 15px; font-size: 15px; margin-top: 8px; }
    .auth-footer { text-align: center; font-size: 14px; color: var(--muted); margin-top: 24px; a { color: var(--accent); text-decoration: none; &:hover { text-decoration: underline; } } }
  `]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password);
    this.router.navigate(['/account']);
  }
}
