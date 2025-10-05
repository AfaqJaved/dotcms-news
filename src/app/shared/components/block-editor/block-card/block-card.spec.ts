import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCard } from './block-card';

describe('BlockCard', () => {
  let component: BlockCard;
  let fixture: ComponentFixture<BlockCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
