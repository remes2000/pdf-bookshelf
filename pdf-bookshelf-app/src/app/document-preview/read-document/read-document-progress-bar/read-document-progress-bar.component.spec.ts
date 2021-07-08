import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadDocumentProgressBarComponent } from './read-document-progress-bar.component';

describe('ReadDocumentProgressBarComponent', () => {
  let component: ReadDocumentProgressBarComponent;
  let fixture: ComponentFixture<ReadDocumentProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadDocumentProgressBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadDocumentProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
