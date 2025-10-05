import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NewsList} from './news-list';
import {of} from 'rxjs';
import {Component, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {DotcmsService} from '../../../core/services/dotcms/dotcms-service';
import {By} from '@angular/platform-browser';
import {SupportedYears} from '../../../core/types';

// Mock Loader component
@Component({
  selector: 'app-loader',
  standalone: true,
  template: '<div class="mock-loader" *ngIf="visible"></div>',
})
class MockLoader {
  @Input() visible: boolean = false;
}

// Mock Header component
@Component({
  selector: 'app-header',
  standalone: true,
  template: '<div class="mock-header" (click)="emitChange()"></div>',
})
class MockHeader {
  @Input() title?: string;
  @Input() imageUrl?: string;
  @Input() filterChanged: any;

  emitChange() {
  }
}

// Mock NewsDetail component
@Component({
  selector: 'app-news-detail',
  standalone: true,
  template: '<div class="mock-news-detail"></div>',
})
class MockNewsDetail {
  @Input() blog: any;
}

// Mock DotcmsService
class MockDotcmsService {
  getBlogsWithPagination = jasmine
    .createSpy('getBlogsWithPagination')
    .and.callFake((page: number, limit: number) =>
      Promise.resolve({
        data: {
          contentlets: [
            {
              identifier: 'blog1',
              title: 'Test Blog 1',
              publishDate: '2025-01-01T00:00:00Z',
              image: 'img1',
              blogContent: {content: []},
            },
            {
              identifier: 'blog2',
              title: 'Test Blog 2',
              publishDate: '2024-02-01T00:00:00Z',
              image: 'img2',
              blogContent: {content: []},
            },
          ],
          page,
          total: 2,
        },
      })
    );
}

describe('NewsList (standalone)', () => {
  let fixture: ComponentFixture<NewsList>;
  let component: NewsList;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockRoute: Partial<ActivatedRoute>;
  let mockService: MockDotcmsService;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRoute = {snapshot: {paramMap: new Map([['id', 'blog1']])} as any};
    mockService = new MockDotcmsService();

    await TestBed.configureTestingModule({
      imports: [NewsList, MockLoader, MockHeader, MockNewsDetail],
      providers: [
        {provide: DotcmsService, useValue: mockService},
        {provide: Router, useValue: mockRouter},
        {provide: ActivatedRoute, useValue: mockRoute},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewsList);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load blogs on init', async () => {
    await component.ngOnInit();
    expect(mockService.getBlogsWithPagination).toHaveBeenCalledWith(1, 5);
    expect(component.blogs.length).toBe(2);
    expect(component.filteredBlogs.length).toBe(2);
    expect(component.selectedBlog.identifier).toBe('blog1');
    expect(component.showLoader).toBeFalse();
  });

  it('should filter blogs by year', async () => {
    await component.ngOnInit();

    component.onNewsFilterChange(2025 as SupportedYears);
    expect(component.filteredBlogs.length).toBe(1);
    expect(component.filteredBlogs[0].title).toBe('Test Blog 1');

    component.onNewsFilterChange(0 as SupportedYears);
    expect(component.filteredBlogs.length).toBe(2);
  });

  it('should handle pagination correctly', async () => {
    await component.ngOnInit();

    component.onNextPage();
    expect(component.page).toBe(2);
    expect(mockService.getBlogsWithPagination).toHaveBeenCalledWith(2, 5);

    component.onPreviousPage();
    expect(component.page).toBe(1);
    expect(mockService.getBlogsWithPagination).toHaveBeenCalledWith(1, 5);
  });

  it('should handle limit change', async () => {
    const mockEvent = {
      target: {value: '10'},
    } as unknown as Event;

    await component.ngOnInit();
    component.onLimitChange(mockEvent);
    expect(component.limit).toBe(10);
    expect(mockService.getBlogsWithPagination).toHaveBeenCalledWith(1, 10);
  });

  it('should update selected blog when clicked', async () => {
    await component.ngOnInit();
    const newBlog = component.blogs[1];
    component.onSelectedBlogChange(newBlog);
    expect(component.selectedBlog).toBe(newBlog);
  });

  it('should show loader while fetching blogs', async () => {
    const promise = component.getDotcmsBlogs();
    expect(component.showLoader).toBeTrue();
    await promise;
    expect(component.showLoader).toBeFalse();
  });
});
