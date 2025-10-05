import {Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {dotCmsGetImageHelper} from '../../../core/helpers/dotcms.image.url.helper';
import {Blog} from '../../../core/models/Blog';
import {NewsContentRenderer} from '../news-content-renderer/news-content-renderer';

@Component({
  selector: 'app-news-detail',
  imports: [
    DatePipe,
    NewsContentRenderer,
  ],
  templateUrl: './news-detail.html',
  styleUrl: './news-detail.scss'
})
export class NewsDetail {

  @Input() blog!: Blog;

  protected readonly dotCmsGetImageHelper = dotCmsGetImageHelper;
}
