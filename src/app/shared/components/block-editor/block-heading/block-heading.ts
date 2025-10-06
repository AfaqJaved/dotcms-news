import {Component, Input} from '@angular/core';
import {BlockEditorNode} from "../../../../core/types";


@Component({
  selector: 'app-block-heading',
  imports: [
  ],
  templateUrl: './block-heading.html',
  styleUrl: './block-heading.scss'
})
export class BlockHeading {

  @Input() node !: BlockEditorNode;

  getText(node: BlockEditorNode): string {
    if (!node.content) return node.text || '';
    return node.content.map(child => this.getText(child)).join('');
  }


  getHeadingTag(level: number | undefined): string {
    switch (level) {
      case 1:
        return 'h1';
      case 2:
        return 'h2';
      case 3:
        return 'h3';
      case 4:
        return 'h4';
      case 5:
        return 'h5';
      case 6:
        return 'h6';
      default:
        return 'h1'; // fallback
    }
  }


}
