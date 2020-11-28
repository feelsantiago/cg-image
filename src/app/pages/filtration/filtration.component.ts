import { Component, ViewChild } from '@angular/core';
import { ImageUpload, PgmFile } from '../../shared/types/pgm-image';
import { FilterTypes } from '../../shared/types/filter';
import { FilterTypeInfo } from '../../shared/utils/filter.decorator';
import { MaskType } from '../../shared/types/maks';
import { FilterService } from '../../shared/services/filter.service';
import { AltoReforcoFilter } from '../../shared/services/filtros/alto-reforco.filter';
import { CanvasComponent } from '../../shared/components/canvas/canvas.component';
import { GamaFilter } from 'src/app/shared/services/filtros/gama.filter';
import { TransformationService } from 'src/app/shared/services/transformation.service';

@Component({
    selector: 'app-filtration',
    templateUrl: './filtration.component.html',
    styleUrls: ['./filtration.component.scss']
})
export class FiltrationComponent {
    @ViewChild(CanvasComponent)
    public canvas: CanvasComponent;

    @ViewChild('outPutCanvas')
    public outPutCanvas: CanvasComponent;

    public image: PgmFile;

    public filters: FilterTypeInfo[] = [];

    public outPutImage: PgmFile;

    public selectedFilter: FilterTypes;

    public fator: number = 1.2;

    public gama: number = 0.5;

    constructor(private readonly filterService: FilterService, private readonly transformationService: TransformationService) {
        this.filters = filterService.getAllFilters();
    }

    public onFilterSelectChange(value: string): void {
        this.selectedFilter = Number(value);
    }

    public onFilterClick() {
        if (this.image) {
            // SCALING
            // this.outPutImage = this.transformationService.scale(this.image, 0.5, 0.5);

            // this.outPutImage = this.transformationService.translation(
            //     this.image,
            //     10,
            //     40
            // );

            // this.outPutImage = this.transformationService.rotate(this.image, 45);

             this.outPutImage = this.transformationService.shear(
                 this.image,
                 0.5,
                 0.5
             );

            this.outPutCanvas.drawImage(
                this.outPutImage.width,
                this.outPutImage.height,
                this.outPutImage.pixels
            );

            // const filter = this.filterService.getFilter(this.selectedFilter);

            // let filteredImage;
            // if (this.selectedFilter === FilterTypes.AltoReforco) {
            //     filteredImage = (filter as AltoReforcoFilter).transform(
            //         this.image,
            //         MaskType.convolution,
            //         { fator: this.fator }
            //     );
            // } else if (this.selectedFilter === FilterTypes.Gama) {
            //     filteredImage = (filter as GamaFilter).transform(
            //         this.image,
            //         MaskType.convolution,
            //         { y: this.gama }
            //     );
            // } else {
            //     filteredImage = filter.transform(
            //         this.image,
            //         MaskType.convolution
            //     );
            // }

            // this.outPutCanvas.drawImage(
            //     this.image.width,
            //     this.image.height,
            //     filteredImage
            // );
        }
    }

    public async onFileChange(values: ImageUpload) {
        const files = values.files;

        if (files && files.length > 0) {
            this.image = await PgmFile.load(files.shift());
            this.canvas.drawImage(
                this.image.width,
                this.image.height,
                this.image.pixels
            );
        }
    }
}
