import { Injectable } from '@angular/core';
import { Filter } from '../../types/filter';
import { Mask, MaskType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { BaseFilterService } from '../base-filter.service';

@Injectable({ providedIn: 'root' })
export class PassaAltoBordaFilter extends BaseFilterService implements Filter {

    private mask: Mask = [
        -1, -1, -1,
        -1,  8, -1,
        -1, -1, -1
    ];

    public transform(image: PgmFile, type: MaskType): number[] {
        return this.filterImage(image, this.mask, type);
    }
}
