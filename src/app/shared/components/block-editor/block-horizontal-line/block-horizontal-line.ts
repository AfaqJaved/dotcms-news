import {Component, Input} from '@angular/core';
import { BlockEditorNode } from '../../../../core/types';

@Component({
  selector: 'app-block-horizontal-line',
  imports: [],
  templateUrl: './block-horizontal-line.html',
  styleUrl: './block-horizontal-line.scss'
})
export class BlockHorizontalLine {
  @Input() node !: BlockEditorNode;
}
