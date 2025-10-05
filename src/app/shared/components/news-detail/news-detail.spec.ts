import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsDetail } from './news-detail';
import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

// ✅ Mock child standalone component
@Component({
  selector: 'app-news-content-renderer',
  standalone: true,
  template: '<div class="mock-news-renderer"></div>',
})
class MockNewsContentRenderer {
  @Input() nodes: any;
}

describe('NewsDetail (standalone)', () => {
  let component: NewsDetail;
  let fixture: ComponentFixture<NewsDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // ✅ Standalone components go in `imports`
      imports: [NewsDetail, MockNewsContentRenderer, DatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(NewsDetail);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should not render anything if blog is null', () => {
    component.blog = null as any;
    fixture.detectChanges();

    const main = fixture.debugElement.query(By.css('main'));
    expect(main).toBeNull();
  });
});
