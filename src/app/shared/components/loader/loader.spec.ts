import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Loader } from './loader';
import { By } from '@angular/platform-browser';

describe('Loader', () => {
  let component: Loader;
  let fixture: ComponentFixture<Loader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loader],
    }).compileComponents();

    fixture = TestBed.createComponent(Loader);
    component = fixture.componentInstance;
  });

  it('should create the loader component', () => {
    expect(component).toBeTruthy();
  });

  it('should not render anything when visible is false', () => {
    component.visible = false;
    fixture.detectChanges();

    const overlay = fixture.debugElement.query(By.css('.overlay'));
    expect(overlay).toBeNull();
  });

  it('should render loader and text when visible is true', () => {
    component.visible = true;
    fixture.detectChanges();

    const overlay = fixture.debugElement.query(By.css('.overlay'));
    const loader = fixture.debugElement.query(By.css('.loader'));
    const heading = fixture.debugElement.query(By.css('.loaderHeading')).nativeElement;

    expect(overlay).toBeTruthy();
    expect(loader).toBeTruthy();
    expect(heading.textContent.trim()).toBe('Loading...');
  });


  it('should apply default size and color when not provided', () => {
    component.visible = true;
    fixture.detectChanges();

    expect(component.size).toBe(60);
    expect(component.color).toBe('#4f46e5');
  });
});
