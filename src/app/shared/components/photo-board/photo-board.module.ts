import { PhotoBoardService } from './photo-board.service';
import { PhotoFrameModule } from './../photo-frame/photo-frame.module';
import { CommonModule } from '@angular/common';
import { PhotoBoardComponent } from './photo-board.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PhotoBoardComponent],
  imports: [
    CommonModule,
    PhotoFrameModule,
    HttpClientModule
  ],
  exports: [PhotoBoardComponent],
  providers: [PhotoBoardService]
})
export class PhotoBoardModule{}
