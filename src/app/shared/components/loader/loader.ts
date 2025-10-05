import {Component, Input} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [
    NgStyle
  ],
  templateUrl: './loader.html',
  styleUrl: './loader.scss'
})
export class Loader {
  @Input() size: number = 60; // size in px
  @Input() color: string = '#4f46e5'; // default color (indigo)
  @Input() visible: boolean = false;
}

