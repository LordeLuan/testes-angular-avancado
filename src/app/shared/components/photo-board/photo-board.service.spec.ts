import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { PhotoBoardService } from './photo-board.service';

describe('PhotoBoardService', () => {
  let service: PhotoBoardService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PhotoBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
