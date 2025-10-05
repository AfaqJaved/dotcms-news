import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BlockList } from './block-list';
import { BlockEditorNode } from '../../../../core/types';

describe('BlockList', () => {
  let fixture: ComponentFixture<BlockList>;
  let component: BlockList;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockList], // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(BlockList);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a <ul> with list items when node type is bulletList', () => {
    const mockNode: BlockEditorNode = {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          attrs: { textAlign: 'left' },
          content: [
            {
              type: 'paragraph',
              attrs: { textAlign: 'left', indent: 10 },
              content: [
                { type: 'text', text: 'Item 1' },
              ],
            },
          ],
        },
      ],
    } as any;

    component.node = mockNode;
    fixture.detectChanges();

    const ul = fixture.debugElement.query(By.css('ul'));
    expect(ul).toBeTruthy();

    const li = fixture.debugElement.query(By.css('li'));
    expect(li).toBeTruthy();

    const textContent = li.nativeElement.textContent.trim();
    expect(textContent).toContain('Item 1');
  });

  it('should correctly identify bold text nodes', () => {
    const boldNode = { marks: [{ type: 'bold' }] };
    const normalNode = { marks: [{ type: 'italic' }] };
    expect(component.isBold(boldNode)).toBeTrue();
    expect(component.isBold(normalNode)).toBeFalse();
  });

  it('should extract text recursively from nested nodes', () => {
    const mockNode: BlockEditorNode = {
      content: [
        { text: 'Hello ' },
        { content: [{ text: 'World' }] },
      ],
    } as any;

    const text = component.getText(mockNode);
    expect(text).toBe('Hello World');
  });

  it('should render nested bullet list as <ng-content>', () => {
    const mockNode: BlockEditorNode = {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [{ text: 'Parent item' }],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [{ text: 'Nested item' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    } as any;

    component.node = mockNode;
    fixture.detectChanges();

    const lis = fixture.debugElement.queryAll(By.css('li'));
    expect(lis.length).toBeGreaterThan(0);

    const paragraphTexts = lis.map(li => li.nativeElement.textContent.trim());
    expect(paragraphTexts.join(' ')).toContain('Parent item');
  });
});
