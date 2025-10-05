import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { By } from '@angular/platform-browser';
import { SupportedYears } from '../../../core/types';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and logo correctly', () => {
    component.title = 'DotCMS News';
    component.imageUrl = 'https://example.com/logo.png';
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css('.title')).nativeElement;
    const imgEl = fixture.debugElement.query(By.css('.logo')).nativeElement;

    expect(titleEl.textContent).toBe('DotCMS News');
    expect(imgEl.getAttribute('src')).toBe('https://example.com/logo.png');
    expect(imgEl.getAttribute('alt')).toBe('DotCMS Logo');
  });

  it('should have correct year options', () => {
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(By.css('select option'));
    const values = options.map(opt => opt.nativeElement.value);

    expect(values).toEqual(['0', '2025', '2024', '2023', '2022', '2021', '2020']);
    const selected = options.find(opt => opt.nativeElement.selected);
    expect(selected?.nativeElement.value).toBe('0'); // "all" should be selected
  });

  it('should emit filterChanged event when year changes', () => {
    fixture.detectChanges();
    spyOn(component.filterChanged, 'emit');

    const selectEl: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    selectEl.value = '2024';
    selectEl.dispatchEvent(new Event('change'));

    expect(component.filterChanged.emit).toHaveBeenCalledWith(2024 as SupportedYears);
  });

  it('should emit 0 (all) when default option is selected', () => {
    fixture.detectChanges();
    spyOn(component.filterChanged, 'emit');

    const selectEl: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    selectEl.value = '0';
    selectEl.dispatchEvent(new Event('change'));

    expect(component.filterChanged.emit).toHaveBeenCalledWith(0 as SupportedYears);
  });
});
