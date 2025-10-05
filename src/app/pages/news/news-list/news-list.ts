import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Header} from '../../../shared/components/header/header';
import {DotcmsService} from '../../../core/services/dotcms/dotcms-service';
import {Blog} from '../../../core/models/Blog';
import {SupportedYears} from '../../../core/types';
import {dotCmsGetImageHelper} from '../../../core/helpers/dotcms.image.url.helper';
import {Loader} from '../../../shared/components/loader/loader';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NewsDetail} from '../../../shared/components/news-detail/news-detail';
import {BackToTop} from '../../../shared/components/back-to-top/back-to-top';

@Component({
  selector: 'app-news-list',
  imports: [CommonModule, Header, Loader, RouterLink, NewsDetail, BackToTop],
  templateUrl: './news-list.html',
  styleUrl: './news-list.scss'
})
export class NewsList implements OnInit {
  // Header info
  headerTitle: string = 'News';
  headerImageUrl: string = '/images/dotcms.png';
  selectedFilter: SupportedYears = 0;

  // Blog Id
  blogId!: string;

  // service
  dotcmsService = inject(DotcmsService);

  // pagination state
  page: number = 1;
  limit: number = 5;
  totalPages: number = 0;
  totalRecords: number = 0;


  // blogs state
  blogs: Blog[] = []
  filteredBlogs: Blog[] = []
  selectedBlog!: Blog;

  // loader state
  showLoader: boolean = false;

  constructor(private route: ActivatedRoute,private router : Router) {
  }


  async ngOnInit() {
    this.blogId = this.route.snapshot.paramMap.get('id')!;
    this.getDotcmsBlogs();
  }

  async getDotcmsBlogs() {

    this.showLoader = true;
    const result = await this.dotcmsService.getBlogsWithPagination(this.page, this.limit);
    if (!result.data) {
      alert(result.error)
      this.showLoader = false;
      return;
    }

    console.log(result.data)

    this.blogs = result.data.contentlets;
    this.filteredBlogs = this.blogs;
    this.page = result.data.page;
    this.totalRecords = result.data.total;
    this.totalPages = Math.ceil(this.totalRecords / this.limit);

    if(!this.blogId) await this.router.navigate(['/blog', this.blogs[0].identifier]);

    if (this.page === 1) this.selectedBlog = this.filteredBlogs[0];
    if (this.blogId) this.selectedBlog = this.filteredBlogs.filter((item) => item.identifier === this.blogId)[0]

    this.showLoader = false;

  }

  onNewsFilterChange(filter: SupportedYears) {
    if (filter === 0) {
      this.selectedFilter = 0;
      this.filteredBlogs = this.blogs;
      return;
    }

    this.selectedFilter = filter;
    this.filteredBlogs = this.blogs.filter((item) => {
      return item.publishDate.split('-')[0] === filter.toString();
    })

  }

  onLimitChange(event: Event) {
    this.limit = Number((event.target as HTMLSelectElement).value);
    this.getDotcmsBlogs();
  }

  onNextPage() {
    this.page++;
    this.blogId = '';
    this.getDotcmsBlogs();
  }

  onPreviousPage() {
    this.page--;
    this.blogId = '';
    this.getDotcmsBlogs();
  }

  onSelectedBlogChange(blog: Blog) {
    this.selectedBlog = blog;
  }

  protected readonly dotCmsGetImageHelper = dotCmsGetImageHelper;
}
