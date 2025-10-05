import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockQuote } from './block-quote';

describe('BlockQuote', () => {
  let component: BlockQuote;
  let fixture: ComponentFixture<BlockQuote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockQuote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockQuote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
