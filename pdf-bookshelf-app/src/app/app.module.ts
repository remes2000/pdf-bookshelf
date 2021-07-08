import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentPreviewModule } from './document-preview/document-preview.module';
import { NavbarComponent } from './shell/navbar/navbar.component';
import { AddDocumentComponent } from './dashboard/add-document/add-document.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    AddDocumentComponent
  ],
  imports: [
    NgxDropzoneModule,
    BrowserModule,
    AppRoutingModule,
    DocumentPreviewModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
