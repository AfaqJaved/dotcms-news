import {Component, Input} from '@angular/core';
import {BlockEditorNode} from '../../../../core/types';

@Component({
  selector: 'app-block-list',
  imports: [],
  templateUrl: './block-list.html',
  styleUrl: './block-list.scss'
})
export class BlockList {
  @Input() node!: BlockEditorNode;


  isBold(node: any): boolean {
    return node.marks?.some((mark: any) => mark.type === 'bold') ?? false;
  }

  getText(node: BlockEditorNode): string {
    if (!node.content) return node.text || '';
    return node.content.map(child => this.getText(child)).join('');
  }


}
