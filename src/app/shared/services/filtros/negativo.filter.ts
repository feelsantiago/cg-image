import { Injectable } from '@angular/core';
import { Filter, FilterTypes } from '../../types/filter';
import { MaskType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';
import { ImageHelperService } from '../image-helper.service';
@FilterInfo({
    name: 'Negativo',
    type: FilterTypes.Negativo,
})
@Injectable({ providedIn: 'root' })
export class NegativoFilter implements Filter {
    constructor(private readonly imageHelperService: ImageHelperService) {}
    transform(image: PgmFile, type: MaskType, options?: {}): number[] {
        let minValue = 0;
        let maxValue = 255;

        const newImage = [];
        for (let pixel of image.pixels) {
            const value = 255 - pixel;
            minValue = Math.min(pixel, minValue);
            maxValue = Math.max(pixel, maxValue);
            newImage.push(255 - pixel);
        }

        return this.imageHelperService.normalization(
            newImage,
            maxValue,
            minValue,
            image.maxGreyValue
        );
    }
}
