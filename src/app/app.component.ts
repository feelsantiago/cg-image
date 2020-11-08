import { Component, ViewChild } from '@angular/core';
import { CanvasComponent } from './shared/components/canvas/canvas.component';
import { FilterService } from './shared/services/filter.service';
import { FilterTypes } from './shared/types/filter';
import { Mask, MaskType } from './shared/types/maks';
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
    public canvas: CanvasComponent;

    @ViewChild('outPutCanvas')
    public outPutCanvas: CanvasComponent;

    constructor(private readonly filterService: FilterService) {}

    public async onFileChange(files: FilesEvent) {
        const values = Object.values(files);

        if (values && values.length > 0) {
            this.image = await PgmFile.load(values.shift());
            this.canvas.drawImage(
                this.image.width,
                this.image.height,
                this.image.pixels
            );


            const mask: Mask = [
                -1, -1, -1,
                -1,  9, -1,
                -1, -1, -1
            ];

            const filteredImage = this.filterService.getFilter(FilterTypes.PassaAltoAgucamento).transform(this.image, MaskType.correlation);

            this.outPutCanvas.drawImage(
                this.image.width,
                this.image.height,
                filteredImage
            );
        }
    }
}
