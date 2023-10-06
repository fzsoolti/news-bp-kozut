import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPaginatorComponent } from './news-paginator.component';

describe('NewsPaginatorComponent', () => {
  let component: NewsPaginatorComponent;
  let fixture: ComponentFixture<NewsPaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsPaginatorComponent]
    });
    fixture = TestBed.createComponent(NewsPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
