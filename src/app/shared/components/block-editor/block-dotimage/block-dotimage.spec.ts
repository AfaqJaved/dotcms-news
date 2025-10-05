import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockDotimage } from './block-dotimage';

describe('BlockDotimage', () => {
  let component: BlockDotimage;
  let fixture: ComponentFixture<BlockDotimage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockDotimage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockDotimage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
