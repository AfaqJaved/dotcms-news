import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTable } from './block-table';

describe('BlockTable', () => {
  let component: BlockTable;
  let fixture: ComponentFixture<BlockTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
