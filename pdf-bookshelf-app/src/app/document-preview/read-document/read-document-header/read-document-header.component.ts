import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-read-document-header',
  templateUrl: './read-document-header.component.html',
  styleUrls: ['./read-document-header.component.scss']
})
export class ReadDocumentHeaderComponent implements OnInit, OnChanges {

  @Input()
  public currentPage: number;

  @Input()
  public numberOfPages: number;

  @Output()
  public pageSelected: EventEmitter<number> = new EventEmitter<number>();

  public pageSelectorValue: number;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentPage) {
      this.pageSelectorValue = this.currentPage;
    }
  }

  setCurrentPage(value: any) {
    this.pageSelectorValue = value;
    this.changeDetectorRef.detectChanges();
    const valueAsNumber = Number.parseInt(value);
    if(isNaN(valueAsNumber) || valueAsNumber < 1 || valueAsNumber > this.numberOfPages) {
      this.pageSelectorValue = this.currentPage;
    } else {
      this.pageSelectorValue = valueAsNumber;
      this.pageSelected.emit(this.pageSelectorValue);
    }
    this.changeDetectorRef.markForCheck();
  }
}
