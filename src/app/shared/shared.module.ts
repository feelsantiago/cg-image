import { NgModule } from '@angular/core';
import { CanvasComponent } from './components/canvas/canvas.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

@NgModule({
    declarations: [CanvasComponent, ImageUploadComponent],
    exports: [CanvasComponent, ImageUploadComponent]
})
export class SharedModule { }
