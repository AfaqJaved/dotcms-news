import {Component, Input} from '@angular/core';
import {BlockEditorNode} from '../../../../core/types';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-block-dot-video',
  imports: [],
  templateUrl: './block-dot-video.html',
  styleUrl: './block-dot-video.scss'
})
export class BlockDotVideo {
  @Input() node!: BlockEditorNode;

  get videoSrc(): string {
    if (!this.node?.attrs?.src) return '';
    // Combine with DotCMS base URL if relative
    return this.node.attrs.src.startsWith('http')
      ? this.node.attrs.src
      : `${environment.DOTCMS_URL}${this.node.attrs.src}`;
  }

  get mimeType(): string {
    return this.node?.attrs?.mimeType ?? 'video/mp4';
  }

  get videoTitle(): string {
    return this.node?.attrs?.data?.title ?? 'DotCMS Video';
  }
}
