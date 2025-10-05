import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BlockQuote } from './block-quote';
import { BlockEditorNode } from '../../../../core/types';

describe('BlockQuote', () => {
  let fixture: ComponentFixture<BlockQuote>;
  let component: BlockQuote;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockQuote],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockQuote);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render a blockquote element', () => {
    const mockNode: BlockEditorNode = {
      type: 'blockquote',
      content: [],
      attrs: {},
    } as any;

    component.node = mockNode;
    fixture.detectChanges();

    const blockquote = fixture.debugElement.query(By.css('blockquote'));
    expect(blockquote).toBeTruthy();
  });


  it('should apply custom left margin from node.attrs.indent', () => {
    const mockNode: BlockEditorNode = {
      type: 'blockquote',
      content: [],
      attrs: { indent: 40 },
    } as any;

    component.node = mockNode;
    fixture.detectChanges();

    const blockquote = fixture.debugElement.query(By.css('blockquote')).nativeElement as HTMLElement;
    expect(blockquote.style.marginLeft).toBe('40px');
  });

  it('should apply default left margin (0px) when indent not provided', () => {
    const mockNode: BlockEditorNode = {
      type: 'blockquote',
      content: [],
      attrs: {},
    } as any;

    component.node = mockNode;
    fixture.detectChanges();

    const blockquote = fixture.debugElement.query(By.css('blockquote')).nativeElement as HTMLElement;
    expect(blockquote.style.marginLeft).toBe('0px');
  });

  it('should apply text alignment to paragraphs', () => {
    const mockNode: BlockEditorNode = {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          attrs: { textAlign: 'center' },
          content: [{ type: 'text', text: 'Centered quote text' }],
        },
      ],
      attrs: {},
    } as any;

    component.node = mockNode;
    fixture.detectChanges();

    const p = fixture.debugElement.query(By.css('p')).nativeElement as HTMLParagraphElement;
    expect(p.style.textAlign).toBe('center');
    expect(p.textContent?.trim()).toBe('Centered quote text');
  });

  it('should render multiple paragraphs if present', () => {
    const mockNode: BlockEditorNode = {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'First line.' }],
        },
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Second line.' }],
        },
      ],
      attrs: {},
    } as any;

    component.node = mockNode;
    fixture.detectChanges();

    const paragraphs = fixture.debugElement.queryAll(By.css('p'));
    expect(paragraphs.length).toBe(2);
    expect(paragraphs[0].nativeElement.textContent.trim()).toBe('First line.');
    expect(paragraphs[1].nativeElement.textContent.trim()).toBe('Second line.');
  });

  it('should handle empty content safely', () => {
    const mockNode: BlockEditorNode = {
      type: 'blockquote',
      content: [],
      attrs: {},
    } as any;

    component.node = mockNode;
    fixture.detectChanges();

    const blockquote = fixture.debugElement.query(By.css('blockquote')).nativeElement as HTMLElement;
    expect(blockquote.textContent?.trim()).toBe('');
  });
});
