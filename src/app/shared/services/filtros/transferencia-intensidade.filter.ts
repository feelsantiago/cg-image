import { Injectable } from '@angular/core';
import median from 'median';
import { Filter, FilterTypes } from '../../types/filter';
import { MaskType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';
import { ImageHelperService } from '../image-helper.service';

@FilterInfo({
    name: 'Transferência de Intetensidade',
    type: FilterTypes.TransferenciaIntensidade
})
@Injectable({ providedIn: 'root' })
export class TransferenciaIntensidadeFilter implements Filter {

    constructor(private readonly imageHelperService: ImageHelperService) {}

    transform(image: PgmFile, type: MaskType, options?: {}): number[] {
        const newImage = [];
        const centerPixel = median(Array.from(image.pixels));

        let minValue = 0;
        let maxValue = 255;

        for (let pixel of image.pixels) {

            const pow = (pixel - centerPixel) / image.width;
            const result = Math.round(255 * (1 / 1 + Math.exp(-pow)));

            minValue = Math.min(result, minValue);
            maxValue = Math.max(result, maxValue);

            newImage.push(result);
        }

        return this.imageHelperService.normalization(
            newImage,
            maxValue,
            minValue,
            image.maxGreyValue
        );;
    }
}
