import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockDotImage } from './block-dotimage';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';

describe('BlockDotImage', () => {
  let component: BlockDotImage;
  let fixture: ComponentFixture<BlockDotImage>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BlockDotImage],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockDotImage);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render an image with correct src and alt', () => {
    component.node = {
      type: 'dotImage',
      attrs: {
        src: '/images/sample.jpg',
        alt: 'Sample Image',
      },
    } as any;

    fixture.detectChanges();

    const img = compiled.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe(environment.DOTCMS_URL + '/images/sample.jpg');
    expect(img?.getAttribute('alt')).toBe('Sample Image');
  });

  it('should render image inside a link when href is present', () => {
    component.node = {
      type: 'dotImage',
      attrs: {
        src: '/images/sample.jpg',
        href: 'https://example.com',
        alt: 'Linked Image',
      },
    } as any;

    fixture.detectChanges();

    const link = compiled.querySelector('a');
    const img = compiled.querySelector('img');

    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toBe('https://example.com');
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(img).toBeTruthy();
  });

  it('should not render anchor tag if href is missing', () => {
    component.node = {
      type: 'dotImage',
      attrs: {
        src: '/images/sample.jpg',
      },
    } as any;

    fixture.detectChanges();

    const link = compiled.querySelector('a');
    expect(link).toBeNull();
  });

  it('should set text alignment correctly', () => {
    component.node = {
      type: 'dotImage',
      attrs: {
        src: '/images/sample.jpg',
        textAlign: 'center',
      },
    } as any;

    fixture.detectChanges();

    const container = compiled.querySelector('div');
    expect(container?.getAttribute('style')).toContain('text-align: center');
  });

  it('should default text alignment to left', () => {
    component.node = {
      type: 'dotImage',
      attrs: {
        src: '/images/sample.jpg',
      },
    } as any;

    fixture.detectChanges();

    const container = compiled.querySelector('div');
    expect(container?.getAttribute('style')).toContain('text-align: left');
  });

  it('should not render image if src is missing', () => {
    component.node = {
      type: 'dotImage',
      attrs: {
        alt: 'No source',
      },
    } as any;

    fixture.detectChanges();

    const img = compiled.querySelector('img');
    expect(img).toBeNull();
  });

  it('should not render anything if node type is not dotImage', () => {
    component.node = {
      type: 'paragraph',
      attrs: {
        src: '/images/sample.jpg',
      },
    } as any;

    fixture.detectChanges();

    const img = compiled.querySelector('img');
    expect(img).toBeNull();
  });
});
