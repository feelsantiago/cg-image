import { Mask, MaskType } from './maks';
import { PgmFile } from './pgm-image';

export interface Filter<T = {}> {
    transform(image: PgmFile, type: MaskType, options?: T): number[];
}


export enum FilterTypes {
    PassaAltoBordas,
    PassaAltoAgucamento,

    PassaBaixoMedia,
    PassaBaixoMediana,

    RobertsX,
    RobertsY,
    RobertsMag,
    RobertsCruzadoX,
    RobertsCruzadoY,
    RobertsCruzadoMag,

    PrewittX,
    PrewittY,
    PrewittMag,

    AltoReforco,
}

export type AltoReforcoOptions = { fator: number };
