import { Injectable } from '@angular/core';
import { Filter, FilterTypes } from '../../types/filter';
import { Mask, MaskType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';
import { BaseFilterService } from '../base-filter.service';
import { ImageHelperService } from '../image-helper.service';

@FilterInfo({
    name: 'Sobel - X',
    type: FilterTypes.SobelX,
})
@Injectable({ providedIn: 'root' })
export class SobelXFilter extends BaseFilterService implements Filter {
    // prettier-ignore
    private mask: Mask = [
        -1,  -2,  -1,
         0,   0,   0,
         1,   2,   1
    ];

    constructor(imageHelperService: ImageHelperService) {
        super(imageHelperService);
    }

    public transform(image: PgmFile, type: MaskType): number[] {
        return this.filterImage(image, this.mask, type);
    }
}
