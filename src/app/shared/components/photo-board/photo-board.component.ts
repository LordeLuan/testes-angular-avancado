import { Photo } from './models/photo';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-photo-board',
  templateUrl: './photo-board.component.html',
  styleUrls: ['./photo-board.component.scss'],
})
export class PhotoBoardComponent implements OnInit, OnChanges {
  @Input()
  public photos: Photo[];
  public rows: any[][] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.photos) {
      this.rows = this.groupColumns(changes.photos.currentValue);
    }
  }

  groupColumns(photos: Photo[]): any[][] {
    const newRows = [];
    const step = 4;
    // Pega de 4 em 4 fotos e coloca nas linhas
    for (let index = 0; index < photos.length; index += step) {
      newRows.push(photos.slice(index, index + step));
    }
    return newRows;
  }

  
}
