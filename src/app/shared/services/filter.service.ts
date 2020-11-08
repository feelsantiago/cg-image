import { Injectable } from '@angular/core';
import { Filter, FilterTypes } from '../types/filter';
import { PassaAltoAgucamentoFilter } from './filtros/passa-alto-agucamento.filter';
import { PassaAltoBordaFilter } from './filtros/passa-alto-bordas.filter';
import { ImageHelperService } from './image-helper.service';

@Injectable({ providedIn: 'root' })
export class FilterService {

    constructor(
        private readonly passaAltoBordasFilter: PassaAltoBordaFilter,
        private readonly passaAltoAgucamento: PassaAltoAgucamentoFilter,
    ) {}

    public getFilter(type: FilterTypes): Filter {

        switch (type) {
            case (FilterTypes.PassaAltoBordas):
                return this.passaAltoBordasFilter;
            case (FilterTypes.PassaAltoAgucamento):
                return this.passaAltoAgucamento;
        }
    }
}
