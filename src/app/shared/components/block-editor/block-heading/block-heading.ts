import {Component, Input} from '@angular/core';
import {BlockEditorNode} from "../../../../core/types";

@Component({
    selector: 'app-block-heading',
    imports: [],
    templateUrl: './block-heading.html',
    styleUrl: './block-heading.scss'
})
export class BlockHeading {

    @Input() node !: BlockEditorNode;

    getText(node: BlockEditorNode): string {
        if (!node.content) return node.text || '';
        return node.content.map(child => this.getText(child)).join('');
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
