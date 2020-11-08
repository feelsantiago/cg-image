import { Mask, MaskType } from './maks';
import { PgmFile } from './pgm-image';

export interface Filter {
    transform(image: PgmFile, type: MaskType): number[];
}


export enum FilterTypes {
    PassaAltoBordas,
    PassaAltoAgucamento,
}
