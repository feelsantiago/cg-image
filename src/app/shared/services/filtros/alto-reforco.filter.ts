import { Injectable } from '@angular/core';
import { AltoReforcoOptions, Filter, FilterTypes } from '../../types/filter';
import { Mask, MaskType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';
import { BaseFilterService } from '../base-filter.service';
import { ImageHelperService } from '../image-helper.service';
import { PassaAltoBordaFilter } from './passa-alto-bordas.filter';
import { PassaBaixoMediaFilter } from './passa-baixo-media.filter';

@FilterInfo({
    name: 'Alto Reforço',
    type: FilterTypes.AltoReforco,
})
@Injectable({ providedIn: 'root' })
export class AltoReforcoFilter
    extends BaseFilterService
    implements Filter<AltoReforcoOptions> {

    // prettier-ignore
    private mask: Mask = [
        -1/9, -1/9, -1/9,
        -1/9,    9, -1/9,
        -1/9, -1/9, -1/9
    ];

    constructor(imageHelperService: ImageHelperService) {
        super(imageHelperService);
    }

    public transform(
        image: PgmFile,
        type: MaskType,
        options: AltoReforcoOptions = { fator: 1.2 }
    ): number[] {

        const mask = Array.from(this.mask) as Mask;
        mask[4] = ((mask[4] * options.fator) - 1) / 9;

        return this.filterImage(image, mask, type)
    }
}
