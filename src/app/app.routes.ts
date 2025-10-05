import {Routes} from '@angular/router';
import {NewsList} from './pages/news/news-list/news-list';

export const routes: Routes = [
  {path: '', component: NewsList},
  { path: 'blog/:id', component: NewsList }, // dynamic route
];
