import {Component, Input} from '@angular/core';
import {BlockEditorNode} from '../../../../core/types';

@Component({
  selector: 'app-block-code-block',
  imports: [],
  templateUrl: './block-code-block.html',
  styleUrl: './block-code-block.scss'
})
export class BlockCodeBlock {
  @Input() node !: BlockEditorNode;

  get codeText(): string {
    const textNode = this.node.content?.find(child => child.type === 'text');
    return textNode?.text ?? '';
  }

  get language(): string {
    return this.node.attrs?.language ?? 'plaintext';
  }
}
