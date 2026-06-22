import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-announcement-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="announcement-bar" *ngIf="isVisible">
      <span class="text">⚡ SUMMER SALE — Use code <strong>SUMMER15</strong> for 15% off all new arrivals</span>
      <button class="dismiss" (click)="dismiss()">×</button>
    </div>
  `,
  styles: [`
    .announcement-bar {
      background: var(--accent);
      color: var(--ink);
      padding: 10px 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      position: relative;
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 500;
    }
    .dismiss {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      font-size: 18px;
      color: var(--ink);
      cursor: pointer;
      line-height: 1;
      padding: 4px;
      opacity: 0.6;
      transition: opacity 0.2s;
      &:hover { opacity: 1; }
    }
    @media (max-width: 768px) {
      .announcement-bar { padding: 8px 40px 8px 16px; font-size: 12px; }
    }
  `]
})
export class AnnouncementBarComponent {
  isVisible = true;
  dismiss() { this.isVisible = false; }
}
