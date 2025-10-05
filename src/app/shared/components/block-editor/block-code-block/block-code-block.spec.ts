import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockCodeBlock } from './block-code-block';
import { CommonModule } from '@angular/common';

describe('BlockCodeBlock', () => {
  let component: BlockCodeBlock;
  let fixture: ComponentFixture<BlockCodeBlock>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BlockCodeBlock],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockCodeBlock);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render code text when node type is codeBlock', () => {
    component.node = {
      type: 'codeBlock',
      attrs: { language: 'typescript' },
      content: [{ type: 'text', text: 'console.log("Hello World");' }],
    } as any;

    fixture.detectChanges();

    const pre = compiled.querySelector('pre.code-container');
    const code = compiled.querySelector('code');

    expect(pre).toBeTruthy();
    expect(code).toBeTruthy();
    expect(code?.textContent).toBe('console.log("Hello World");');
    expect(code?.getAttribute('data-lang')).toBe('typescript');
  });

  it('should fall back to plaintext language if not provided', () => {
    component.node = {
      type: 'codeBlock',
      content: [{ type: 'text', text: 'print("Hi")' }],
    } as any;

    fixture.detectChanges();
    const code = compiled.querySelector('code');
    expect(code?.getAttribute('data-lang')).toBe('plaintext');
  });

  it('should return empty code text if no text node is present', () => {
    component.node = {
      type: 'codeBlock',
      content: [],
    } as any;

    fixture.detectChanges();
    expect(component.codeText).toBe('');
  });

  it('should not render template if node type is not codeBlock', () => {
    component.node = { type: 'paragraph', content: [] } as any;
    fixture.detectChanges();

    const pre = compiled.querySelector('pre.code-container');
    expect(pre).toBeNull();
  });
});
