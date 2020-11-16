import { Injectable } from '@angular/core';
import { Filter, FilterTypes } from '../../types/filter';
import { Mask, MaskType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';
import { BaseFilterService } from '../base-filter.service';
import { ImageHelperService } from '../image-helper.service';

@FilterInfo({
    name: 'Passa Baixo - Mediana',
    type: FilterTypes.PassaBaixoMediana,
})
@Injectable({ providedIn: 'root' })
export class PassaBaixoMedianaFilter extends BaseFilterService implements Filter {

    constructor(imageHelperService: ImageHelperService) {
        super(imageHelperService);
    }

    public transform(image: PgmFile, type: MaskType): number[] {

        const newImage = [];

        for (let i = 0; i < image.length; i++) {

            const neighborhoods = this.getNeighborhoods(i, image);
            neighborhoods.sort();

            const middleOne = neighborhoods[3];
            const middleTwo = neighborhoods[5];

            newImage.push((middleOne + middleTwo) / 2);
        }

        return newImage;
    }
}
