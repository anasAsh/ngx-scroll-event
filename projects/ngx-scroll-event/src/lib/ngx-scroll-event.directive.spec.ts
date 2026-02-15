import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgxScrollEventDirective, NgxScrollEvent } from './ngx-scroll-event.directive';

@Component({
  standalone: true,
  imports: [NgxScrollEventDirective],
  template: `
    <div
      libScrollEvent
      (onscroll)="handleScroll($event)"
      [bottomOffset]="200"
      [topOffset]="50"
      style="height: 100px; overflow: auto;"
    >
      <div style="height: 400px;">scrollable content</div>
    </div>
  `
})
class TestComponent {
  lastEvent: NgxScrollEvent | null = null;
  handleScroll(event: NgxScrollEvent): void {
    this.lastEvent = event;
  }
}

@Component({
  standalone: true,
  imports: [NgxScrollEventDirective],
  template: `
    <div libScrollEvent (onscroll)="handleScroll($event)" style="height: 80px; overflow: auto;">
      <div style="height: 300px;">content</div>
    </div>
  `
})
class TestComponentWithDefaults {
  lastEvent: NgxScrollEvent | null = null;
  handleScroll(event: NgxScrollEvent): void {
    this.lastEvent = event;
  }
}

describe('NgxScrollEventDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let scrollEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const des = fixture.debugElement.query(By.directive(NgxScrollEventDirective));
    scrollEl = des.nativeElement as HTMLElement;
  });

  it('should create host with directive attached', () => {
    expect(fixture.debugElement.query(By.directive(NgxScrollEventDirective))).toBeTruthy();
  });

  it('should use bound bottomOffset and topOffset', () => {
    const dir = fixture.debugElement
      .query(By.directive(NgxScrollEventDirective))
      .injector.get(NgxScrollEventDirective);
    expect(dir.bottomOffset).toBe(200);
    expect(dir.topOffset).toBe(50);
  });

  it('should default bottomOffset and topOffset to 100 when not bound', () => {
    const defaultFixture = TestBed.createComponent(TestComponentWithDefaults);
    defaultFixture.detectChanges();
    const dir = defaultFixture.debugElement
      .query(By.directive(NgxScrollEventDirective))
      .injector.get(NgxScrollEventDirective);
    expect(dir.bottomOffset).toBe(100);
    expect(dir.topOffset).toBe(100);
  });

  it('should emit element scroll event with isWindowEvent false when element is scrolled', (done) => {
    expect(component.lastEvent).toBeNull();

    scrollEl.scrollTop = 10;
    scrollEl.dispatchEvent(new Event('scroll'));

    fixture.detectChanges();
    // allow async emit
    setTimeout(() => {
      expect(component.lastEvent).toBeTruthy();
      expect(component.lastEvent!.isWindowEvent).toBe(false);
      expect(component.lastEvent!.originalEvent).toBeTruthy();
      done();
    }, 0);
  });

  it('should set isReachingTop when scroll is near top', (done) => {
    scrollEl.scrollTop = 10;
    scrollEl.dispatchEvent(new Event('scroll'));

    setTimeout(() => {
      expect(component.lastEvent).toBeTruthy();
      expect(component.lastEvent!.isReachingTop).toBe(true);
      done();
    }, 0);
  });

  it('should set isReachingBottom when scroll is near bottom', (done) => {
    scrollEl.scrollTop = 350;
    scrollEl.dispatchEvent(new Event('scroll'));

    setTimeout(() => {
      expect(component.lastEvent).toBeTruthy();
      expect(component.lastEvent!.isReachingBottom).toBe(true);
      done();
    }, 0);
  });

  it('should set isReachingTop false when scrolled down', (done) => {
    scrollEl.scrollTop = 100;
    scrollEl.dispatchEvent(new Event('scroll'));

    setTimeout(() => {
      expect(component.lastEvent).toBeTruthy();
      expect(component.lastEvent!.isReachingTop).toBe(false);
      done();
    }, 0);
  });

  it('should set isReachingBottom false when at top', (done) => {
    scrollEl.scrollTop = 0;
    scrollEl.dispatchEvent(new Event('scroll'));

    setTimeout(() => {
      expect(component.lastEvent).toBeTruthy();
      expect(component.lastEvent!.isReachingBottom).toBe(false);
      done();
    }, 0);
  });

  it('should pass through the original scroll event', (done) => {
    const ev = new Event('scroll');
    scrollEl.scrollTop = 10;
    scrollEl.dispatchEvent(ev);

    setTimeout(() => {
      expect(component.lastEvent!.originalEvent).toBe(ev);
      done();
    }, 0);
  });
});
