import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadDocumentHeaderComponent } from './read-document-header.component';

describe('ReadDocumentHeaderComponent', () => {
  let component: ReadDocumentHeaderComponent;
  let fixture: ComponentFixture<ReadDocumentHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadDocumentHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadDocumentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
