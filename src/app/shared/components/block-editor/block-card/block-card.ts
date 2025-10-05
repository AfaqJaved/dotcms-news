import {Component, Input} from '@angular/core';
import {BlockEditorNode} from '../../../../core/types';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-block-card',
  imports: [],
  templateUrl: './block-card.html',
  styleUrl: './block-card.scss'
})
export class BlockCard {
  @Input() node !: BlockEditorNode;

  protected readonly environment = environment;
}
