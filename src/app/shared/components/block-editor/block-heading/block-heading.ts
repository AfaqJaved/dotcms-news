import {Component, Input} from '@angular/core';
import {BlockEditorNode} from "../../../../core/types";
import {NewsContentRenderer} from "../../news-content-renderer/news-content-renderer";

@Component({
    selector: 'app-block-heading',
    imports: [],
    templateUrl: './block-heading.html',
    styleUrl: './block-heading.scss'
})
export class BlockHeading {

    @Input() node !: BlockEditorNode;
    // @Input() parent !: NewsContentRenderer;

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

}
