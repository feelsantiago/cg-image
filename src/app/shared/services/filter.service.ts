import { Injectable } from '@angular/core';
import { Filter, FilterTypes } from '../types/filter';
import { FilterTypeInfo, getFilterInfo } from '../utils/filter.decorator';
import { PassaAltoAgucamentoFilter } from './filtros/passa-alto-agucamento.filter';
import { PassaAltoBordaFilter } from './filtros/passa-alto-bordas.filter';
import { PassaBaixoMediaFilter } from './filtros/passa-baixo-media.filter';
import { PassaBaixoMedianaFilter } from './filtros/passa-baixo-mediana.filter';
import { RobertsMagFilter } from './filtros/roberts-mag.filter';
import { RobertsXFilter } from './filtros/roberts-x.filter';
import { RobertsYFilter } from './filtros/roberts-y.filter';

@Injectable({ providedIn: 'root' })
export class FilterService {
    constructor(
        private readonly passaBaixoMedia: PassaBaixoMediaFilter,
        private readonly passaBaixoMediana: PassaBaixoMedianaFilter,
        private readonly passaAltoBordas: PassaAltoBordaFilter,
        private readonly passaAltoAgucamento: PassaAltoAgucamentoFilter,
        private readonly robertsX: RobertsXFilter,
        private readonly robertsY: RobertsYFilter,
        private readonly robertsMag: RobertsMagFilter
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
        }
    }
}
