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
export class PassaBaixoMedianaFilter
    extends BaseFilterService
    implements Filter {
    constructor(imageHelperService: ImageHelperService) {
        super(imageHelperService);
    }

    public transform(image: PgmFile, type: MaskType): number[] {
        const newImage = [];

        for (let i = 0; i < image.length; i++) {
            const neighborhoods = this.getNeighborhoods(i, image, false, false);

            const pixelBefore = image.pixels[i];

            neighborhoods.splice(4, 1);
            neighborhoods.sort();

            const half = neighborhoods.length / 2;
            if (neighborhoods.length % 2 === 0) {
                const middleOne = neighborhoods[half];
                const middleTwo = neighborhoods[half + 1];
                newImage.push(middleOne + middleTwo / 2);
            } else {
                newImage.push(neighborhoods[half - 0.5]);
            }
        }

        return newImage;
    }
}
