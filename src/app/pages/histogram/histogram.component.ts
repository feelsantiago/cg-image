import { Component, ViewChild } from '@angular/core';
import { ImageUpload, PgmFile } from '../../shared/types/pgm-image';
import { HistogramaService } from '../../shared/services/histograma.service';
import { CanvasComponent } from '../../shared/components/canvas/canvas.component';
import Plotly from 'plotly.js-dist';

@Component({
    selector: 'app-histogram',
    templateUrl: './histogram.component.html',
    styleUrls: ['./histogram.component.scss']
})
export class HistogramComponent {
    @ViewChild('histogram')
    public histogramCanvas: CanvasComponent;

    @ViewChild('histogramEqualized')
    public histogramEqualizedCanvas: CanvasComponent;

    public histogramImage: PgmFile;

    constructor(private readonly histogramaService: HistogramaService) { }

    public async onFileChange(values: ImageUpload) {
        const files = values.files;
        const type = values.type;

        if (files && files.length > 0) {
            this.histogramImage = await PgmFile.load(files.shift());
            this.histogramCanvas.drawImage(
                this.histogramImage.width,
                this.histogramImage.height,
                this.histogramImage.pixels
            );

            this.showHistogram();
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

        const newImage = this.histogramImage.pixels.map((value) => pixelsMap[value]);

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
                autosize: false,
                width: 650,
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
                autosize: false,
                width: 650,
                bargap: 0,
                bargroupgap: 0,
                title: 'Imagem Equalizada - Histograma',
                xaxis: { title: 'k (níveis de cinza)' },
                yaxis: { title: 'pr(rk)' },
            }
        );
    }
}
