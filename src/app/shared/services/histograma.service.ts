import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HistogramaService {


    public calculateHistograma(imagem: number[], maxGrey: number = 256): number[] {
        const histogram = this.initializeHistogramArray(maxGrey);

        for (let pixel of imagem) {
            histogram[pixel] += 1;
        }

        return histogram.map((pixelCount) => pixelCount / maxGrey);
    }

    private initializeHistogramArray(maxGrey: number = 256): number[] {
        let histogram = [];

        for (let i = 0; i < maxGrey; i++) {
            histogram.push(0);
        }

        return histogram;
    }
}
