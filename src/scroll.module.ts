import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollDirective } from './scroll.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ScrollDirective,
  ],
  exports: [
    ScrollDirective,
  ]
})
export class ScrollEventModule { }
