import {Component, Input} from '@angular/core';
import {BlockEditorNode} from '../../../../core/types';

@Component({
    selector: 'app-block-paragraph',
    imports: [],
    templateUrl: './block-paragraph.html',
    styleUrl: './block-paragraph.scss'
})
export class BlockParagraph {
    @Input() node !: BlockEditorNode;

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


}
