import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogFullComponent } from './blog-full.component';

describe('BlogFullComponent', () => {
  let component: BlogFullComponent;
  let fixture: ComponentFixture<BlogFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
