import {Component, Input} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import { BlockEditorNode } from '../../../../core/types';

@Component({
  selector: 'app-block-dotimage',
  imports: [],
  templateUrl: './block-dotimage.html',
  styleUrl: './block-dotimage.scss'
})
export class BlockDotImage {
  @Input() node !: BlockEditorNode;

  protected readonly environment = environment;
}
