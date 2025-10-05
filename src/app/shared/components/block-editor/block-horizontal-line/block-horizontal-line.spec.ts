import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BlockHorizontalLine} from './block-horizontal-line';
import {By} from '@angular/platform-browser';
import {BlockEditorNode} from '../../../../core/types';

describe('BlockHorizontalLine', () => {
  let fixture: ComponentFixture<BlockHorizontalLine>;
  let component: BlockHorizontalLine;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockHorizontalLine], // standalone component import
    }).compileComponents();

    fixture = TestBed.createComponent(BlockHorizontalLine);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render <hr> when node type is horizontalRule', () => {
    const mockNode: BlockEditorNode = {type: 'horizontalRule', attrs: {}} as any;
    component.node = mockNode;

    fixture.detectChanges();

    const hrElement = fixture.debugElement.query(By.css('hr'));
    expect(hrElement).toBeTruthy();
  });

  it('should not render <hr> when node type is not horizontalRule', () => {
    const mockNode: BlockEditorNode = {type: 'paragraph', attrs: {}} as any;
    component.node = mockNode;

    fixture.detectChanges();

    const hrElement = fixture.debugElement.query(By.css('hr'));
    expect(hrElement).toBeFalsy();
  });


});
