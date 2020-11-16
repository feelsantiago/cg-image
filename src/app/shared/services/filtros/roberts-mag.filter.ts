import { Injectable } from '@angular/core';
import { Filter, FilterTypes } from '../../types/filter';
import { Mask, MaskType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';
import { BaseFilterService } from '../base-filter.service';
import { ImageHelperService } from '../image-helper.service';

@FilterInfo({
    name: 'Operador Roberts - Magnitude',
    type: FilterTypes.RobertsMag,
})
@Injectable({ providedIn: 'root' })
export class RobertsMagFilter extends BaseFilterService implements Filter {
    // prettier-ignore
    private maskX: Mask = [
        0,  0, 0,
        0,  1, 0,
        0, -1, 0
    ];

    // prettier-ignore
    private maskY: Mask = [
        0, 0,  0,
        0, 1, -1,
        0, 0,  0
    ];

    constructor(imageHelperService: ImageHelperService) {
        super(imageHelperService);
    }

    public transform(image: PgmFile, type: MaskType): number[] {
        const filterX = this.filterImage(image, this.maskX, type);
        const filterY = this.filterImage(image, this.maskY);

        const imageMag = [];

        for (let i = 0; i < image.length; i++) {
            const xPow = Math.pow(filterX[i], 2);
            const yPow = Math.pow(filterY[i], 2);
            imageMag.push(Math.sqrt(xPow + yPow));
        }

        return imageMag;
    }
}
