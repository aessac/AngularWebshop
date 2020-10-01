import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShowcartComponent } from './showcart.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ShowcartComponent', () => {
  let component: ShowcartComponent;
  let fixture: ComponentFixture<ShowcartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowcartComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [ShowcartComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
