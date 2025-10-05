import {Component, Input, OnInit} from '@angular/core';
import {BlockEditorNode} from '../../../../core/types';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-block-youtube',
  imports: [],
  templateUrl: './block-youtube.html',
  styleUrl: './block-youtube.scss'
})
export class BlockYoutube implements OnInit {
  @Input() node !: BlockEditorNode;

  safeUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    const videoUrl = this.extractEmbedUrl(this.node?.attrs?.src ?? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  private extractEmbedUrl(url: string): string {
    if (!url) return '';
    const videoIdMatch = url.match(/[?&]v=([^&#]*)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : '';
    return `https://www.youtube.com/embed/${videoId}?start=${this.node?.attrs?.start ?? 0}`;
  }
}
