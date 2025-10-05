import {Component, Input} from '@angular/core';
import {BlockEditorNode} from '../../../../core/types';

@Component({
  selector: 'app-block-orderlist',
  imports: [],
  templateUrl: './block-orderlist.html',
  styleUrl: './block-orderlist.scss'
})
export class BlockOrderlist {
  @Input() node !: BlockEditorNode;

}
