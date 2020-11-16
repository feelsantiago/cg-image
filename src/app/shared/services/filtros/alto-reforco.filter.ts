import { Injectable } from '@angular/core';
import { AltoReforcoOptions, Filter, FilterTypes } from '../../types/filter';
import { Mask, MaskType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';
import { BaseFilterService } from '../base-filter.service';
import { ImageHelperService } from '../image-helper.service';
import { PassaBaixoMediaFilter } from './passa-baixo-media.filter';

@FilterInfo({
    name: 'Alto Reforço',
    type: FilterTypes.AltoReforco,
})
@Injectable({ providedIn: 'root' })
export class AltoReforcoFilter extends BaseFilterService implements Filter<AltoReforcoOptions> {
    constructor(imageHelperService: ImageHelperService, private readonly passaBaixoMedia: PassaBaixoMediaFilter) {
        super(imageHelperService);
    }

    public transform(image: PgmFile, type: MaskType, options: AltoReforcoOptions = { fator: 1.3 }): number[] {
        const passaBaixa = this.passaBaixoMedia.transform(image, MaskType.correlation);
        const mask = this.imageHelperService.subtractImagesPixels(image.pixels, passaBaixa);
        const imageAfterMask = this.imageHelperService.multiplyByScalar(mask, options.fator);

        return imageAfterMask;

        return this.imageHelperService.addImagesPixels(image.pixels, imageAfterMask);
    }
}
