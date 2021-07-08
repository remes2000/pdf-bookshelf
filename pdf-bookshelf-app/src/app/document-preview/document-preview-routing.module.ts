import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadDocumentComponent } from './read-document/read-document.component';

const routes: Routes = [
  {path: 'read', component: ReadDocumentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentPreviewRoutingModule { }
