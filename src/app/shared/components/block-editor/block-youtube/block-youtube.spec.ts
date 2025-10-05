import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockYoutube } from './block-youtube';
import { DomSanitizer } from '@angular/platform-browser';
import { By } from '@angular/platform-browser';
import { BlockEditorNode } from '../../../../core/types';

describe('BlockYoutube', () => {
  let component: BlockYoutube;
  let fixture: ComponentFixture<BlockYoutube>;
  let sanitizer: DomSanitizer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockYoutube],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockYoutube);
    component = fixture.componentInstance;
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate a safe embed URL from YouTube link', () => {
    const mockNode: BlockEditorNode = {
      type: 'youtube',
      attrs: { src: 'https://www.youtube.com/watch?v=abc123', start: 10 },
    } as any;

    component.node = mockNode;
    const spy = spyOn(sanitizer, 'bypassSecurityTrustResourceUrl').and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
    const expectedEmbedUrl = 'https://www.youtube.com/embed/abc123?start=10';
    const actualCall = spy.calls.mostRecent().args[0];
    expect(actualCall).toBe(expectedEmbedUrl);
  });

  it('should use default video URL when src is missing', () => {
    component.node = { type: 'youtube', attrs: {} } as any;
    const spy = spyOn(sanitizer, 'bypassSecurityTrustResourceUrl').and.callThrough();

    component.ngOnInit();

    const expectedDefaultUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?start=0';
    expect(spy.calls.mostRecent().args[0]).toBe(expectedDefaultUrl);
  });

  it('should handle invalid URLs gracefully', () => {
    component.node = { type: 'youtube', attrs: { src: 'invalid-url' } } as any;

    const spy = spyOn(sanitizer, 'bypassSecurityTrustResourceUrl').and.callThrough();
    component.ngOnInit();

    const expectedUrl = 'https://www.youtube.com/embed/?start=0';
    expect(spy.calls.mostRecent().args[0]).toBe(expectedUrl);
  });

  it('should render iframe with proper attributes', () => {
    component.node = {
      type: 'youtube',
      attrs: { src: 'https://www.youtube.com/watch?v=test123', width: 640, height: 360 },
    } as any;

    component.ngOnInit();
    fixture.detectChanges();

    const iframeEl = fixture.debugElement.query(By.css('iframe')).nativeElement;
    expect(iframeEl.getAttribute('width')).toBe('640');
    expect(iframeEl.getAttribute('height')).toBe('360');
    expect(iframeEl.getAttribute('allowfullscreen')).not.toBeNull();
  });

  it('should return correct embed URL from extractEmbedUrl()', () => {
    component.node = { attrs: { start: 15 } } as any;
    const url = component['extractEmbedUrl']('https://www.youtube.com/watch?v=xyz999');
    expect(url).toBe('https://www.youtube.com/embed/xyz999?start=15');
  });
});
