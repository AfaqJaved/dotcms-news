import {Component, Input} from '@angular/core';
import {NewsContentRenderer} from "../../news-content-renderer/news-content-renderer";
import {BlockEditorNode} from '../../../../core/types';

@Component({
  selector: 'app-block-table',
  imports: [],
  templateUrl: './block-table.html',
  styleUrl: './block-table.scss'
})
export class BlockTable {
  @Input() node !: BlockEditorNode;

  getText(block: any): string {
    if (!block?.content) return '';
    return block.content
      .filter((c: any) => c.type === 'text')
      .map((c: any) => c.text)
      .join('');
  }
}
