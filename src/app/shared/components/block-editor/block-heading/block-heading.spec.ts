import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BlockHeading} from './block-heading';
import {CommonModule} from '@angular/common';

describe('BlockHeading', () => {
  let component: BlockHeading;
  let fixture: ComponentFixture<BlockHeading>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BlockHeading],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockHeading);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading text correctly (simple)', () => {
    component.node = {
      type: 'heading',
      attrs: {level: 1, textAlign: 'center'},
      content: [{type: 'text', text: 'Hello World'}],
    } as any;

    fixture.detectChanges();

    const h1 = compiled.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1?.textContent?.trim()).toBe('Hello World');
    expect(h1?.getAttribute('style')).toContain('text-align: center');
  });

  it('should render recursive nested text content correctly', () => {
    component.node = {
      type: 'heading',
      attrs: {level: 2},
      content: [
        {type: 'text', text: 'Parent '},
        {
          type: 'span',
          content: [
            {type: 'text', text: 'Child'},
            {type: 'span', content: [{type: 'text', text: ' Nested'}]},
          ],
        },
      ],
    } as any;

    const result = component.getText(component.node);
    expect(result).toBe('Parent Child Nested');
  });

  it('should fall back to node.text if content is not provided', () => {
    const node: any = {type: 'heading', text: 'Fallback Text'};
    const result = component.getText(node);
    expect(result).toBe('Fallback Text');
  });

  it('should return empty string when node has no text or content', () => {
    const node: any = {type: 'heading'};
    const result = component.getText(node);
    expect(result).toBe('');
  });


  it('should not render anything if node type is not heading', () => {
    component.node = {type: 'paragraph', content: [{type: 'text', text: 'Not a heading'}]} as any;
    fixture.detectChanges();

    const h1 = compiled.querySelector('h1');
    expect(h1).toBeNull();
  });
});
