import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentPreviewRoutingModule } from './document-preview-routing.module';
import { ReadDocumentComponent } from './read-document/read-document.component';
import { ReadDocumentHeaderComponent } from './read-document/read-document-header/read-document-header.component';
import { ReadDocumentSideMenuComponent } from './read-document/read-document-side-menu/read-document-side-menu.component';
import { ReadDocumentSinglePageComponent } from './read-document/read-document-single-page/read-document-single-page.component';
import { FormsModule } from '@angular/forms';
import { ReadDocumentProgressBarComponent } from './read-document/read-document-progress-bar/read-document-progress-bar.component';


@NgModule({
  declarations: [ReadDocumentComponent, ReadDocumentHeaderComponent, ReadDocumentSideMenuComponent, ReadDocumentSinglePageComponent, ReadDocumentProgressBarComponent],
  imports: [
    CommonModule,
    DocumentPreviewRoutingModule,
    FormsModule
  ]
})
export class DocumentPreviewModule { }
