import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { NgxScrollEventDirective, NgxScrollEvent } from 'ngx-scroll-event';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxScrollEventDirective, NgForOf],
  template: `
    <h1>ngx-scroll-event E2E</h1>
    <div class="scroll-container"
         libScrollEvent
         (onscroll)="onScroll($event)"
         [bottomOffset]="100"
         [topOffset]="50"
    >
      <div class="scroll-content">
        <p *ngFor="let i of items">{{ i }}</p>
      </div>
    </div>
    <div id="scroll-status" data-testid="scroll-status">
      {{ statusText }}
    </div>
  `,
  styles: [`
    .scroll-container {
      height: 200px;
      overflow: auto;
      border: 1px solid #ccc;
      margin: 1rem 0;
    }
    .scroll-content { padding: 1rem; }
    #scroll-status { margin-top: 1rem; font-family: monospace; }
  `]
})
export class AppComponent {
  items = Array.from({ length: 30 }, (_, i) => `Line ${i + 1}`);
  statusText = 'idle';

  onScroll(event: NgxScrollEvent): void {
    const parts: string[] = [];
    if (event.isReachingTop) parts.push('top');
    if (event.isReachingBottom) parts.push('bottom');
    if (event.isWindowEvent) parts.push('window');
    this.statusText = parts.length ? parts.join(',') : 'middle';
  }
}
