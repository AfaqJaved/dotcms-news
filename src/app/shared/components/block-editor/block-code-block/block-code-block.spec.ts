import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCodeBlock } from './block-code-block';

describe('BlockCodeBlock', () => {
  let component: BlockCodeBlock;
  let fixture: ComponentFixture<BlockCodeBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockCodeBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockCodeBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
