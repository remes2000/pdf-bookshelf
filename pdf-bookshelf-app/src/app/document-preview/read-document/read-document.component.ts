import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, HostListener, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FileProviderService } from 'src/app/shared/file-provider/file-provider.service';
import { getDocument, renderTextLayer } from 'pdfjs-dist';
import { PDFDocumentProxy, PDFOperatorList } from 'pdfjs-dist/types/display/api';
import { ReadDocumentSinglePageComponent } from './read-document-single-page/read-document-single-page.component';
import { PageViewport } from 'pdfjs-dist/types/display/display_utils';

@Component({
  selector: 'app-read-document',
  templateUrl: './read-document.component.html',
  styleUrls: ['./read-document.component.scss']
})
export class ReadDocumentComponent implements OnInit {

  @ViewChild('pagesContainer', {read: ViewContainerRef}) 
  private pagesContainer: ViewContainerRef;

  @ViewChild('pagesContainerWrapper')
  private pagesContainerWrapper: ElementRef<HTMLDivElement>;

  private pages: ReadDocumentSinglePageComponent[] = [];

  public documentFile: File;
  public pdfDocument: PDFDocumentProxy;
  public numberOfPages: number = null;
  private firstPageViewport: PageViewport = null;
  private firstPageScaledViewport: PageViewport = null;
  private desiredPageWidth: number = null;
  public currentPage: number = 1;

  constructor(
    private fileProviderService: FileProviderService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  async ngOnInit(): Promise<void> {
    this.documentFile = this.fileProviderService.getFile();
    if(this.documentFile) {
      this.pdfDocument = await this.initializePdfDocument(this.documentFile);
    } else {
      this.pdfDocument = await getDocument('assets/example-book.pdf').promise;
    }
    this.desiredPageWidth = this.getDesiredPageWidth();
    await this.setFirstPageViewports();
    this.numberOfPages = this.pdfDocument.numPages;
    this.initDocumentPages();
  }

  async initializePdfDocument(file: File): Promise<PDFDocumentProxy> {
    const arrayBuffer = await this.documentFile.arrayBuffer();
    return await getDocument(new Int8Array(arrayBuffer)).promise;
  }

  async setFirstPageViewports(): Promise<void> {
    const firstPage = await this.pdfDocument.getPage(1);
    this.firstPageViewport = firstPage.getViewport({ scale: 1 });
    const scale = this.desiredPageWidth / this.firstPageViewport.width
    this.firstPageScaledViewport = firstPage.getViewport({ scale });
  }

  getDesiredPageWidth(): number {
    return 0.8 * window.innerWidth * 0.6;
  }

  async initDocumentPages() {
    for(let i=1; i<=this.numberOfPages; i++) {
      this.initPage(i);
    }
    console.time('totalRender')
    for(let i=13; i<14; i++) {
      console.time('page');
      await this.pages[i].render();
      console.timeEnd('page');
    }
    console.log('total render');
    console.timeEnd('totalRender');
  }

  initPage(pageNumber: number) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ReadDocumentSinglePageComponent);
    const singlePageComponentRef = this.pagesContainer.createComponent(componentFactory);
    this.pages.push(singlePageComponentRef.instance);
    singlePageComponentRef.instance.initialize(
      pageNumber, 
      this.firstPageScaledViewport.width, 
      this.firstPageScaledViewport.height, 
      this.pdfDocument
    );
    singlePageComponentRef.changeDetectorRef.detectChanges();
  } 

  onPagesContainerScroll(event: any) {
    const scrollTop = event.srcElement.scrollTop;
    let pagesOffset = 0;
    let pageIndex = 0;
    while (pagesOffset <= scrollTop) {
      pagesOffset += this.pages[pageIndex].pageHeight + (2 * ReadDocumentSinglePageComponent.PAGE_MARGIN);
      pageIndex++;
    }
    this.setCurrentPage(pageIndex);
  }

  setCurrentPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  onPageSelected(pageNumber: number) {
    this.setCurrentPage(pageNumber);
    this.scrollToPage(pageNumber);
  }

  scrollToPage(pageNumber: number) {
    let pagesOffset = 0;
    for(let i=0; i<pageNumber - 1; i++) {
      pagesOffset += this.pages[i].pageHeight + (2 * ReadDocumentSinglePageComponent.PAGE_MARGIN);
    }
    this.pagesContainerWrapper.nativeElement.scrollTo(0, pagesOffset + 1);
  }
}
