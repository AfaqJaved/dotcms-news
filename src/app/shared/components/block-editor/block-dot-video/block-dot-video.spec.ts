import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockDotVideo } from './block-dot-video';

describe('BlockDotVideo', () => {
  let component: BlockDotVideo;
  let fixture: ComponentFixture<BlockDotVideo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockDotVideo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockDotVideo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
