import { Injectable } from '@angular/core';
import { Filter, FilterTypes, GamaOptions } from '../../types/filter';
import { MaskType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';
import { ImageHelperService } from '../image-helper.service';

@FilterInfo({
    name: 'Gama',
    type: FilterTypes.Gama
})
@Injectable({ providedIn: 'root' })
export class GamaFilter implements Filter<GamaOptions> {

    constructor(private readonly imageHelperService: ImageHelperService) {}

    public transform(image: PgmFile, type: MaskType, options = { y: 0.5}): number[] {

        const newImage = [];

        for (let pixel of image.pixels) {
            newImage.push(Math.round(Math.pow(pixel, options.y)));
        }

        return newImage;
    }
}
