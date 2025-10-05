import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockYoutube } from './block-youtube';

describe('BlockYoutube', () => {
  let component: BlockYoutube;
  let fixture: ComponentFixture<BlockYoutube>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockYoutube]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockYoutube);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
