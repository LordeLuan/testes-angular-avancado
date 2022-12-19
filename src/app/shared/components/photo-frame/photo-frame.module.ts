import { LikeWidgetModule } from './../like-widget/like-widget.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PhotoFrammeComponent } from './photo-frame.component';


@NgModule({
    declarations: [PhotoFrammeComponent],
    imports: [
        CommonModule,
        LikeWidgetModule
    ],
    exports: []
})
export class PhotoFrameModule{

}
