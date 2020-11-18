import { Component, ViewChild } from '@angular/core';
import { CanvasComponent } from './shared/components/canvas/canvas.component';
import { FilterService } from './shared/services/filter.service';
import { AltoReforcoFilter } from './shared/services/filtros/alto-reforco.filter';
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

    public selectedFilter: FilterTypes;

    public fator: number = 1.2;

    constructor(private readonly filterService: FilterService) {
        this.filters = filterService.getAllFilters();
    }

    public onFilterSelectChange(value: string): void {
        this.selectedFilter = Number(value);
    }

    public onFilterClick() {
        if (this.image) {
            const filter = this.filterService.getFilter(this.selectedFilter);

            let filteredImage;
            if (this.selectedFilter === FilterTypes.AltoReforco) {
                filteredImage = (filter as AltoReforcoFilter).transform(
                    this.image,
                    MaskType.convolution,
                    { fator: this.fator }
                );
            } else {
                filteredImage = filter.transform(
                    this.image,
                    MaskType.convolution
                );
            }

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
