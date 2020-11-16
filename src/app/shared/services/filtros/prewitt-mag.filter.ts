import { Injectable } from '@angular/core';
import { Filter, FilterTypes } from '../../types/filter';
import { Mask, MaskType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';
import { BaseFilterService } from '../base-filter.service';
import { ImageHelperService } from '../image-helper.service';

@FilterInfo({
    name: 'Prewitt - Magnitude',
    type: FilterTypes.PrewittMag,
})
@Injectable({ providedIn: 'root' })
export class PrewittMagFilter extends BaseFilterService implements Filter {
    // prettier-ignore
    private maskX: Mask = [
        -1,  -1,  -1,
         0,   0,   0,
         1,   1,   1
    ];

    // prettier-ignore
    private maskY: Mask = [
        -1,   0,   1,
        -1,   0,   1,
        -1,   0,   1
    ];

    constructor(imageHelperService: ImageHelperService) {
        super(imageHelperService);
    }

    public transform(image: PgmFile, type: MaskType): number[] {
        const filterX = this.filterImage(image, this.maskX, type, true);
        const filterY = this.filterImage(image, this.maskY, type, true);

        const imageMag = [];

        for (let i = 0; i < image.length; i++) {
            imageMag.push(filterX[i] + filterY[i]);
        }

        return imageMag;
    }
}
