import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockDotVideo } from './block-dot-video';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';

describe('BlockDotVideo', () => {
  let component: BlockDotVideo;
  let fixture: ComponentFixture<BlockDotVideo>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BlockDotVideo],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockDotVideo);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render a video element when node type is dotVideo', () => {
    component.node = {
      type: 'dotVideo',
      attrs: {
        src: 'https://example.com/video.mp4',
        data: { title: 'Test Video' },
      },
    } as any;

    fixture.detectChanges();

    const video = compiled.querySelector('video');
    expect(video).toBeTruthy();
    expect(video?.getAttribute('src')).toBe('https://example.com/video.mp4');
    expect(video?.getAttribute('title')).toBe('Test Video');
  });

  it('should prepend DOTCMS_URL if src is relative', () => {
    component.node = {
      type: 'dotVideo',
      attrs: {
        src: '/videos/sample.mp4',
        data: { title: 'Relative Video' },
      },
    } as any;

    fixture.detectChanges();

    const video = compiled.querySelector('video');
    expect(video?.getAttribute('src')).toBe(`${environment.DOTCMS_URL}/videos/sample.mp4`);
  });

  it('should return empty src if not provided', () => {
    component.node = {
      type: 'dotVideo',
      attrs: {},
    } as any;

    fixture.detectChanges();
    expect(component.videoSrc).toBe('');
  });

  it('should fall back to default title if none provided', () => {
    component.node = {
      type: 'dotVideo',
      attrs: { src: 'https://example.com/video.mp4' },
    } as any;

    fixture.detectChanges();
    const video = compiled.querySelector('video');
    expect(video?.getAttribute('title')).toBe('DotCMS Video');
  });

  it('should use default mimeType if not specified', () => {
    component.node = {
      type: 'dotVideo',
      attrs: { src: 'https://example.com/video.mp4' },
    } as any;

    expect(component.mimeType).toBe('video/mp4');
  });

  it('should not render template if node type is not dotVideo', () => {
    component.node = { type: 'image', attrs: { src: 'test.png' } } as any;
    fixture.detectChanges();

    const videoContainer = compiled.querySelector('.dot-video-container');
    expect(videoContainer).toBeNull();
  });
});
