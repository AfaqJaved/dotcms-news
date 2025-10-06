import {Component, Input} from '@angular/core';
import {BlockEditorNode} from '../../../../core/types';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-block-quote',
  imports: [
    NgStyle
  ],
  templateUrl: './block-quote.html',
  styleUrl: './block-quote.scss'
})
export class BlockQuote {
  @Input() node !: BlockEditorNode;

  getText(node: BlockEditorNode): string {
    if (!node.content) return node.text || '';
    return node.content.map(child => this.getText(child)).join('');
  }

  getStyles(node: BlockEditorNode): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    // Text alignment or indent (only for top-level nodes)
    if (node.attrs?.textAlign) {
      styles['text-align'] = node.attrs.textAlign;
    }
    if (node.attrs?.indent) {
      styles['text-indent'] = `${node.attrs.indent}px`;
    }

    // Handle marks directly on this node
    if (node.marks) {
      node.marks.forEach(mark => {
        switch (mark.type) {
          case 'bold':
            styles['font-weight'] = 'bold';
            break;
          case 'italic':
            styles['font-style'] = 'italic';
            break;
          case 'underline':
            styles['text-decoration'] = styles['text-decoration']
              ? styles['text-decoration'] + ' underline'
              : 'underline';
            break;
          case 'strike':
            styles['text-decoration'] = styles['text-decoration']
              ? styles['text-decoration'] + ' line-through'
              : 'line-through';
            break;
        }
      });
    }

    return styles;
  }

  hasLink(node: BlockEditorNode): boolean {
    return !!node.marks?.some(mark => mark.type === 'link');
  }

  getLink(node: BlockEditorNode): {
    href?: string;
    target?: string;
    rel?: string;
    class?: string | null;
  } | null {
    const linkMark = node.marks?.find(mark => mark.type === 'link');
    return linkMark?.attrs || null;
  }
}
