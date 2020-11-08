import { Injectable } from '@angular/core';
import { Filter } from '../../types/filter';
import { Mask, MaskType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { BaseFilterService } from '../base-filter.service';
import { ImageHelperService } from '../image-helper.service';

@Injectable({ providedIn: 'root' })
export class PassaAltoBordaFilter extends BaseFilterService implements Filter {

    // prettier-ignore
    private mask: Mask = [
        -1, -1, -1,
        -1,  8, -1,
        -1, -1, -1
    ];

    constructor(imageHelperService: ImageHelperService) {
        super(imageHelperService);
    }

    public transform(image: PgmFile, type: MaskType): number[] {
        return this.filterImage(image, this.mask, type);
    }
}
