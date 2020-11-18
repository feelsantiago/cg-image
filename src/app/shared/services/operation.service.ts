import { Injectable } from '@angular/core';
import { OperationInfo, OperationsTypes } from '../types/operation';
import { PgmFile } from '../types/pgm-image';
import { ImageHelperService } from './image-helper.service';

@Injectable({ providedIn: 'root' })
export class OperationService {
    private readonly operations: OperationInfo[] = [
        {
            name: 'Soma',
            type: OperationsTypes.soma,
        },
        {
            name: 'Subtração',
            type: OperationsTypes.subtracao,
        },
        {
            name: 'Divisão',
            type: OperationsTypes.divisao,
        },
        {
            name: 'Multiplicação',
            type: OperationsTypes.multiplicacao,
        },
        {
            name: 'AND',
            type: OperationsTypes.and,
        },
        {
            name: 'OR',
            type: OperationsTypes.or,
        },
        {
            name: 'XOR',
            type: OperationsTypes.xor,
        },
    ];

    constructor(private readonly imageHelperService: ImageHelperService) {}

    public getOperations(): OperationInfo[] {
        return this.operations;
    }

    public transform(imageA: PgmFile, imageB: PgmFile, operation: OperationsTypes): number[] {
        switch (operation) {
            case OperationsTypes.soma:
                return this.imageHelperService.addImagesPixels(imageA.pixels, imageB.pixels);
            case OperationsTypes.subtracao:
                return this.imageHelperService.subtractImagesPixels(imageA.pixels, imageB.pixels);
        }
    }
}
