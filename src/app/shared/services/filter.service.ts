import { Injectable } from '@angular/core';
import { Filter, FilterTypes } from '../types/filter';
import { FilterTypeInfo, getFilterInfo } from '../utils/filter.decorator';
import { AltoReforcoFilter } from './filtros/alto-reforco.filter';
import { GamaFilter } from './filtros/gama.filter';
import { NegativoFilter } from './filtros/negativo.filter';
import { PassaAltoAgucamentoFilter } from './filtros/passa-alto-agucamento.filter';
import { PassaAltoBordaFilter } from './filtros/passa-alto-bordas.filter';
import { PassaBaixoMediaFilter } from './filtros/passa-baixo-media.filter';
import { PassaBaixoMedianaFilter } from './filtros/passa-baixo-mediana.filter';
import { PrewittMagFilter } from './filtros/prewitt-mag.filter';
import { PrewittXFilter } from './filtros/prewitt-x.filter';
import { PrewittYFilter } from './filtros/prewitt-y.filter';
import { RobertsCruzadoMagFilter } from './filtros/roberts-cruzado-mag.filter';
import { RobertsCruzadoXFilter } from './filtros/roberts-cruzado-x.filter';
import { RobertsCruzadoYFilter } from './filtros/roberts-cruzado-y.filter';
import { RobertsMagFilter } from './filtros/roberts-mag.filter';
import { RobertsXFilter } from './filtros/roberts-x.filter';
import { RobertsYFilter } from './filtros/roberts-y.filter';
import { SobelMagFilter } from './filtros/sobel-mag.filter';
import { SobelXFilter } from './filtros/sobel-x.filter';
import { SobelYFilter } from './filtros/sobel-y.filter';

@Injectable({ providedIn: 'root' })
export class FilterService {
    constructor(
        private readonly passaBaixoMedia: PassaBaixoMediaFilter,
        private readonly passaBaixoMediana: PassaBaixoMedianaFilter,
        private readonly passaAltoBordas: PassaAltoBordaFilter,
        private readonly passaAltoAgucamento: PassaAltoAgucamentoFilter,
        private readonly robertsX: RobertsXFilter,
        private readonly robertsY: RobertsYFilter,
        private readonly robertsMag: RobertsMagFilter,

        private readonly robertsCruzadoX: RobertsCruzadoXFilter,
        private readonly robertsCruzadoY: RobertsCruzadoYFilter,
        private readonly robertsCruzadoMag: RobertsCruzadoMagFilter,
        private readonly prewittX: PrewittXFilter,
        private readonly prewittY: PrewittYFilter,
        private readonly prewittMag: PrewittMagFilter,
        private readonly sobelX: SobelXFilter,
        private readonly sobelY: SobelYFilter,
        private readonly sobelMag: SobelMagFilter,
        private readonly altoReforco: AltoReforcoFilter,
        private readonly negativo: NegativoFilter,
        private readonly gama: GamaFilter,
    ) {}

    public getAllFilters(): FilterTypeInfo[] {
        return [
            getFilterInfo(this.passaBaixoMedia),
            getFilterInfo(this.passaBaixoMediana),
            getFilterInfo(this.passaAltoAgucamento),
            getFilterInfo(this.passaAltoBordas),
            getFilterInfo(this.robertsX),
            getFilterInfo(this.robertsY),
            getFilterInfo(this.robertsMag),
            getFilterInfo(this.robertsCruzadoX),
            getFilterInfo(this.robertsCruzadoY),
            getFilterInfo(this.robertsCruzadoMag),
            getFilterInfo(this.prewittX),
            getFilterInfo(this.prewittY),
            getFilterInfo(this.prewittMag),
            getFilterInfo(this.sobelX),
            getFilterInfo(this.sobelY),
            getFilterInfo(this.sobelMag),
            getFilterInfo(this.altoReforco),
            getFilterInfo(this.negativo),
            getFilterInfo(this.gama),
        ];
    }

    public getFilter(type: FilterTypes): Filter {
        switch (type) {
            case FilterTypes.PassaBaixoMedia:
                return this.passaBaixoMedia;
            case FilterTypes.PassaBaixoMediana:
                return this.passaBaixoMediana;
            case FilterTypes.PassaAltoBordas:
                return this.passaAltoBordas;
            case FilterTypes.PassaAltoAgucamento:
                return this.passaAltoAgucamento;
            case FilterTypes.RobertsX:
                return this.robertsX;
            case FilterTypes.RobertsY:
                return this.robertsY;
            case FilterTypes.RobertsMag:
                return this.robertsMag;
            case FilterTypes.RobertsCruzadoX:
                return this.robertsCruzadoX;
            case FilterTypes.RobertsCruzadoY:
                return this.robertsCruzadoY;
            case FilterTypes.RobertsCruzadoMag:
                return this.robertsCruzadoMag;
            case FilterTypes.PrewittX:
                return this.prewittX;
            case FilterTypes.PrewittY:
                return this.prewittY;
            case FilterTypes.PrewittMag:
                return this.prewittMag;
            case FilterTypes.SobelX:
                return this.sobelX;
            case FilterTypes.SobelY:
                return this.sobelY;
            case FilterTypes.SobelMag:
                return this.sobelMag;
            case FilterTypes.AltoReforco:
                return this.altoReforco;
            case FilterTypes.Negativo:
                return this.negativo;
            case FilterTypes.Gama:
                return this.gama;
        }
    }
}
