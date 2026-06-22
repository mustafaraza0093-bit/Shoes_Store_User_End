import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-condition-ribbon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './condition-ribbon.component.html',
  styleUrl: './condition-ribbon.component.scss'
})
export class ConditionRibbonComponent {
  @Input() condition!: string;
}
