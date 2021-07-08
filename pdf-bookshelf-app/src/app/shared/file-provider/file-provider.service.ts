import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileProviderService {

  constructor(
    private http: HttpClient
  ) { }

  private file: File = null;

  public setFile(file: File) {
    this.file = file;
  }

  public getFile(): File|null {
    return this.file;
  }
}
