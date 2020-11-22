import { Injectable } from '@angular/core';
import { Filter, FilterTypes, LogaritmoOptions } from '../../types/filter';
import { MaskType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';

@FilterInfo({
    name: 'Logaritmo ',
    type: FilterTypes.Logaritmo,
})
@Injectable({ providedIn: 'root' })
export class LogaritmoFilter implements Filter<LogaritmoOptions> {
    transform(image: PgmFile, type: MaskType, options = { a: 100}): number[] {
        const newImage = [];

        for (let pixel of image.pixels) {
            newImage.push(options.a * Math.log10(pixel + 1));
        }

        return newImage;
    }
}
