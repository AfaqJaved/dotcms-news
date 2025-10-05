import {Component, Input} from '@angular/core';
import {BlockEditorNode} from '../../../../core/types';

@Component({
  selector: 'app-block-quote',
  imports: [],
  templateUrl: './block-quote.html',
  styleUrl: './block-quote.scss'
})
export class BlockQuote {
  @Input() node !: BlockEditorNode;
}
