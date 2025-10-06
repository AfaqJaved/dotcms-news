import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {BlockQuote} from './block-quote';
import {BlockEditorNode} from '../../../../core/types';

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
