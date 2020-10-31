import {  } from '@angular/common';
import { NgModule } from '@angular/core';
import { CanvasComponent } from './components/canvas/canvas.component';

@NgModule({
    declarations: [CanvasComponent],
    exports: [CanvasComponent]
})
export class SharedModule {}
