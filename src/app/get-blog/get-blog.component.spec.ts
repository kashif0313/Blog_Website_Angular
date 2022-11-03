import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBlogComponent } from './get-blog.component';

describe('GetBlogComponent', () => {
  let component: GetBlogComponent;
  let fixture: ComponentFixture<GetBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
