import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockHeading } from './block-heading';

describe('BlockHeading', () => {
  let component: BlockHeading;
  let fixture: ComponentFixture<BlockHeading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockHeading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockHeading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
