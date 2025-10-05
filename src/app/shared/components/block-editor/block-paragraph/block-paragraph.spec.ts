import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BlockParagraph } from './block-paragraph';
import { BlockEditorNode } from '../../../../core/types';

describe('BlockParagraph', () => {
  let fixture: ComponentFixture<BlockParagraph>;
  let component: BlockParagraph;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockParagraph],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockParagraph);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render paragraph text from a simple text node', () => {
    const mockNode: BlockEditorNode = {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Hello World' }]
    } as any;

    component.node = mockNode;
    fixture.detectChanges();

    const p = fixture.debugElement.query(By.css('p')).nativeElement as HTMLParagraphElement;
    expect(p.textContent?.trim()).toBe('Hello World');
  });

  it('should render paragraph with nested content using getTextForParagraph', () => {
    const mockNode: BlockEditorNode = {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Nested ',
        },
        {
          type: 'text',
          text: 'Content',
        },
      ],
    } as any;

    component.node = mockNode;
    fixture.detectChanges();

    const p = fixture.debugElement.query(By.css('p')).nativeElement as HTMLParagraphElement;
    expect(p.textContent?.trim()).toBe('Nested Content');
  });

  it('should apply default text alignment (left)', () => {
    const mockNode: BlockEditorNode = {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Left aligned text' }],
      attrs: {},
    } as any;

    component.node = mockNode;
    fixture.detectChanges();

    const p = fixture.debugElement.query(By.css('p')).nativeElement as HTMLParagraphElement;
    expect(p.style.textAlign).toBe('left');
  });

  it('should apply custom text alignment if provided', () => {
    const mockNode: BlockEditorNode = {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Centered text' }],
      attrs: { textAlign: 'center' },
    } as any;

    component.node = mockNode;
    fixture.detectChanges();

    const p = fixture.debugElement.query(By.css('p')).nativeElement as HTMLParagraphElement;
    expect(p.style.textAlign).toBe('center');
  });

  it('getText() should recursively combine text from child nodes', () => {
    const nestedNode: BlockEditorNode = {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Part1 ',
        },
        {
          type: 'text',
          text: 'Part2',
        },
      ],
    } as any;

    const result = component.getText(nestedNode);
    expect(result).toBe('Part1 Part2');
  });

  it('getTextForParagraph() should handle null node safely', () => {
    expect(component.getTextForParagraph(null as any)).toBe('');
  });

  it('getTextForParagraph() should return text when node type is "text"', () => {
    const node: BlockEditorNode = { type: 'text', text: 'Single text' } as any;
    expect(component.getTextForParagraph(node)).toBe('Single text');
  });

  it('getTextForParagraph() should handle nested content', () => {
    const node: BlockEditorNode = {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'A' },
        { type: 'text', text: 'B' },
        { type: 'text', text: 'C' },
      ],
    } as any;

    expect(component.getTextForParagraph(node)).toBe('ABC');
  });
});
