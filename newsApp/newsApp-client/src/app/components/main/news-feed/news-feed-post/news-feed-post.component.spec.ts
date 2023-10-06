import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFeedPostComponent } from './news-feed-post.component';

describe('NewsFeedPostComponent', () => {
  let component: NewsFeedPostComponent;
  let fixture: ComponentFixture<NewsFeedPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsFeedPostComponent]
    });
    fixture = TestBed.createComponent(NewsFeedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
