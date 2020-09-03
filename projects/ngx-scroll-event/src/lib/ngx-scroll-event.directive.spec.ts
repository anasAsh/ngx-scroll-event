import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NgxScrollEventDirective } from './ngx-scroll-event.directive';


@Component({
  template: `
  <div libScrollEvent libScrollEvent (onscroll)="handleScroll($event)" [bottomOffset]="200" [topOffset]="200">some data</div>
  `
})
// todo: fix unit tests
class TestComponent { }

describe('NgxScrollEventDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ NgxScrollEventDirective, TestComponent ]
    })
    .createComponent(TestComponent);

    fixture.detectChanges(); // initial binding

    // all elements with an attached HighlightDirective
    des = fixture.debugElement.queryAll(By.directive(NgxScrollEventDirective));
  });
  
  // color tests
  it('should have three highlighted elements', () => {
    expect(des.length).toBe(3);
  });
  
  it('should color 1st <h2> background "yellow"', () => {
    const bgColor = des[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('yellow');
  });
  
  it('should color 2nd <h2> background w/ default color', () => {
    const dir = des[1].injector.get(HighlightDirective) as HighlightDirective;
    const bgColor = des[1].nativeElement.style.backgroundColor;
    expect(bgColor).toBe(dir.defaultColor);
  });
  
  it('should bind <input> background to value color', () => {
    // easier to work with nativeElement
    const input = des[2].nativeElement as HTMLInputElement;
    expect(input.style.backgroundColor).toBe('cyan', 'initial backgroundColor');
  
    // dispatch a DOM event so that Angular responds to the input value change.
    input.value = 'green';
    input.dispatchEvent(newEvent('input'));
    fixture.detectChanges();
  
    expect(input.style.backgroundColor).toBe('green', 'changed backgroundColor');
  });
  
  
  it('bare <h2> should not have a customProperty', () => {
    expect(bareH2.properties.customProperty).toBeUndefined();
  });
});
