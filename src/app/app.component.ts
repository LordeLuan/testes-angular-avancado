import { Photo } from './shared/components/photo-board/models/photo';
import { Observable } from 'rxjs';
import { PhotoBoardService } from './shared/components/photo-board/photo-board.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Angular testing';

  public photos$: Observable<Photo[]>;

  constructor(private service: PhotoBoardService) {}

  ngOnInit(): void {
    this.photos$ = this.service.getPhotos();
  }
  
}
