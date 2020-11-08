import { Filter } from '../../types/filter';
import { Mask, MaskType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { BaseFilterService } from '../base-filter.service';

export class PassaAltoAgucamentoFilter extends BaseFilterService implements Filter {

    private mask: Mask = [
        -1, -1, -1,
        -1,  9, -1,
        -1, -1, -1
    ];

    public transform(image: PgmFile, type: MaskType): number[] {
        return this.filterImage(image, this.mask, type);
    }
}
