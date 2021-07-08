import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { renderTextLayer } from 'pdfjs-dist';
import { PDFDocumentProxy, PDFPageProxy, TextContent } from 'pdfjs-dist/types/display/api';

@Component({
  selector: 'app-read-document-single-page',
  templateUrl: './read-document-single-page.component.html',
  styleUrls: ['./read-document-single-page.component.scss']
})
export class ReadDocumentSinglePageComponent implements OnInit {

  public static PLACEHOLDER_HEIGHT = 25;
  public static PLACEHOLDER_PAGE_PADDING = 8;
  public static PAGE_MARGIN = 15;

  @ViewChild('canvas')
  private canvas: ElementRef<HTMLCanvasElement>;

  @ViewChild('textLayer')
  private textLayer: ElementRef<HTMLDivElement>;

  public pageWidth: number;
  public pageHeight: number;
  public numberOfPlaceholders: number;
  public isRendered: boolean = false;
  public isRendering: boolean = false;
  private pdfDocument: PDFDocumentProxy;
  private pageNumber: number;

  constructor() { }

  ngOnInit(): void {
  }

  initialize(pageNumber: number, width: number, height: number, pdfDocument: PDFDocumentProxy) {
    this.pageNumber = pageNumber;
    this.pageWidth = width;
    this.pageHeight = height;
    this.pdfDocument = pdfDocument;
    this.numberOfPlaceholders = this.getNumberOfPlaceholders();
  }

  getNumberOfPlaceholders(): number {
    return Math.floor((this.pageHeight - ReadDocumentSinglePageComponent.PLACEHOLDER_PAGE_PADDING * 2)/ReadDocumentSinglePageComponent.PLACEHOLDER_HEIGHT);
  }

  public async render(): Promise<void> {
    if(!this.canvas || !this.textLayer) {
      throw `Component is before view init, cannot render pdf page. Page number: ${this.pageNumber}`;
    }
    this.isRendering = true;
    const page = await this.pdfDocument.getPage(this.pageNumber);
    const scale = this.pageWidth / page.getViewport({ scale: 1 }).width;
    const viewport = page.getViewport({ scale });
    this.pageWidth = viewport.width;
    this.pageHeight = viewport.height;
    this.canvas.nativeElement.width = viewport.width;
    this.canvas.nativeElement.height = viewport.height;
    const canvasContext = this.canvas.nativeElement.getContext('2d');
    await page.render({ canvasContext, viewport }).promise;
    const textContent = await page.getTextContent();
    await renderTextLayer({
      textContent,
      container: this.textLayer.nativeElement,
      viewport
    }).promise;
    this.isRendering = false;
    this.isRendered = true;
  }

  public free() {
    const context = this.canvas.nativeElement.getContext('2d');
    context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.textLayer.nativeElement.innerHTML = '';
  }
}
