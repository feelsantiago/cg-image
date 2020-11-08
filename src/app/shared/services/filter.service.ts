import { Injectable } from '@angular/core';
import { Filter, FilterTypes } from '../types/filter';
import { FilterTypeInfo, getFilterInfo } from '../utils/filter.decorator';
import { PassaAltoAgucamentoFilter } from './filtros/passa-alto-agucamento.filter';
import { PassaAltoBordaFilter } from './filtros/passa-alto-bordas.filter';

@Injectable({ providedIn: 'root' })
export class FilterService {

    constructor(
        private readonly passaAltoBordasFilter: PassaAltoBordaFilter,
        private readonly passaAltoAgucamento: PassaAltoAgucamentoFilter,
    ) {}

    public getAllFilters(): FilterTypeInfo[] {

        return [
            getFilterInfo(this.passaAltoAgucamento),
            getFilterInfo(this.passaAltoBordasFilter),
        ];
    }

    public getFilter(type: FilterTypes): Filter {

        switch (type) {
            case (FilterTypes.PassaAltoBordas):
                return this.passaAltoBordasFilter;
            case (FilterTypes.PassaAltoAgucamento):
                return this.passaAltoAgucamento;
        }
    }
}
