import { Component, ViewChild } from '@angular/core';
import { CanvasComponent } from './shared/components/canvas/canvas.component';
import { FilterService } from './shared/services/filter.service';
import { Filter, FilterTypes } from './shared/types/filter';
import { Mask, MaskType } from './shared/types/maks';
import { PgmFile } from './shared/types/pgm-image';
import { FilterTypeInfo, getFilterInfo } from './shared/utils/filter.decorator';

type FilesEvent = { [key: number]: File };

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @ViewChild(CanvasComponent)
    public canvas: CanvasComponent;

    @ViewChild('outPutCanvas')
    public outPutCanvas: CanvasComponent;

    public image: PgmFile;

    public filters: FilterTypeInfo[] = [];

    constructor(private readonly filterService: FilterService) {
        this.filters = filterService.getAllFilters();
    }

    public onFilterSelectChange(value: string): void {
        if (this.image) {
            const filteredImage = this.filterService
                .getFilter(Number(value))
                .transform(this.image, MaskType.correlation);

            this.outPutCanvas.drawImage(
                this.image.width,
                this.image.height,
                filteredImage
            );
        }
    }

    public async onFileChange(files: FilesEvent) {
        const values = Object.values(files);

        if (values && values.length > 0) {
            this.image = await PgmFile.load(values.shift());
            this.canvas.drawImage(
                this.image.width,
                this.image.height,
                this.image.pixels
            );
        }
    }
}
