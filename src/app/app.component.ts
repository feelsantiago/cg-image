import { Component, ViewChild } from '@angular/core';
import { type } from 'os';
import { CanvasComponent } from './shared/components/canvas/canvas.component';
import { PgmFile } from './shared/types/pgm-image';

type FilesEvent = { [key: number]: File }

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public image: PgmFile;

    @ViewChild(CanvasComponent)
    public canvas: CanvasComponent

    public async onFileChange(files: FilesEvent) {
        const values = Object.values(files);

        if (values && values.length > 0) {
            this.image = await PgmFile.load(values.shift());
            this.canvas.drawImage(this.image);
        }
    }
}
