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

    SobelX,
    SobelY,
    SobelMag,

    AltoReforco,
    Negativo,
    Gama,
    Logaritmo,
    TransferenciaIntensidade,
    TransferenciaLinear
}

export type AltoReforcoOptions = { fator: number };
export type GamaOptions = { y: number };
