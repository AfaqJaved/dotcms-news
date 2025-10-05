import {Component, forwardRef, Inject, Input} from '@angular/core';
import {BlockEditorNode} from '../../../core/types';
import {dotCmsGetImageHelper} from '../../../core/helpers/dotcms.image.url.helper';
import {environment} from '../../../../environments/environment';
import {BlockHeading} from '../block-editor/block-heading/block-heading';
import {BlockParagraph} from '../block-editor/block-paragraph/block-paragraph';
import {BlockList} from '../block-editor/block-list/block-list';
import {BlockDotImage} from '../block-editor/block-dotimage/block-dotimage';
import {BlockTable} from '../block-editor/block-table/block-table';
import {BlockCard} from '../block-editor/block-card/block-card';
import {BlockOrderlist} from '../block-editor/block-orderlist/block-orderlist';
import {BlockQuote} from '../block-editor/block-quote/block-quote';
import {BlockHorizontalLine} from '../block-editor/block-horizontal-line/block-horizontal-line';
import {BlockCodeBlock} from '../block-editor/block-code-block/block-code-block';
import {BlockYoutube} from '../block-editor/block-youtube/block-youtube';
import {BlockDotVideo} from '../block-editor/block-dot-video/block-dot-video';


@Component({
  selector: 'app-news-content-renderer',
  standalone: true,
  imports: [
    BlockHeading,
    BlockParagraph,
    BlockList,
    BlockDotImage,
    BlockTable,
    BlockCard,
    BlockOrderlist,
    BlockQuote,
    BlockHorizontalLine,
    BlockCodeBlock,
    BlockYoutube,
    BlockDotVideo
  ],
  templateUrl: './news-content-renderer.html',
  styleUrl: './news-content-renderer.scss'
})
export class NewsContentRenderer {
  @Input() nodes: BlockEditorNode[] = [];


  getText(node: BlockEditorNode): string {
    if (!node.content) return node.text || '';
    return node.content.map(child => this.getText(child)).join('');
  }

  getTextForParagraph(node: any): string {
    if (!node) return '';
    if (node.type === 'text') return node.text;
    if (node.content?.length) {
      return node.content.map((n: any) => this.getText(n)).join('');
    }
    return '';
  }

  // Standard HTML heading font sizes
  getHeadingFontSize(level: number): string {
    switch (level) {
      case 1:
        return '2em';
      case 2:
        return '1.5em';
      case 3:
        return '1.17em';
      case 4:
        return '1em';
      case 5:
        return '0.83em';
      case 6:
        return '0.67em';
      default:
        return '1em'; // fallback
    }
  }

  isBold(node: any): boolean {
    return node.marks?.some((mark: any) => mark.type === 'bold') ?? false;
  }

  protected readonly dotCmsGetImageHelper = dotCmsGetImageHelper;
  protected readonly environment = environment;
  protected readonly Object = Object;
}
