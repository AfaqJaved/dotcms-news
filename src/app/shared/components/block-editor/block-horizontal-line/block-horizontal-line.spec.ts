import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockHorizontalLine } from './block-horizontal-line';

describe('BlockHorizontalLine', () => {
  let component: BlockHorizontalLine;
  let fixture: ComponentFixture<BlockHorizontalLine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockHorizontalLine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockHorizontalLine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
