import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockParagraph } from './block-paragraph';

describe('BlockParagraph', () => {
  let component: BlockParagraph;
  let fixture: ComponentFixture<BlockParagraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockParagraph]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockParagraph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
