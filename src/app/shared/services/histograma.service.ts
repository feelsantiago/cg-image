import { Injectable } from '@angular/core';
import { PgmFile } from '../types/pgm-image';
@Injectable({ providedIn: 'root' })
export class HistogramaService {
    public calculateHistograma(
        imagem: number[],
        length: number,
        maxGreyValue = 256
    ): number[] {
        const histogram = this.initializeHistogramArray(maxGreyValue);

        for (let pixel of imagem) {
            histogram[pixel] += 1;
        }

        return histogram.map((pixelCount) => pixelCount / length);
    }

    public equalizeHistogram(
        histogram: number[],
        maxGrey: number = 256
    ): number[] {
        const equalized = [];

        histogram.reduce((acc, next) => {
            const sum = acc + next;
            equalized.push(sum);
            return sum;
        }, 0);

        const pixelsMap = this.initializeHistogramArray();

        for (let i = 0; i < equalized.length; i++) {
            for (let j = 0; j < maxGrey; j++) {
                const track = j / maxGrey;

                if (equalized[i] === track) {
                    pixelsMap[i] = j;
                    break;
                } else if (equalized[i] < track) {
                    const diff = Math.abs(equalized[i] - track);
                    const diffPrevious = Math.abs(
                        equalized[i] - (j - 1) / maxGrey
                    );
                    pixelsMap[i] = diff < diffPrevious ? j : j - 1;
                    break;
                }
            }
        }

        return pixelsMap;
    }

    private initializeHistogramArray(maxGrey: number = 256): number[] {
        const histogram = [];

        for (let i = 0; i < maxGrey; i++) {
            histogram.push(0);
        }

        return histogram;
    }
}
