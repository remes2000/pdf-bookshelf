import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { FileProviderService } from 'src/app/shared/file-provider/file-provider.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {

  constructor(
    private router: Router,
    private fileProviderService: FileProviderService
  ) { }

  public selectedFile: File = null;
  public form: FormGroup = new FormGroup({
    bookName: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  fileDropdownChange(event: NgxDropzoneChangeEvent) {
    if(event.addedFiles) {
      this.selectFile(event.addedFiles[0]);
    } else if (event.rejectedFiles) {
      this.rejectFile();
    }
  }

  selectFile(file: File) {
    this.selectedFile = file;
    this.form.get('bookName')?.setValue(this.removeExtension(file.name));
  }

  rejectFile() {
    this.selectedFile = null;
    this.form.reset();
  }

  removeExtension(name: string) {
    return name.split('.')[0];
  }

  saveDocument() {
    alert('Operation not supported yet :/');
  }

  showDocument() {
    if(!this.selectedFile) {
      return;
    }

    this.fileProviderService.setFile(this.selectedFile);
    this.router.navigate(['/read']);
  }
}
