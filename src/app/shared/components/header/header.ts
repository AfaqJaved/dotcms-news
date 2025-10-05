import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SupportedYears} from '../../../core/types';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  @Input() title?: string;
  @Input() imageUrl?: string;
  @Output() filterChanged = new EventEmitter<SupportedYears>();

  onFilterChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.filterChanged.emit(Number(selectedValue) as unknown as SupportedYears);
  }
}
