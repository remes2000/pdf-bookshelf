import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadDocumentSideMenuComponent } from './read-document-side-menu.component';

describe('ReadDocumentSideMenuComponent', () => {
  let component: ReadDocumentSideMenuComponent;
  let fixture: ComponentFixture<ReadDocumentSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadDocumentSideMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadDocumentSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
