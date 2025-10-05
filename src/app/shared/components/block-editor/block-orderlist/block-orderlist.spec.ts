import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockOrderlist } from './block-orderlist';

describe('BlockOrderlist', () => {
  let component: BlockOrderlist;
  let fixture: ComponentFixture<BlockOrderlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockOrderlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockOrderlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
