import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NewsContentRenderer} from './news-content-renderer';
import {BlockEditorNode} from '../../../core/types';
import {By} from '@angular/platform-browser';

describe('NewsContentRenderer', () => {
  let component: NewsContentRenderer;
  let fixture: ComponentFixture<NewsContentRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsContentRenderer],
    }).compileComponents();

    fixture = TestBed.createComponent(NewsContentRenderer);
    component = fixture.componentInstance;
  });

  it('should create the NewsContentRenderer component', () => {
    expect(component).toBeTruthy();
  });


  describe('getText()', () => {
    it('should return node text if present', () => {
      const node: BlockEditorNode = {type: 'text', text: 'Hello World'};
      expect(component.getText(node)).toBe('Hello World');
    });

    it('should concatenate text recursively from child nodes', () => {
      const node: BlockEditorNode = {
        type: 'paragraph',
        content: [
          {type: 'text', text: 'Hello'},
          {type: 'text', text: ' '},
          {type: 'text', text: 'World'},
        ],
      };
      expect(component.getText(node)).toBe('Hello World');
    });
  });

  describe('getTextForParagraph()', () => {
    it('should return text for simple text node', () => {
      const node = {type: 'text', text: 'Test paragraph'};
      expect(component.getTextForParagraph(node)).toBe('Test paragraph');
    });

    it('should return empty string if node is null', () => {
      expect(component.getTextForParagraph(null as any)).toBe('');
    });

    it('should combine text from nested content', () => {
      const node = {
        type: 'paragraph',
        content: [{type: 'text', text: 'Nested text'}],
      };
      expect(component.getTextForParagraph(node)).toBe('Nested text');
    });
  });

  describe('getHeadingFontSize()', () => {
    it('should return correct font size based on heading level', () => {
      expect(component.getHeadingFontSize(1)).toBe('2em');
      expect(component.getHeadingFontSize(2)).toBe('1.5em');
      expect(component.getHeadingFontSize(3)).toBe('1.17em');
      expect(component.getHeadingFontSize(4)).toBe('1em');
      expect(component.getHeadingFontSize(5)).toBe('0.83em');
      expect(component.getHeadingFontSize(6)).toBe('0.67em');
      expect(component.getHeadingFontSize(10)).toBe('1em'); // fallback
    });
  });

  describe('isBold()', () => {
    it('should return true if marks contain bold', () => {
      const node = {marks: [{type: 'bold'}]};
      expect(component.isBold(node)).toBeTrue();
    });

    it('should return false if no bold mark is found', () => {
      const node = {marks: [{type: 'italic'}]};
      expect(component.isBold(node)).toBeFalse();
    });

    it('should return false if marks are undefined', () => {
      const node = {};
      expect(component.isBold(node)).toBeFalse();
    });
  });
});
