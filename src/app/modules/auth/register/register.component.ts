import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-logo">◈ Sole &amp; Story</div>
        <h1 class="auth-title">Create your account</h1>
        <p class="auth-sub">Join Sole &amp; Story today</p>
        <form (ngSubmit)="register()" class="auth-form">
          <div class="field-group"><label>Full Name*</label><input type="text" [(ngModel)]="name" name="name" required placeholder="Hamza Malik" /></div>
          <div class="field-group"><label>Email*</label><input type="email" [(ngModel)]="email" name="email" required placeholder="hamza@gmail.com" /></div>
          <div class="field-group"><label>Phone</label><input type="text" [(ngModel)]="phone" name="phone" placeholder="0321-1234567" /></div>
          <div class="field-group"><label>Password*</label><input type="password" [(ngModel)]="password" name="password" required placeholder="••••••••" /></div>
          <div class="field-group"><label>Confirm Password*</label><input type="password" [(ngModel)]="confirmPwd" name="confirmPwd" required placeholder="••••••••" /></div>
          <label class="check-label"><input type="checkbox" required /> I agree to the Terms &amp; Privacy Policy</label>
          <button type="submit" class="btn-primary btn-full submit-btn">Create Account</button>
        </form>
        <p class="auth-footer">Already have an account? <a routerLink="/auth/login">Sign in →</a></p>
      </div>
    </div>
  `,
  styles: [`
    .auth-page { min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 40px 16px; background: var(--canvas); }
    .auth-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 48px 40px; width: 100%; max-width: 460px; box-shadow: var(--shadow-rest); }
    .auth-logo { font-family: var(--font-hero); font-size: 22px; font-weight: 700; color: var(--accent); margin-bottom: 20px; }
    .auth-title { font-family: var(--font-hero); font-size: 30px; font-weight: 600; margin-bottom: 4px; }
    .auth-sub { font-size: 15px; color: var(--muted); margin-bottom: 28px; }
    .auth-form { display: flex; flex-direction: column; gap: 16px; }
    .field-group { display: flex; flex-direction: column; gap: 6px; label { font-size: 14px; font-weight: 600; color: var(--ink); } }
    .check-label { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--ink); cursor: pointer; }
    .submit-btn { padding: 15px; font-size: 15px; }
    .auth-footer { text-align: center; font-size: 14px; color: var(--muted); margin-top: 20px; a { color: var(--accent); text-decoration: none; &:hover { text-decoration: underline; } } }
  `]
})
export class RegisterComponent {
  name = ''; email = ''; phone = ''; password = ''; confirmPwd = '';
  constructor(private authService: AuthService, private router: Router) {}
  register() { this.authService.login(this.email, this.password); this.router.navigate(['/account']); }
}
