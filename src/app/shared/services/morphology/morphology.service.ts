import { Injectable } from '@angular/core';
import { StructuringElement } from './structuring-element';

@Injectable({ providedIn: 'root' })
export class MorphologyService {
    public static readonly MORPH_3x3_TOP_RIGHT_CORNER_ELEMENT = new StructuringElement(
        3,
        // prettier-ignore
        [
            -1, 1, -1,
             0, 1,  1,
             0, 0, -1
        ]
    );

    public static readonly MORPH_3x3_BOTTOM_LEFT_CORNER_ELEMENT = new StructuringElement(
        3,
        // prettier-ignore
        [
            -1, 0,  0,
             1, 1,  0,
            -1, 1, -1
        ]
    );

    public static readonly MORPH_3x3_TOP_LEFT_CORNER_ELEMENT = new StructuringElement(
        3,
        // prettier-ignore
        [
            -1, 1, -1,
             1, 1,  0,
            -1, 0,  0
        ]
    );

    public static readonly MORPH_3x3_BOTTOM_RIGHT_CORNER_ELEMENT = new StructuringElement(
        3,
        // prettier-ignore
        [
             0, 0, -1,
             0, 1,  1,
            -1, 1, -1
        ]
    );

    public static createEmptyArrayWithZeros(
        height: number,
        width: number
    ): number[] {
        return Array.from(Array(height * width).keys()).map(() => 0);
    }
}
