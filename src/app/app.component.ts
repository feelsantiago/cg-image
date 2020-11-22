import { Component, ViewChild } from '@angular/core';
import { CanvasComponent } from './shared/components/canvas/canvas.component';
import { FilterService } from './shared/services/filter.service';
import { AltoReforcoFilter } from './shared/services/filtros/alto-reforco.filter';
import { HistogramaService } from './shared/services/histograma.service';
import { OperationService } from './shared/services/operation.service';
import { Filter, FilterTypes } from './shared/types/filter';
import { Mask, MaskType } from './shared/types/maks';
import { OperationInfo, OperationsTypes } from './shared/types/operation';
import { PgmFile } from './shared/types/pgm-image';
import { FilterTypeInfo, getFilterInfo } from './shared/utils/filter.decorator';
import Plotly from 'plotly.js-dist';
import { GamaFilter } from './shared/services/filtros/gama.filter';
import { LogaritmoFilter } from './shared/services/filtros/logaritimo.filter';

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

    @ViewChild('imageA')
    public imageACanvas: CanvasComponent;

    @ViewChild('imageB')
    public imageBCanvas: CanvasComponent;

    @ViewChild('outPutCanvasOperation')
    public outPutCanvasOperation: CanvasComponent;

    @ViewChild('histogram')
    public histogramCanvas: CanvasComponent;

    @ViewChild('histogramEqualized')
    public histogramEqualizedCanvas: CanvasComponent;

    public image: PgmFile;

    public filters: FilterTypeInfo[] = [];

    public operations: OperationInfo[] = [];

    public selectedFilter: FilterTypes;

    public selectedOperation: OperationsTypes;

    public fator: number = 1.2;

    public gama: number = 0.5;

    public imageA: PgmFile;
    public imageB: PgmFile;
    public histogramImage: PgmFile;

    constructor(
        private readonly filterService: FilterService,
        private readonly operationService: OperationService,
        private readonly histogramaService: HistogramaService
    ) {
        this.filters = filterService.getAllFilters();
        this.operations = operationService.getOperations();
    }

    public onFilterSelectChange(value: string): void {
        this.selectedFilter = Number(value);
    }

    public onOperationSelectChange(value: string): void {
        this.selectedOperation = Number(value);
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
            } else if (this.selectedFilter === FilterTypes.Gama) {
                filteredImage = (filter as GamaFilter).transform(
                    this.image,
                    MaskType.convolution,
                    { y: this.gama }
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

    public onOperationClick() {
        if (this.imageA && this.imageB) {
            const transformedImage = this.operationService.transform(
                this.imageA,
                this.imageB,
                this.selectedOperation
            );
            this.outPutCanvasOperation.drawImage(
                this.imageA.width,
                this.imageA.height,
                transformedImage
            );
        }
    }

    public async onFileChange(files: FilesEvent, type: string) {
        const values = Object.values(files);

        if (values && values.length > 0) {
            if (type === 'filter') {
                this.image = await PgmFile.load(values.shift());
                this.canvas.drawImage(
                    this.image.width,
                    this.image.height,
                    this.image.pixels
                );
            } else if (type === 'imageA') {
                this.imageA = await PgmFile.load(values.shift());
                this.imageACanvas.drawImage(
                    this.imageA.width,
                    this.imageA.height,
                    this.imageA.pixels
                );
            } else if (type === 'imageB') {
                this.imageB = await PgmFile.load(values.shift());
                this.imageBCanvas.drawImage(
                    this.imageB.width,
                    this.imageB.height,
                    this.imageB.pixels
                );
            } else if (type === 'histograma') {
                this.histogramImage = await PgmFile.load(values.shift());
                this.histogramCanvas.drawImage(
                    this.histogramImage.width,
                    this.histogramImage.height,
                    this.histogramImage.pixels
                );

                this.showHistogram();
            }
        }
    }

    private showHistogram() {
        const histogram = this.histogramaService.calculateHistograma(
            this.histogramImage.pixels,
            this.histogramImage.length,
            this.histogramImage.maxGreyValue
        );

        const pixelsMap = this.histogramaService.equalizeHistogram(
            histogram,
            this.histogramImage.maxGreyValue
        );

        const newImage = this.histogramImage.pixels.map(
            (value) => pixelsMap[value]
        );

        this.histogramEqualizedCanvas.drawImage(
            this.histogramImage.width,
            this.histogramImage.height,
            newImage
        );

        const equalizedHistogram = this.histogramaService.calculateHistograma(
            newImage,
            this.histogramImage.length,
            this.histogramImage.maxGreyValue
        );

        console.log(equalizedHistogram.reduce((acc, next) => acc + next));

        Plotly.newPlot(
            'plot-histogram-original',
            [
                {
                    y: histogram,
                    type: 'bar',
                    marker: {
                        color: 'rgba(255, 100, 102, 0.7)',
                        line: {
                            color: 'rgba(255, 100, 102, 1)',
                            width: 1,
                        },
                    },
                },
            ],
            {
                bargap: 0,
                bargroupgap: 0,
                title: 'Imagem Original - Histograma',
                xaxis: { title: 'k (níveis de cinza)' },
                yaxis: { title: 'pr(rk)' },
            }
        );

        Plotly.newPlot(
            'plot-histogram-equalized',
            [
                {
                    y: equalizedHistogram,
                    type: 'bar',
                    marker: {
                        color: 'rgba(255, 100, 102, 0.7)',
                        line: {
                            color: 'rgba(255, 100, 102, 1)',
                            width: 1,
                        },
                    },
                },
            ],
            {
                bargap: 0,
                bargroupgap: 0,
                title: 'Imagem Equalizada - Histograma',
                xaxis: { title: 'k (níveis de cinza)' },
                yaxis: { title: 'pr(rk)' },
            }
        );
    }
}
