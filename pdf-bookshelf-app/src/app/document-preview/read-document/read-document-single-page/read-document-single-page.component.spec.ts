import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadDocumentSinglePageComponent } from './read-document-single-page.component';

describe('ReadDocumentSinglePageComponent', () => {
  let component: ReadDocumentSinglePageComponent;
  let fixture: ComponentFixture<ReadDocumentSinglePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadDocumentSinglePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadDocumentSinglePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
