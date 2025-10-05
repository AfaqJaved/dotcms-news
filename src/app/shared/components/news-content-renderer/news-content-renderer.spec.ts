import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsContentRenderer } from './news-content-renderer';

describe('NewsContentRenderer', () => {
  let component: NewsContentRenderer;
  let fixture: ComponentFixture<NewsContentRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsContentRenderer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsContentRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
