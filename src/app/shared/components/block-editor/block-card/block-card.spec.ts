import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockCard } from './block-card';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';

describe('BlockCard', () => {
  let component: BlockCard;
  let fixture: ComponentFixture<BlockCard>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BlockCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockCard);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    component.node = {
      type: 'dotContent',
      attrs: { data: { title: 'Sample Product' } },
    } as any;

    fixture.detectChanges();
    const title = compiled.querySelector('h2');
    expect(title?.textContent?.trim()).toBe('Sample Product');
  });


  it('should render description as HTML', () => {
    component.node = {
      type: 'dotContent',
      attrs: { data: { description: '<p>Test description</p>' } },
    } as any;

    fixture.detectChanges();
    const description = compiled.querySelector('.description');
    expect(description?.innerHTML).toContain('Test description');
  });

  it('should display price when retailPrice is provided', () => {
    component.node = {
      type: 'dotContent',
      attrs: { data: { retailPrice: 99.99 } },
    } as any;

    fixture.detectChanges();
    const price = compiled.querySelector('.price');
    expect(price?.textContent).toContain('Price: $99.99');
  });


});
