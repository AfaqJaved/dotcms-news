import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockTable } from './block-table';
import { BlockEditorNode } from '../../../../core/types';
import { By } from '@angular/platform-browser';

describe('BlockTable', () => {
  let component: BlockTable;
  let fixture: ComponentFixture<BlockTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockTable],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockTable);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should handle empty content gracefully', () => {
    component.node = { type: 'table', content: [] } as BlockEditorNode;
    fixture.detectChanges();

    const tableEl = fixture.debugElement.query(By.css('table'));
    expect(tableEl).toBeTruthy();
  });

  it('should return correct text from getText()', () => {
    const block = {
      content: [
        { type: 'text', text: 'Hello' },
        { type: 'text', text: 'World' },
      ],
    };
    const result = component.getText(block);
    expect(result).toBe('HelloWorld');
  });

  it('should return empty string for block without content', () => {
    const result = component.getText({});
    expect(result).toBe('');
  });
});
