import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { buildPhotosList } from 'src/app/shared/components/photo-board/test/build-photo-list';
import { Photo } from './../models/photo';
import { PhotoBoardService } from './photo-board.service';


@Injectable({
  providedIn: 'root'
})
export class PhotoBoardServiceMock extends PhotoBoardService{


  public getPhotos(): Observable<Photo[]>{
    return of(buildPhotosList());
  }
}
