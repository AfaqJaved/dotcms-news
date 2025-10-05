import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BlockOrderlist } from './block-orderlist';
import { BlockEditorNode } from '../../../../core/types';

describe('BlockOrderlist', () => {
  let fixture: ComponentFixture<BlockOrderlist>;
  let component: BlockOrderlist;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockOrderlist],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockOrderlist);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render an ordered list with list items and text', () => {
    const mockNode: BlockEditorNode = {
      type: 'orderedList',
      attrs: { start: 5 },
      content: [
        {
          type: 'listItem',
          attrs: { textAlign: 'center' },
          content: [
            {
              type: 'paragraph',
              attrs: { textAlign: 'right', indent: 20 },
              content: [
                { type: 'text', text: 'First Item' }
              ]
            }
          ]
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Second Item' }
              ]
            }
          ]
        }
      ]
    } as any;

    component.node = mockNode;
    fixture.detectChanges();

    const ol = fixture.debugElement.query(By.css('ol'));
    expect(ol).toBeTruthy();
    expect(ol.attributes['start']).toBe('5'); // verifies [attr.start]

    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(2);

    const firstLi = listItems[0].nativeElement as HTMLElement;
    expect(firstLi.textContent?.trim()).toContain('First Item');
    expect(firstLi.style.textAlign).toBe('center');

    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph.styles['text-align']).toBe('right');
    expect(paragraph.styles['margin-left.px'] || paragraph.styles['margin-left']).toBeDefined();
  });

  it('should default start attribute to 1 if not provided', () => {
    const mockNode: BlockEditorNode = {
      type: 'orderedList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Item A' }]
            }
          ]
        }
      ]
    } as any;

    component.node = mockNode;
    fixture.detectChanges();

    const ol = fixture.debugElement.query(By.css('ol'));
    expect(ol.attributes['start']).toBe('1'); // default value check
  });

  it('should handle empty node content gracefully', () => {
    const mockNode: BlockEditorNode = {
      type: 'orderedList',
      content: [],
    } as any;

    component.node = mockNode;
    fixture.detectChanges();

    const ol = fixture.debugElement.query(By.css('ol'));
    expect(ol).toBeTruthy();
    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(0);
  });
});
